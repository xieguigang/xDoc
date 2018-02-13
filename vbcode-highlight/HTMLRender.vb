Imports System.Runtime.CompilerServices
Imports System.Text
Imports Microsoft.VisualBasic.MIME.Markup.HTML.CSS
Imports Microsoft.VisualBasic.Scripting.SymbolBuilder

Public Module HTMLRender

    ReadOnly CSS$ = <style type="text/css">

                        /* ---------------------{$theme_name}----------------------- */

                        .vscode {
                            background-color: {$background};
                            font: {$font_style} {$font_size}px {$font_family};   
                            color: {$font_color};
                        }
                        .vscode > keyword {
                            color: {$color_keyword};
                        }
                        .vscode > comment {
                            color: {$color_comment};
                        }
                        .vscode > type {
                            color: {$color_type};
                        }
                        .vscode > string {
                            color: {$color_string};
                        }   
                        .vscode > xml {
                            color: {$color_xml}
                        }

                    </style>

    <Extension>
    Public Function CSSStyle(theme As Schema) As String
        With New ScriptBuilder(HTMLRender.CSS)

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

    <Extension>
    Public Function Render(vb$, Optional schema As Schema = Nothing) As String
        Dim css$ = (schema Or Schema.VisualStudioDefault).CSSStyle

    End Function
End Module
