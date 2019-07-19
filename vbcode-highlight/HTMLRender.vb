Imports System.Runtime.CompilerServices
Imports Microsoft.VisualBasic.MIME.Markup.HTML.CSS
Imports Microsoft.VisualBasic.Scripting.SymbolBuilder
Imports Microsoft.VisualBasic.Scripting.SymbolBuilder.VBLanguage
Imports Microsoft.VisualBasic.Text
Imports Microsoft.VisualBasic.Text.Xml

Public Module HTMLRender

    ''' <summary>
    ''' The html CSS template
    ''' </summary>
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
            .vscode > .xml_comment {
                color: {$color_xml_comment} !important;
            }
            .vscode > .xml {
                color: {$color_xml} !important;
            }
            .vscode > .xml_interpolate {
                color: {$color_xml_interpolate} !important;
            }
        </style>

    ''' <summary>
    ''' Generate CSS style content from the theme model.
    ''' </summary>
    ''' <param name="theme"></param>
    ''' <returns></returns>
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
            !color_xml = theme.Xml
            !color_xml_comment = theme.XmlComment
            !color_xml_interpolate = theme.XmlInterpolate

            Return .ToString
        End With
    End Function

    Const stringQuot$ = "${vb_string_quot}"
    Const commentQuot$ = "${vb_comment_quot}"

    ''' <summary>
    ''' Rendering ``*.vb`` source file to html page with code syntax highlights.
    ''' </summary>
    ''' <param name="vb$">The file content of the vb source file.</param>
    ''' <param name="schema">CSS color theme, By default is the VisualStudio theme.</param>
    ''' <returns></returns>
    <Extension>
    Public Function Render(vb$, Optional schema As Schema = Nothing) As String
        Dim css$ = (schema Or Schema.VisualStudioDefault).CSSStyle
        Dim html$ = vb.HighlightHtml

        Return ApplyCSS(html, css)
    End Function

    <MethodImpl(MethodImplOptions.AggressiveInlining)>
    <Extension> Friend Function ApplyCSS(html$, css$) As String
        Return sprintf(
            <div>
                <style type="text/css">
                    %s
                </style>
                <div class="vscode">
                    %s
                </div>
            </div>, css, html)
    End Function
End Module
