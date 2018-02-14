Imports Dev.xDoc.VBCode

Module Module1
    Dim css = Schema.VisualStudioDefault.Value.CSSStyle

    Sub Main()

        '  Call STRINGtEST()

        Dim html = HTMLRender.Render("E:\repo\xDoc\vbcode-highlight\HTMLRender.vb".ReadAllText)

        Call html.SaveTo("./code.html")


        Pause()
    End Sub


    Sub STRINGtEST()
        Dim s$ = <string>
                     Dim hello$ = "Hello world!"


        ' html 之中的 &amp; &lt;> 要在第一步进行转义，否则会将后面所生成的html标签也给转义掉的
        html.Replace("&amp;", "&amp;amp;") _
            .Replace("&lt;", " &amp;lt;") _
            .Replace(">", "&amp;gt;") _
            .Replace(" ", "&amp;nbsp;")
</string>

        Dim html = HTMLRender.Render(s)


        Call html.SaveTo("./code2.html")

        Pause()
    End Sub
End Module
