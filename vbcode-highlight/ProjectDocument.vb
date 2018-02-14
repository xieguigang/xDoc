Imports System.Runtime.CompilerServices
Imports Microsoft.VisualBasic.ApplicationServices.Development
Imports Microsoft.VisualBasic.ApplicationServices.Development.VisualStudio

Public Module ProjectDocument

    Public Function Build(vbproj$, EXPORT$, Optional schema As Schema = Nothing) As Boolean
        Dim assmInfo As AssemblyInfo = vbproj.GetAssemblyInfo

        ' index.html
        Call assmInfo.Summary.SaveTo($"{EXPORT}/index.html")

        ' itemgroups\compiles
        For Each file As String In vbproj.EnumerateSourceFiles

        Next

        Return True
    End Function

    <Extension>
    Public Function Summary(assmInfo As AssemblyInfo) As String

    End Function
End Module
