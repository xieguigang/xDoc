Imports Dev.xDoc.Exports

Namespace Markdown

    Public Interface IPageBuilder

        Function MarkdownPage(url As URLBuilder) As String
        Function HtmlPage(url As URLBuilder) As String
    End Interface
End Namespace