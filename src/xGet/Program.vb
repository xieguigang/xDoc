Imports System
Imports System.Collections.Generic
Imports System.IO

''' <summary>
''' xGet: an experimental nuget client that only implements the two operations
''' that the official client cannot do with the custom TOTP authentication:
''' registering a new email and uploading a package.
''' </summary>
Module Program

    Private Const UsageText As String =
        "xGet - experimental nuget client" & vbCrLf &
        vbCrLf &
        "usage:" & vbCrLf &
        "  xGet register --server <url> --email <email>" & vbCrLf &
        "  xGet upload   --server <url> --email <email> --file <package.nupkg>" & vbCrLf &
        vbCrLf &
        "options:" & vbCrLf &
        "  --server, -s   the nuget server base url, e.g. http://localhost:80" & vbCrLf &
        "  --email,  -e   the registered user email" & vbCrLf &
        "  --file,   -f   the .nupkg file to upload"

    Function Main(args As String()) As Integer
        If args Is Nothing OrElse args.Length = 0 Then
            Call printUsage()
            Return 1
        End If

        Dim command As String = args(0).TrimStart("-"c, "/"c).ToLowerInvariant()
        Dim options As Dictionary(Of String, String) = parseOptions(args)

        Select Case command
            Case "register", "reg"
                Return register(options)
            Case "upload", "push"
                Return upload(options)
            Case "help", "?", "h"
                Call printUsage()
                Return 0
            Case Else
                Call Console.WriteLine($"unknown command: {args(0)}")
                Call printUsage()
                Return 1
        End Select
    End Function

    Private Function register(options As Dictionary(Of String, String)) As Integer
        Dim server As String = getOption(options, "server", "s")
        Dim email As String = getOption(options, "email", "e")

        If String.IsNullOrEmpty(server) OrElse String.IsNullOrEmpty(email) Then
            Call Console.WriteLine("usage: xGet register --server <url> --email <email>")
            Return 1
        End If

        Dim client As New NugetApiClient(server)
        Dim result As ApiResult = client.Register(email)

        If result Is Nothing OrElse Not result.ok OrElse String.IsNullOrEmpty(result.secret) Then
            Call Console.WriteLine($"registration failed: {If(result?.message, "unknown error")}")
            Return 2
        End If

        Dim account As New AccountStore()
        Call account.Save(server, email, result.secret)

        Call Console.WriteLine($"registered '{email}' on {server}")
        Call Console.WriteLine($"the TOTP secret has been saved to: {account.StoreFile}")
        Return 0
    End Function

    Private Function upload(options As Dictionary(Of String, String)) As Integer
        Dim server As String = getOption(options, "server", "s")
        Dim email As String = getOption(options, "email", "e")
        Dim package As String = getOption(options, "file", "f")

        If String.IsNullOrEmpty(server) OrElse String.IsNullOrEmpty(email) OrElse String.IsNullOrEmpty(package) Then
            Call Console.WriteLine("usage: xGet upload --server <url> --email <email> --file <package.nupkg>")
            Return 1
        End If

        If Not File.Exists(package) Then
            Call Console.WriteLine($"package file not found: {package}")
            Return 1
        End If

        Dim account As New AccountStore()
        Dim secret As String = account.GetSecret(server, email)

        If String.IsNullOrEmpty(secret) Then
            Call Console.WriteLine($"no TOTP secret was found for '{email}' on {server}.")
            Call Console.WriteLine("please register this email first: xGet register --server <url> --email <email>")
            Return 1
        End If

        Dim code As String = Nuget.TotpModule.GenerateTotp(secret)
        Dim client As New NugetApiClient(server)
        Dim result As ApiResult = client.Upload(email, code, package)

        If result Is Nothing OrElse Not result.ok Then
            Call Console.WriteLine($"upload failed: {If(result?.message, "unknown error")}")
            Return 2
        End If

        Call Console.WriteLine($"uploaded {If(result.id, Path.GetFileNameWithoutExtension(package))} {If(result.version, "")}".Trim())
        Return 0
    End Function

    Private Shared Function parseOptions(args As String()) As Dictionary(Of String, String)
        Dim options As New Dictionary(Of String, String)(StringComparer.OrdinalIgnoreCase)
        Dim i As Integer = 1

        While i < args.Length
            Dim token As String = args(i)

            If token.StartsWith("-"c) OrElse token.StartsWith("/"c) Then
                Dim name As String = token.TrimStart("-"c, "/"c)
                Dim equals As Integer = name.IndexOf("="c)

                If equals >= 0 Then
                    options(name.Substring(0, equals)) = name.Substring(equals + 1)
                    i += 1
                Else
                    Dim value As String = ""
                    If i + 1 < args.Length AndAlso Not args(i + 1).StartsWith("-"c) Then
                        value = args(i + 1)
                        i += 2
                    Else
                        i += 1
                    End If
                    options(name) = value
                End If
            Else
                i += 1
            End If
        End While

        Return options
    End Function

    Private Shared Function getOption(options As Dictionary(Of String, String), ParamArray names As String()) As String
        For Each name As String In names
            Dim value As String = Nothing
            If options.TryGetValue(name, value) AndAlso Not String.IsNullOrEmpty(value) Then
                Return value.Trim()
            End If
        Next
        Return ""
    End Function

    Private Shared Sub printUsage()
        Call Console.WriteLine(UsageText)
    End Sub
End Module
