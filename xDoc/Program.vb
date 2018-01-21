Imports System.ComponentModel
Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Assembly
Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Serialization
Imports Microsoft.VisualBasic.CommandLine
Imports Microsoft.VisualBasic.CommandLine.InteropService.SharedORM
Imports Microsoft.VisualBasic.CommandLine.Reflection
Imports Microsoft.VisualBasic.Net.Http
Imports Microsoft.VisualBasic.Text

''' <summary>
''' VB.NET 开发工具包，使用这个程序将会从Assembly的XML注释文档之中导出makrdown文档，然后可以配合Yilia工具生成静态的html帮助文档
''' </summary>
<CLI> Module Program

    Public Function Main() As Integer
        Return GetType(Program).RunCLI(App.CommandLine)
    End Function

    <ExportAPI("/Build")>
    <Description("Build sdk document library from xml assembly docs with just one simple command.")>
    <Usage("/Build /in <source.xml/*.xml DIR> [/lib <github/xdoc/hexo, default:=github> /out <outDIR>]")>
    Public Function Build(args As CommandLine) As Integer
        Dim ps As New ProjectSpace()
        Dim path$ = args("/in")
        Dim mdOutputFolder$ = args("/out") Or $"{path.ParentPath}/docs/"

        Call "Loading xml assembly documents....".__DEBUG_ECHO

        If path.FileExists Then
            Call ps.ImportFromXmlDocFile(path)
        ElseIf path.DirectoryExists Then
            Call ps.ImportFromXmlDocFolder(path)
        Else
            Throw New Exception(path & " is not a valid file system object!")
        End If

        Call $"{path} --> {mdOutputFolder}".__DEBUG_ECHO

        Dim type As Libraries = args.GetValue("/lib", Libraries.Github, __ctype:=AddressOf GetLibraryType)
        Dim url As New URLBuilder(type)

        If ps.ExportMarkdownFiles(mdOutputFolder, url) Then
            Call "Document library generates success!".__DEBUG_ECHO
        Else
            Call "Job failure!".PrintException
        End If

        Return 0
    End Function

    <ExportAPI("/Build.sitemap")>
    <Usage("/Build.sitemap /wwwroot <wwwroot.DIR> /host <base-url>")>
    Public Function BuildSiteMap(args As CommandLine) As Integer
        Dim wwwroot$ = args("/wwwroot")
        Dim host$ = args("/host")
        Dim sitemap As sitemap = sitemap.ScanAllFiles(wwwroot, host,)
        Dim out$ = wwwroot & "/sitemap.xml"
        Return sitemap.Save(out, Encodings.UTF8).CLICode
    End Function
End Module
