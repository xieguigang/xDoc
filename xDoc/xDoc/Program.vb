Imports Microsoft.VisualBasic.CommandLine
Imports Microsoft.VisualBasic.SoftwareToolkits
Imports Microsoft.VisualBasic.SoftwareToolkits.XmlDoc

Module Program

    Public Function Main() As Integer
        Return GetType(Program).RunCLI(App.CommandLine, executeFile:=AddressOf ExecFile)
    End Function

    Public Function ExecFile(path As String, args As CommandLine) As Integer
        Dim assm As XmlDoc.Doc = DocAPI.Load(path)
    End Function
End Module
