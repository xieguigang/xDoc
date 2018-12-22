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
    ''' Render *.vb source file to html page
    ''' </summary>
    ''' <param name="vb"></param>
    ''' <returns></returns>
    <Extension>
    Public Function ToVBhtml(vb As String) As String
        Dim html As New ScriptBuilder(vb)
        Dim span$
        Dim keywords$() = KeywordProcessor _
            .VBKeywords _
            .Split("|"c) _
            .Where(Function(w)
                       Return Not w.StringEmpty
                   End Function) _
            .OrderByDescending(Function(s) s.Length) _
            .ToArray

        ' html 之中的 & <> 要在第一步进行转义，否则会将后面所生成的html标签也给转义掉的
        html.Replace("&", "&amp;") _
            .Replace("<", "&lt;") _
            .Replace(">", "&gt;") _
            .Replace(" ", "&nbsp;")

        Dim xmlComments$() = html.Preview _
            .Matches("[']{3}.+$", RegexICMul) _
            .ToArray

        For Each xmlComment$ In xmlComments
            span = (<span class="xml_comment"><%= xmlComment.TrimNewLine %></span>) _
               .ToString _
               .Replace("&amp;", "&") _
               .Replace("'", commentQuot) _
               .Replace("""", stringQuot)

            Call html.Replace(xmlComment, span)
        Next

        Dim xmlInterpolate$() = html.Preview _
            .Matches("<%[=].*%>", RegexICSng) _
            .ToArray

        For Each interpolate As String In xmlInterpolate
            span = (<span class="xml_interpolate"><%= interpolate %></span>) _
                .ToString

            Call html.Replace(interpolate, span)
        Next

        Dim comments$() = html.Preview _
            .Matches("['][^'].+$", RegexICMul) _
            .ToArray

        Dim strings$() = html.Preview _
            .Matches("[""].*?[""]", RegexICSng) _
            .ToArray

        For Each str As String In strings
            span = (<span class="string"><%= str %></span>) _
                .ToString _
                .Replace("&amp;", "&") _
                .Replace("""", stringQuot)

            Call html.Replace(str, span)
        Next

        Call html.Replace(stringQuot, """")
        Call html.Replace(commentQuot, "'")

        For Each [REM] As String In comments
            span = (<span class="comment"><%= [REM].TrimNewLine %></span>) _
                .ToString _
                .Replace("&amp;", "&")

            Call html.Replace([REM], span)
        Next

        ' As type
        ' 因为As是一个关键词，所以需要在keyword的前面发生替换
        Dim objName$ = "As(&nbsp;)(New(&nbsp;))?(&nbsp;)+" & Patterns.Identifer
        Dim types$() = html _
            .Preview _
            .Matches(objName, RegexICSng) _
            .ToArray

        For Each type As String In types
            span = Mid(type, 3)
            span = (<span class="type"><%= span %></span>) _
                .ToString _
                .Replace("&amp;", "&")

            Call html.Replace(type, "As" & span)
        Next

        For Each word As String In keywords
            span = (<span class="keyword"><%= word %></span>) _
                .ToString
            html.Replace($"&nbsp;{word}&nbsp;", $"&nbsp;{span}&nbsp;")

            Dim lineBreaks$() = html.Preview _
                .Matches($"^{word}[&]nbsp;", RegexICMul) _
                .ToArray

            For Each l In lineBreaks
                html.Replace(l, $"{span}&nbsp;")
            Next

            Call html.Replace($"&nbsp;{word}", $"&nbsp;{span}")
        Next

        ' fix for lambda function
        span = (<span class="keyword">Function</span>) _
            .ToString & "("

        Call html.Replace("Function(", span)

        Call html.Replace(vbLf, "<br />" & ASCII.LF)
        Call html.Replace(vbCr, "")

        Return html.ToString
    End Function

    ''' <summary>
    ''' Rendering ``*.vb`` source file to html page with code syntax highlights.
    ''' </summary>
    ''' <param name="vb$">The file content of the vb source file.</param>
    ''' <param name="schema">CSS color theme, By default is the VisualStudio theme.</param>
    ''' <returns></returns>
    <Extension>
    Public Function Render(vb$, Optional schema As Schema = Nothing) As String
        Dim css$ = (schema Or Schema.VisualStudioDefault).CSSStyle
        Dim html$ = vb.ToVBhtml
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
