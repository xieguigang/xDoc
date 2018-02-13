Imports System.Text
Imports Dev.xDoc.Exports
Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Assembly

Namespace Markdown

    Public Class NamespaceExports : Inherits ProjectNamespace
        Implements IPageBuilder

        Sub New(ns As ProjectNamespace)
            Call MyBase.New(ns)
            Path = ns.Path
        End Sub

        ''' <summary>
        ''' Exports for namespace markdown documents
        ''' </summary>
        ''' <param name="url"></param>
        Public Function MarkdownPage(url As URLBuilder) As String Implements IPageBuilder.MarkdownPage
            Dim typeList As New StringBuilder()

            Call typeList.AppendLine("|Type|Summary|")
            Call typeList.AppendLine("|----|-------|")

            For Each pt As ProjectType In Types.OrderBy(Function(t) t.Name)
                Dim summary$ = pt.Summary.lTokens.JoinBy("<br />")
                Dim link As String = url.GetNamespaceTypeUrl(Me, pt)

                Call typeList.AppendLine($"|[{pt.Name}]({link})|{summary}|")
            Next

            Dim text$ = typeList.ToString.MarkdownPage(title:=Me.Path, url:=url)
            Return text
        End Function

        Public Function HtmlPage(url As URLBuilder) As String Implements IPageBuilder.HtmlPage
            Dim typeList As New StringBuilder()

            typeList.AppendLine("<table>")
            typeList.AppendLine(<thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Summary</th>
                                    </tr>
                                </thead>)

            Call typeList.AppendLine("<tbody>")

            For Each pt As ProjectType In Types.OrderBy(Function(t) t.Name)
                Dim summary$ = pt.Summary.lTokens.JoinBy("<br />")
                Dim link As String = url.GetNamespaceTypeUrl(Me, pt)

                Call typeList.AppendLine(
                    <tr>
                        <td><a href=<%= link %>><%= pt.Name %></a></td>
                        <td><%= summary %></td>
                    </tr>)
            Next

            Call typeList.AppendLine("</tbody>")
            Call typeList.AppendLine("</table>")

            Dim text$ = typeList.ToString.MarkdownPage(title:=Me.Path, url:=url)
            Return text
        End Function
    End Class
End Namespace