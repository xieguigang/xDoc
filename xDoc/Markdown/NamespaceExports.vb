Imports System.Text
Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Assembly
Imports Microsoft.VisualBasic.Text

Namespace Markdown

    Public Class NamespaceExports : Inherits ProjectNamespace

        Sub New(ns As ProjectNamespace)
            Call MyBase.New(ns)
            Path = ns.Path
        End Sub

        ''' <summary>
        ''' Exports for namespace markdown documents
        ''' </summary>
        ''' <param name="folderPath"></param>
        ''' <param name="pageTemplate"></param>
        ''' <param name="url"></param>
        Public Sub ExportMarkdownFile(folderPath As String, pageTemplate As String, url As URLBuilder)
            Dim typeList As New StringBuilder()
            Dim projectTypes As New SortedList(Of String, ProjectType)()

            For Each pt As ProjectType In Me.Types
                projectTypes.Add(pt.Name, pt)
            Next

            Call typeList.AppendLine("|Type|Summary|")
            Call typeList.AppendLine("|----|-------|")

            For Each pt As ProjectType In projectTypes.Values
                Dim lines$() = If(pt.Summary Is Nothing, "", pt.Summary) _
                    .Trim(ASCII.CR, ASCII.LF) _
                    .Trim _
                    .lTokens
                Dim summary$ = If(lines.IsNullOrEmpty OrElse lines.Length = 1,
                    lines.FirstOrDefault,
                    lines.First & " ...")
                Dim link As String = url.GetNamespaceTypeUrl(Me, pt)

                Call typeList.AppendLine($"|{link}|{summary}|")
            Next

            Dim text As String
            Dim path$ = url.GetNamespaceSave(folderPath, Me) ' *.md output path

            If url.[lib] = Libraries.Hexo Then
                text = $"---
title: {Me.Path}
---"
                text = text & vbCrLf & vbCrLf & typeList.ToString
            Else
                text = vbCr & vbLf & "# {0}" & vbCr & vbLf & vbCr & vbLf & "{1}" & vbCr & vbLf
                text = String.Format(text, Me.Path, typeList.ToString())
            End If

            If pageTemplate IsNot Nothing Then
                text = pageTemplate.Replace("[content]", text)
            End If

            Call text.SaveTo(path, UTF8WithoutBOM)
        End Sub
    End Class
End Namespace