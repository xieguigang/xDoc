Imports System.Text
Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Assembly
Imports Microsoft.VisualBasic.Text
Imports xDoc.Exports

Namespace Markdown

    Public Class TypeExports : Inherits ProjectType
        Implements IMarkdownExport

        Sub New(type As ProjectType)
            Call MyBase.New(type)
        End Sub

        Private Function methodMarkdown(url As URLBuilder) As String
            Return ExportMembersInternal(methods, "Methods", "method")
        End Function

        Private Shared Function ExportMembersInternal(methods As Dictionary(Of String, List(Of ProjectMember)), type$, typeDescript$) As String
            Dim markdown As New StringBuilder()

            If methods.Count = 0 Then
                Return ""
            Else
                markdown.AppendLine($"### {type}" & vbCr & vbLf)
            End If

            For Each methodGroup In methods.OrderBy(Function(m) m.Key)
                Dim list = methodGroup.Value

                markdown.AppendLine("#### " & list(0).Name)

                If list.Count > 1 Then
                    markdown.AppendLine($"> {list.Count} {typeDescript} overloads.")
                End If

                For Each pm In list
                    Call memberInternal(member:=pm, markdown:=markdown)
                Next
            Next

            Return markdown.ToString
        End Function

        Private Shared Sub memberInternal(member As ProjectMember, markdown As StringBuilder)
            If Not member.Declare.StringEmpty Then
                markdown.AppendLine("```vbnet")
                markdown.AppendLine($"{member.Declare}")
                markdown.AppendLine("```")
            End If
            markdown.AppendLine(member.Summary.CleanText)

            If Not member.Params.IsNullOrEmpty Then
                Call markdown.AppendLine()
                Call markdown.AppendLine("|Parameter Name|Remarks|")
                Call markdown.AppendLine("|--------------|-------|")

                For Each arg In member.Params
                    Call markdown.AppendLine($"|{arg.name}|{arg.text}|")
                Next

                Call markdown.AppendLine()
            End If

            If Not member.Returns.StringEmpty Then
                markdown.AppendLine()
                markdown.AppendLine("_returns: " & member.Returns & "_")
            End If

            If Not member.Remarks.StringEmpty Then
                For Each line As String In member.Remarks.lTokens
                    Call markdown.AppendLine("> " & line)
                Next
            End If

            Call markdown.AppendLine()
        End Sub

        Private Function propertyMarkdown() As String
            Return ExportMembersInternal(properties, "Properties", "property")
        End Function

        Private Function FieldsMarkdown() As String
            Return ExportMembersInternal(fields.ToDictionary(Function(f) f.Key, Function(f) {f.Value}.ToList), "Fields", "field")
        End Function

        Private Function EventsMarkdown() As String
            Return ExportMembersInternal(events.ToDictionary(Function(f) f.Key, Function(f) {f.Value}.ToList), "Events", "event")
        End Function

        ''' <summary>
        ''' Exports for the specific type in a namespace
        ''' </summary>
        ''' <param name="url"></param>
        ''' <remarks>这里还应该包括完整的函数的参数注释的输出</remarks>
        Public Function MarkdownPage(url As URLBuilder) As String Implements IMarkdownExport.MarkdownPage
            Dim methodList$ = methodMarkdown(url)
            Dim propertyList$ = propertyMarkdown()
            Dim eventList$ = EventsMarkdown()
            Dim fieldList$ = FieldsMarkdown()
            Dim remarks$ = Me.Remarks _
                .lTokens _
                .Select(Function(line) "> " & line) _
                .JoinBy(ASCII.LF)
            Dim summary$ = Me.Summary.CleanText
            Dim link$ = url.GetTypeNamespaceLink(Me)
            Dim text$ =
$"# {Name}

_namespace: {link}_

{summary}

{remarks}

{fieldList}

{eventList}

{methodList}

{propertyList}"

            text = text.MarkdownPage(title:="Class " & Name, url:=url)

            Return text
        End Function
    End Class
End Namespace