Imports System.Runtime.CompilerServices
Imports Microsoft.VisualBasic.ApplicationServices.Development
Imports Microsoft.VisualBasic.ApplicationServices.Development.VisualStudio

Public Module ProjectDocument

    Public Function Build(vbproj$, EXPORT$, Optional schema As Schema = Nothing) As Boolean
        Dim assmInfo As AssemblyInfo = vbproj.GetAssemblyInfo
        Dim folder$ = vbproj.ParentPath

        ' index.html
        Call assmInfo.Summary.SaveTo($"{EXPORT}/index.html")

        ' itemgroups\compiles
        For Each file As String In vbproj.EnumerateSourceFiles
            Dim html$ = $"{folder}/{file}".ReadAllText.Render(schema)
            Call html.SaveTo($"{EXPORT}/{file}".ChangeSuffix("html"))
        Next

        Return True
    End Function

    <Extension>
    Public Function Summary(assmInfo As AssemblyInfo) As String

    End Function
End Module
