Imports System.Collections.Generic
Imports System.IO

''' <summary>
''' runtime configuration of the experimental nuget server module.
''' </summary>
''' <remarks>
''' the data directory is intentionally configurable because the server is
''' usually hosted inside a linux docker container where the program directory
''' is read only. use the ``--data`` command line argument of the Fluteway
''' ``/run`` command, or a key of the ``--config`` ini file, to point it to a
''' writable volume.
''' </remarks>
Public Class NugetConfiguration

    ''' <summary>
    ''' the root data directory that holds both the JSql database and the
    ''' physical package files.
    ''' </summary>
    Public ReadOnly Property DataDirectory As String

    ''' <summary>
    ''' the directory holding the physical ``.nupkg``/``.nuspec`` files.
    ''' </summary>
    Public ReadOnly Property PackageDirectory As String

    ''' <summary>
    ''' the JSql database root directory.
    ''' </summary>
    Public ReadOnly Property DatabaseDirectory As String

    ''' <summary>
    ''' the physical static web root directory.
    ''' </summary>
    Public ReadOnly Property Wwwroot As String

    ''' <summary>
    ''' an optional public base url that overrides the request host, for example
    ''' ``http://pkg.example.com`` when the server runs behind a reverse proxy.
    ''' </summary>
    Public ReadOnly Property BaseUrl As String

    Private Sub New(data As String, packages As String, database As String, wwwroot As String, baseUrl As String)
        Me.DataDirectory = data
        Me.PackageDirectory = packages
        Me.DatabaseDirectory = database
        Me.Wwwroot = wwwroot
        Me.BaseUrl = baseUrl
    End Sub

    ''' <summary>
    ''' build the configuration from the host supplied configuration dictionary.
    ''' accepted keys: ``data``, ``packages``, ``db``, ``wwwroot`` and
    ''' ``base-url``.
    ''' </summary>
    ''' <param name="config">the host configuration dictionary (may be <c>Nothing</c>).</param>
    ''' <returns>the resolved configuration instance.</returns>
    Public Shared Function FromConfig(config As IReadOnlyDictionary(Of String, String)) As NugetConfiguration
        Dim data As String = getValue(config, "data")
        If String.IsNullOrEmpty(data) Then
            data = Path.Combine(Directory.GetCurrentDirectory(), "data")
        End If
        data = Path.GetFullPath(data)

        Dim packages As String = getValue(config, "packages")
        If String.IsNullOrEmpty(packages) Then
            packages = Path.Combine(data, "packages")
        End If

        Dim database As String = getValue(config, "db")
        If String.IsNullOrEmpty(database) Then
            database = Path.Combine(data, "db")
        End If

        Dim wwwroot As String = getValue(config, "wwwroot")
        Dim baseUrl As String = getValue(config, "base-url")

        Return New NugetConfiguration(data, packages, database, wwwroot, baseUrl)
    End Function

    Private Shared Function getValue(config As IReadOnlyDictionary(Of String, String), name As String) As String
        Dim value As String = Nothing
        If config IsNot Nothing AndAlso config.TryGetValue(name, value) Then
            Return value
        End If
        Return Nothing
    End Function
End Class
