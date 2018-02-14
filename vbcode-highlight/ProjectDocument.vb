Imports System.Runtime.CompilerServices
Imports Microsoft.VisualBasic.ApplicationServices.Development
Imports Microsoft.VisualBasic.ApplicationServices.Development.VisualStudio
Imports Microsoft.VisualBasic.Text
Imports Microsoft.VisualBasic.Text.Xml

Public Module ProjectDocument

    Public Function Build(vbproj$, EXPORT$, Optional schema As Schema = Nothing) As Boolean
        Dim assmInfo As AssemblyInfo = vbproj.GetAssemblyInfo
        Dim folder$ = vbproj.ParentPath
        Dim css$ = (schema Or Schema.VisualStudioDefault).CSSStyle

        ' index.html
        Call assmInfo.Summary.SaveTo($"{EXPORT}/index.html")

        ' itemgroups\compiles
        For Each file As String In vbproj.EnumerateSourceFiles
            Dim html$ = $"{folder}/{file}".ReadAllText _
                .ToVBhtml _
                .jsfilelinecontainer

            Call HTMLRender _
                .ApplyCSS(html, css) _
                .SaveTo($"{EXPORT}/{file}".ChangeSuffix("html"))
        Next

        Return True
    End Function

    ''' <summary>
    ''' javascript class define for ``js-file-line-container``
    ''' </summary>
    ''' <param name="highlights"></param>
    ''' <returns></returns>
    ''' 
    <Extension>
    Private Function jsfilelinecontainer(highlights As String) As String
        Dim lines$() = highlights.lTokens
        Dim tr$() = lines _
            .Select(Function(L, i)
                        Dim num$ = i + 1

                        Return sprintf(
                            <tr>
                                <td id=<%= "L" & num %> class="blob-num js-line-number" data-line-number=<%= num %>><%= num %></td>
                                <td id=<%= "LC" & num %> class="blob-code blob-code-inner js-file-line">%s</td>
                            </tr>, L)
                    End Function) _
            .ToArray

        Return sprintf(
            <table class="highlight tab-size js-file-line-container" data-tab-size="8">
                <tbody>%s</tbody>
            </table>, tr.JoinBy(ASCII.LF))
    End Function

    <Extension>
    Public Function Summary(assmInfo As AssemblyInfo) As String

    End Function
End Module
