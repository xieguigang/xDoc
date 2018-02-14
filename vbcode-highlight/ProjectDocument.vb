Imports System.Runtime.CompilerServices
Imports Microsoft.VisualBasic.ApplicationServices
Imports Microsoft.VisualBasic.ApplicationServices.Development
Imports Microsoft.VisualBasic.ApplicationServices.Development.VisualStudio
Imports Microsoft.VisualBasic.Language
Imports Microsoft.VisualBasic.MIME.Markup.HTML.CSS
Imports Microsoft.VisualBasic.Text
Imports Microsoft.VisualBasic.Text.Xml
Imports DevAssmInfo = Microsoft.VisualBasic.ApplicationServices.Development.AssemblyInfo

Public Module ProjectDocument

    Public Function Build(vbproj$, EXPORT$, Optional schema As Schema = Nothing) As Boolean
        Dim folder$ = vbproj.ParentPath
        Dim css$
        Dim fontSize!
        Dim fontStyle$

        With (schema Or Schema.VisualStudioDefault)
            fontSize = .font.size
            fontStyle = .font.CSSInlineStyle
            css = .CSSStyle _
                .Replace(".vscode > ", "")
        End With

        ' index.html
        Call vbproj.Summary.SaveTo($"{EXPORT}/index.html")

        With App.GetAppSysTempFile(".zip", App.PID)
            Call My.Resources._lib.FlushStream(.ByRef)
            Call GZip.ImprovedExtractToDirectory(.ByRef, $"{EXPORT}/lib")
        End With

        ' itemgroups\compiles
        For Each file As String In vbproj.EnumerateSourceFiles
            Dim vb$ = $"{folder}/{file}".ReadAllText
            Dim html$ = vb _
                .ToVBhtml _
                .jsfilelinecontainer

            Call sprintf(
                <html>
                    <head>
                        <title>%s</title>

                        <style type="text/css">
                            %s
                        </style>
                        <style type="text/css">                           
                            .js-line-number {
                                color: #2b91af;                                
                                text-align: right;
                                padding-right: 5px;
                                border-right-style: inset;
                            }

                            .js-file-line .js-line-number {
                                font: <%= fontStyle %>;
                            }

                            .js-file-line {
                                padding-left: 10px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="vscode">
                            %s
                        </div>
                    </body>
                </html>, file, css, html) _
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
    Public Function Summary(vbproj As String) As String
        Dim assmInfo As DevAssmInfo = vbproj.GetAssemblyInfo


    End Function
End Module
