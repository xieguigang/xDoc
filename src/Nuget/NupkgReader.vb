Imports System.Collections.Generic
Imports System.IO
Imports System.IO.Compression
Imports System.Linq
Imports System.Xml.Linq

''' <summary>
''' one dependency entry of the nuspec manifest.
''' </summary>
Public Class NuspecDependency
    Public Property targetFramework As String
    Public Property id As String
    Public Property range As String
End Class

''' <summary>
''' the full package metadata parsed from the ``.nuspec`` manifest.
''' </summary>
Public Class NupkgMetadata
    Public Property Id As String
    Public Property Version As String
    Public Property Title As String
    Public Property Authors As String
    Public Property Owners As String
    Public Property Description As String
    Public Property Summary As String
    Public Property ReleaseNotes As String
    Public Property Copyright As String
    Public Property Language As String
    Public Property Tags As String
    Public Property ProjectUrl As String
    Public Property LicenseUrl As String
    Public Property License As String
    Public Property RequireLicenseAcceptance As String
    Public Property Repository As String
    Public Property Icon As String

    ''' <summary>the dependency list encoded as ``id|range`` pairs.</summary>
    Public Property Dependencies As String

    ''' <summary>the structured dependency list grouped by target framework.</summary>
    Public Property DependencyItems As New List(Of NuspecDependency)

    ''' <summary>the raw nuspec xml document.</summary>
    Public Property RawXml As String
End Class

''' <summary>
''' a minimal nupkg reader: open the OPC zip container, extract the ``.nuspec``
''' manifest and parse the package metadata. the binary itself is never stored
''' inside the database.
''' </summary>
Public Module NupkgReader

    Public Function ReadMetadata(nupkgPath As String) As NupkgMetadata
        Dim raw As String = ReadNuspecXml(nupkgPath)
        Dim metadata As NupkgMetadata = parse(XDocument.Parse(raw))
        metadata.RawXml = raw
        Return metadata
    End Function

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

    ''' <summary>
    ''' extract the embedded icon image (if any) to the given destination file.
    ''' </summary>
    ''' <param name="nupkgPath">the physical nupkg path.</param>
    ''' <param name="iconName">the icon path stored in the nuspec ``icon`` element.</param>
    ''' <param name="destination">the file path to write the icon bytes to.</param>
    ''' <returns><c>True</c> when an icon image was extracted.</returns>
    Public Function ExtractIcon(nupkgPath As String, iconName As String, destination As String) As Boolean
        If String.IsNullOrEmpty(iconName) Then
            Return False
        End If

        Using zip As ZipArchive = ZipFile.OpenRead(nupkgPath)
            Dim key As String = iconName.Replace("\"c, "/"c).TrimStart("/"c)
            Dim entry As ZipArchiveEntry = zip.Entries _
                .FirstOrDefault(Function(e) e.FullName.Equals(key, StringComparison.OrdinalIgnoreCase))

            If entry Is Nothing OrElse entry.Length = 0 Then
                Return False
            End If

            Call Directory.CreateDirectory(Path.GetDirectoryName(destination))
            Call entry.ExtractToFile(destination, overwrite:=True)
            Return True
        End Using
    End Function

    Private Function findNuspec(zip As ZipArchive) As ZipArchiveEntry
        Dim rootEntry As ZipArchiveEntry = zip.Entries _
            .FirstOrDefault(Function(e) Not e.FullName.Contains("/"c) AndAlso
                                        e.FullName.EndsWith(".nuspec", StringComparison.OrdinalIgnoreCase))

        If rootEntry IsNot Nothing Then
            Return rootEntry
        End If

        Return zip.Entries _
            .FirstOrDefault(Function(e) e.FullName.EndsWith(".nuspec", StringComparison.OrdinalIgnoreCase))
    End Function

    Private Function parse(document As XDocument) As NupkgMetadata
        Dim metadata As XElement = document.Descendants() _
            .FirstOrDefault(Function(e) e.Name.LocalName = "metadata")

        If metadata Is Nothing Then
            Throw New InvalidDataException("invalid nuspec manifest: the metadata element is missing.")
        End If

        Dim result As New NupkgMetadata With {
            .Id = childValue(metadata, "id"),
            .Version = childValue(metadata, "version"),
            .Title = childValue(metadata, "title"),
            .Authors = childValue(metadata, "authors"),
            .Owners = childValue(metadata, "owners"),
            .Description = childValue(metadata, "description"),
            .Summary = childValue(metadata, "summary"),
            .ReleaseNotes = childValue(metadata, "releaseNotes"),
            .Copyright = childValue(metadata, "copyright"),
            .Language = childValue(metadata, "language"),
            .Tags = childValue(metadata, "tags"),
            .ProjectUrl = childValue(metadata, "projectUrl"),
            .LicenseUrl = childValue(metadata, "licenseUrl"),
            .License = readLicense(metadata),
            .RequireLicenseAcceptance = childValue(metadata, "requireLicenseAcceptance"),
            .Repository = readRepository(metadata),
            .Icon = childValue(metadata, "icon")
        }

        readDependencies(metadata, result)

        Return result
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

    Private Function readRepository(metadata As XElement) As String
        Dim element As XElement = metadata.Elements() _
            .FirstOrDefault(Function(e) e.Name.LocalName = "repository")

        If element Is Nothing Then
            Return ""
        End If

        Dim url As XAttribute = element.Attribute("url")
        Return If(url Is Nothing, "", url.Value.Trim())
    End Function

    Private Sub readDependencies(metadata As XElement, result As NupkgMetadata)
        Dim dependencies As XElement = metadata.Elements() _
            .FirstOrDefault(Function(e) e.Name.LocalName = "dependencies")

        If dependencies Is Nothing Then
            Return
        End If

        Dim encoded As New List(Of String)

        ' grouped form: <group targetFramework="..."><dependency/></group>
        For Each group As XElement In dependencies.Elements() _
                .Where(Function(e) e.Name.LocalName = "group")

            Dim framework As String = attributeValue(group, "targetFramework")

            For Each dependency As XElement In group.Elements() _
                    .Where(Function(e) e.Name.LocalName = "dependency")
                addDependency(dependency, framework, result, encoded)
            Next
        Next

        ' flat form: <dependency/> directly under <dependencies/>
        For Each dependency As XElement In dependencies.Elements() _
                .Where(Function(e) e.Name.LocalName = "dependency")
            addDependency(dependency, "", result, encoded)
        Next

        result.Dependencies = String.Join(";", encoded)
    End Sub

    Private Sub addDependency(dependency As XElement, framework As String, result As NupkgMetadata, encoded As List(Of String))
        Dim name As String = attributeValue(dependency, "id")
        Dim range As String = attributeValue(dependency, "version")

        If String.IsNullOrEmpty(name) Then
            Return
        End If

        Call result.DependencyItems.Add(New NuspecDependency With {
            .targetFramework = framework,
            .id = name,
            .range = range
        })
        Call encoded.Add($"{name}|{range}")
    End Sub

    Private Function attributeValue(element As XElement, name As String) As String
        Dim attribute As XAttribute = element.Attribute(name)
        Return If(attribute Is Nothing, "", attribute.Value.Trim())
    End Function
End Module
