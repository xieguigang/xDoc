Imports System.Text
Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Assembly
Imports xDoc.Exports

Namespace Markdown

    Public Class NamespaceExports : Inherits ProjectNamespace
        Implements IMarkdownExport

        Sub New(ns As ProjectNamespace)
            Call MyBase.New(ns)
            Path = ns.Path
        End Sub

        ''' <summary>
        ''' Exports for namespace markdown documents
        ''' </summary>
        ''' <param name="url"></param>
        Public Function MarkdownPage(url As URLBuilder) As String Implements IMarkdownExport.MarkdownPage
            Dim typeList As New StringBuilder()

            Call typeList.AppendLine("|Type|Summary|")
            Call typeList.AppendLine("|----|-------|")

            For Each pt As ProjectType In Types.OrderBy(Function(t) t.Name)
                Dim summary$ = pt.Summary.lTokens.JoinBy("<br />")
                Dim link As String = url.GetNamespaceTypeUrl(Me, pt)

                Call typeList.AppendLine($"|{link}|{summary}|")
            Next

            Dim text$ = typeList.ToString.MarkdownPage(title:=Me.Path, url:=url)
            Return text
        End Function
    End Class
End Namespace