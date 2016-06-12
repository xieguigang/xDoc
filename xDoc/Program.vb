Imports Microsoft.VisualBasic.CommandLine
Imports Microsoft.VisualBasic.SoftwareToolkits
Imports Microsoft.VisualBasic.SoftwareToolkits.XmlDoc
Imports Microsoft.VisualBasic.SoftwareToolkits.XmlDoc.Assembly
Imports Microsoft.VisualBasic.SoftwareToolkits.XmlDoc.Serialization

Module Program

    Public Function Main() As Integer
        Return GetType(Program).RunCLI(App.CommandLine, executeFile:=AddressOf ExecFile)
    End Function

    Public Function ExecFile(path As String, args As CommandLine) As Integer
        Dim ps As New ProjectSpace()
        Dim mdOutputFolder As String = path.ParentPath & "/docs/"
        Call ps.ImportFromXmlDocFile(path)
        Call ps.ExportMarkdownFiles(mdOutputFolder)
        Return 0
    End Function
End Module
