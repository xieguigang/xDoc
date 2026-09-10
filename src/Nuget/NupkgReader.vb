Imports System.Collections.Generic
Imports System.IO
Imports System.IO.Compression
Imports System.Linq
Imports System.Xml.Linq

''' <summary>
''' the package metadata parsed from the ``.nuspec`` manifest of a nupkg file.
''' </summary>
Public Class NupkgMetadata
    Public Property Id As String
    Public Property Version As String
    Public Property Description As String
    Public Property Authors As String
    Public Property Tags As String
    Public Property ProjectUrl As String
    Public Property License As String

    ''' <summary>
    ''' the dependencies encoded as ``id|version`` pairs separated by ``;``.
    ''' </summary>
    Public Property Dependencies As String
End Class

''' <summary>
''' a minimal nupkg reader: open the OPC zip container, extract the ``.nuspec``
''' manifest and parse the package metadata. the binary itself is never stored
''' inside the database.
''' </summary>
Public Module NupkgReader

    ''' <summary>
    ''' read and parse the ``.nuspec`` manifest metadata of the given nupkg file.
    ''' </summary>
    ''' <param name="nupkgPath">the physical path of the ``.nupkg`` file.</param>
    ''' <returns>the parsed package metadata.</returns>
    Public Function ReadMetadata(nupkgPath As String) As NupkgMetadata
        Using zip As ZipArchive = ZipFile.OpenRead(nupkgPath)
            Dim entry As ZipArchiveEntry = findNuspec(zip)

            If entry Is Nothing Then
                Throw New InvalidDataException("the nuspec manifest was not found in the package.")
            End If

            Using stream As Stream = entry.Open()
                Return parse(XDocument.Load(stream))
            End Using
        End Using
    End Function

    ''' <summary>
    ''' read the raw xml text of the ``.nuspec`` manifest, so that it can be
    ''' served from the flat container ``.nuspec`` endpoint.
    ''' </summary>
    ''' <param name="nupkgPath">the physical path of the ``.nupkg`` file.</param>
    ''' <returns>the nuspec xml text.</returns>
    Public Function ReadNuspecXml(nupkgPath As String) As String
        Using zip As ZipArchive = ZipFile.OpenRead(nupkgPath)
            Dim entry As ZipArchiveEntry = findNuspec(zip)

            If entry Is Nothing Then
                Throw New InvalidDataException("the nuspec manifest was not found in the package.")
            End If

            Using stream As Stream = entry.Open()
                Using reader As New StreamReader(stream)
                    Return reader.ReadToEnd()
                End Using
            End Using
        End Using
    End Function

    Private Function findNuspec(zip As ZipArchive) As ZipArchiveEntry
        ' the manifest is at the package root, named ``{id}.nuspec``
        Dim rootEntry As ZipArchiveEntry = zip.Entries _
            .FirstOrDefault(Function(e) Not e.FullName.Contains("/"c) AndAlso
                                        e.FullName.EndsWith(".nuspec", StringComparison.OrdinalIgnoreCase))

        If rootEntry IsNot Nothing Then
            Return rootEntry
        End If

        ' fallback: any nuspec entry
        Return zip.Entries _
            .FirstOrDefault(Function(e) e.FullName.EndsWith(".nuspec", StringComparison.OrdinalIgnoreCase))
    End Function

    Private Function parse(document As XDocument) As NupkgMetadata
        Dim metadata As XElement = document.Descendants() _
            .FirstOrDefault(Function(e) e.Name.LocalName = "metadata")

        If metadata Is Nothing Then
            Throw New InvalidDataException("invalid nuspec manifest: the metadata element is missing.")
        End If

        Return New NupkgMetadata With {
            .Id = childValue(metadata, "id"),
            .Version = childValue(metadata, "version"),
            .Description = childValue(metadata, "description"),
            .Authors = childValue(metadata, "authors"),
            .Tags = childValue(metadata, "tags"),
            .ProjectUrl = childValue(metadata, "projectUrl"),
            .License = readLicense(metadata),
            .Dependencies = readDependencies(metadata)
        }
    End Function

    Private Function childValue(metadata As XElement, name As String) As String
        Dim element As XElement = metadata.Elements() _
            .FirstOrDefault(Function(e) e.Name.LocalName = name)

        If element Is Nothing Then
            Return ""
        End If

        Return element.Value.Trim()
    End Function

    Private Function readLicense(metadata As XElement) As String
        Dim element As XElement = metadata.Elements() _
            .FirstOrDefault(Function(e) e.Name.LocalName = "license")

        If element Is Nothing Then
            Return ""
        End If

        If Not String.IsNullOrEmpty(element.Value) Then
            Return element.Value.Trim()
        End If

        Dim typeAttribute As XAttribute = element.Attribute("type")
        If typeAttribute Is Nothing Then
            Return ""
        End If

        Return $"{typeAttribute.Value} license"
    End Function

    Private Function readDependencies(metadata As XElement) As String
        Dim dependencies As XElement = metadata.Elements() _
            .FirstOrDefault(Function(e) e.Name.LocalName = "dependencies")

        If dependencies Is Nothing Then
            Return ""
        End If

        Dim list As New List(Of String)

        For Each dependency As XElement In dependencies.Descendants() _
                .Where(Function(e) e.Name.LocalName = "dependency")

            Dim id As XAttribute = dependency.Attribute("id")
            Dim version As XAttribute = dependency.Attribute("version")

            Dim name As String = If(id Is Nothing, "", id.Value)
            Dim range As String = If(version Is Nothing, "", version.Value)

            If Not String.IsNullOrEmpty(name) Then
                list.Add($"{name}|{range}")
            End If
        Next

        Return String.Join(";", list)
    End Function
End Module
