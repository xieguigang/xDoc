Imports System.Runtime.CompilerServices
Imports System.Text
Imports Microsoft.VisualBasic.MIME.Markup.HTML.CSS
Imports Microsoft.VisualBasic.Scripting.SymbolBuilder
Imports Microsoft.VisualBasic.Text.Xml

Public Module HTMLRender

    ReadOnly CSS$ =
 _
        <style type="text/css">
            .vscode {
                background-color: {$background};
                font: {$font_style} {$font_size}px {$font_family};   
                color: {$font_color};
            }
            .vscode > .keyword {
                color: {$color_keyword} !important;
            }
            .vscode > .comment {
                color: {$color_comment} !important;
            }
            .vscode > .type {
                color: {$color_type} !important;
            }
            .vscode > .string {
                color: {$color_string} !important;
            }   
            .vscode > .xml {
                color: {$color_xml} !important;
            }
        </style>

    <Extension>
    Public Function CSSStyle(theme As Schema) As String
        With New ScriptBuilder(HTMLRender.CSS)

            ' assign css variable values

            !background = theme.background
            !theme_name = theme.ThemeName

            !font_style = theme.font.style.CSSValue
            !font_size = theme.font.size
            !font_family = theme.font.family
            !font_color = theme.identifier

            !color_keyword = theme.keyword
            !color_comment = theme.comments
            !color_type = theme.typeName
            !color_string = theme.string
            !color_xml = theme.XmlComment

            Return .ToString
        End With
    End Function

    ''' <summary>
    ''' Render *.vb source file to html page
    ''' </summary>
    ''' <param name="vb"></param>
    ''' <returns></returns>
    <Extension>
    Public Function ToVBhtml(vb As String) As String
        Dim html As New StringBuilder(vb)
        Dim keywords$() = VBLanguage _
            .VBKeywords _
            .Split("|"c) _
            .Where(Function(w) Not w.StringEmpty) _
            .ToArray
        Dim span$

        html.Replace("&", "&amp;") _
            .Replace("<", "&lt;") _
            .Replace(">", "&gt;")

        html.Replace(" ", "&nbsp;").Replace(vbCrLf, "<br />")

        For Each word As String In keywords
            span = (<span class="keyword"><%= word %></span>).ToString
            html.Replace($"&nbsp;{word}&nbsp;", $"&nbsp;{span}&nbsp;")
        Next

        Dim comments$() = vb.Matches("'.+$", RegexICMul).ToArray

        For Each [REM] As String In comments
            span = (<span class="comment"><%= [REM] %></span>).ToString
            html.Replace([REM], span)
        Next

        Return html.ToString
    End Function

    <Extension>
    Public Function Render(vb$, Optional schema As Schema = Nothing) As String
        Dim css$ = (schema Or Schema.VisualStudioDefault).CSSStyle
        Dim html$ = vb.ToVBhtml

        Return sprintf(
            <div>
                <style type="text/css">
                    %s
                </style>
                <div class="vscode">%s</div>
            </div>, css, html)
    End Function
End Module
