Imports Microsoft.VisualBasic.CommandLine
Imports Microsoft.VisualBasic.CommandLine.Reflection
Imports Microsoft.VisualBasic.SoftwareToolkits.XmlDoc.Assembly
Imports Microsoft.VisualBasic.SoftwareToolkits.XmlDoc.Serialization

''' <summary>
''' 
''' </summary>
Module Program

    Public Function Main() As Integer
        Return GetType(Program).RunCLI(App.CommandLine, executeEmpty:=AddressOf Program.Help)
    End Function

    Private Function Help() As Integer
        Call "xDoc /Build /in <source.xml/*.xml DIR> [/lib <github/xdoc/hexo, default:=github> /out <outDIR>]".__DEBUG_ECHO
        Return 0
    End Function

    <ExportAPI("/Build",
               Info:="Build sdk document library from xml assembly docs with just one simple command.",
               Usage:="/Build /in <source.xml/*.xml DIR> [/lib <github/xdoc/hexo, default:=github> /out <outDIR>]")>
    Public Function Build(args As CommandLine) As Integer
        Dim ps As New ProjectSpace()
        Dim path$ = args("/in")
        Dim mdOutputFolder As String = args.GetValue("/out", path.ParentPath & "/docs/")

        If path.FileExists Then
            Call ps.ImportFromXmlDocFile(path)
        ElseIf path.DirectoryExists Then
            Call ps.ImportFromXmlDocFolder(path)
        Else
            Throw New Exception(path & " is not a valid file system object!")
        End If

        Call $"{path} --> {mdOutputFolder}".__DEBUG_ECHO

        Dim type As Libraries = args.GetValue("/lib", Libraries.Github, __ctype:=AddressOf GetLibraryType)

        If ps.ExportMarkdownFiles(mdOutputFolder, [lib]:=type) Then
            Call "Document library generates success!".__DEBUG_ECHO
        Else
            Call "Job failure!".PrintException
        End If

        Return 0
    End Function
End Module
