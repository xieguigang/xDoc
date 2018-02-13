Imports Dev.xDoc.VBCode

Module Module1

    Sub Main()
        Dim css = Schema.VisualStudioDefault.Value.CSSStyle
        Dim html = HTMLRender.Render("E:\repo\xDoc\vbcode-highlight\HTMLRender.vb".ReadAllText)

        Call html.SaveTo("./code.html")


        Pause()
    End Sub
End Module
