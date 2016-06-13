Imports Microsoft.VisualBasic.CommandLine
Imports Microsoft.VisualBasic.SoftwareToolkits.XmlDoc.Assembly

''' <summary>
''' 
''' </summary>
Module Program

    Public Function Main() As Integer
        Return GetType(Program).RunCLI(App.CommandLine, executeFile:=AddressOf ExecFile)
    End Function

    Public Function ExecFile(path As String, args As CommandLine) As Integer
        Dim ps As New ProjectSpace()
        Dim mdOutputFolder As String = args.GetValue("/out", path.ParentPath & "/docs/")

        If path.FileExists Then
            Call ps.ImportFromXmlDocFile(path)
        ElseIf path.DirectoryExists Then
            Call ps.ImportFromXmlDocFolder(path)
        Else
            Throw New Exception(path & " is not a valid file system object!")
        End If

        Return ps.ExportMarkdownFiles(mdOutputFolder, args.GetBoolean("/hexo"))
    End Function
End Module
