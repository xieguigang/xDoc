Imports System.Text
Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Assembly
Imports Microsoft.VisualBasic.MIME.Markup.MarkDown
Imports Microsoft.VisualBasic.Text
Imports xDoc.Exports

Namespace Markdown

    Public Class TypeExports : Inherits ProjectType
        Implements IPageBuilder

        Sub New(type As ProjectType)
            Call MyBase.New(type)
        End Sub

        Private Function methodMarkdown(url As URLBuilder) As String
            Dim methods = Me.methods _
                .Where(Function(tuple)
                           Return Not tuple.Key.IsConstructor AndAlso Not tuple.Key.IsOperator
                       End Function) _
                .ToDictionary
            Return ExportMembersInternal(methods, "Methods", "method", [Namespace].Path)
        End Function

        Private Shared Function ExportMembersInternal(methods As Dictionary(Of String, List(Of ProjectMember)), type$, typeDescript$, namespace$) As String
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
                    Call memberInternal(member:=pm, markdown:=markdown, namespaceSkip:=[namespace].Length)
                Next
            Next

            Return markdown.ToString
        End Function

        Private Shared Sub memberInternal(member As ProjectMember, markdown As StringBuilder, namespaceSkip%)
            If Not member.Declare.StringEmpty Then
                markdown.AppendLine("```vbnet")
                markdown.AppendLine($"{Mid(member.Declare, namespaceSkip + 2)}")
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

        Private Function constructorMarkdown() As String
            Dim ctors As New Dictionary(Of String, List(Of ProjectMember))
            If methods.ContainsKey("#ctor") Then
                ctors.Add(".ctor", methods("#ctor"))
            End If
            Return ExportMembersInternal(ctors, "Constructor", "constructors", [Namespace].Path)
        End Function

        Private Function operatorMarkdown() As String
            Dim ops As New Dictionary(Of String, List(Of ProjectMember))

            For Each m In methods
                If m.Key.IsOperator Then
                    ops.Add(m.Key, m.Value)
                End If
            Next

            Return ExportMembersInternal(ops, "Operator", "operators", [Namespace].Path)
        End Function

        Private Function propertyMarkdown() As String
            Return ExportMembersInternal(properties, "Properties", "property", [Namespace].Path)
        End Function

        Private Function FieldsMarkdown() As String
            Return ExportMembersInternal(fields.ToDictionary(Function(f) f.Key, Function(f) {f.Value}.ToList), "Fields", "field", [Namespace].Path)
        End Function

        Private Function EventsMarkdown() As String
            Return ExportMembersInternal(events.ToDictionary(Function(f) f.Key, Function(f) {f.Value}.ToList), "Events", "event", [Namespace].Path)
        End Function

        ''' <summary>
        ''' Exports for the specific type in a namespace
        ''' </summary>
        ''' <param name="url"></param>
        ''' <remarks>这里还应该包括完整的函数的参数注释的输出</remarks>
        Public Function MarkdownPage(url As URLBuilder) As String Implements IPageBuilder.MarkdownPage
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

_namespace: [{[Namespace].Path}]({link})_

{summary}

{remarks}

{fieldList}

{eventList}

{propertyList}

{constructorMarkdown()}

{methodList}

{operatorMarkdown()}"

            text = text.MarkdownPage(title:="Class " & Name, url:=url)

            Return text
        End Function

        Public Function HtmlPage(url As URLBuilder) As String Implements IPageBuilder.HtmlPage
            Dim methodList$ = url.methodMarkdown(methods, [Namespace])
            Dim propertyList$ = properties.propertyMarkdown([Namespace])
            Dim eventList$ = events.EventsMarkdown([Namespace])
            Dim fieldList$ = fields.FieldsMarkdown([Namespace])
            Dim constructors = methods.constructorMarkdown([Namespace])
            Dim operators = methods.operatorMarkdown([Namespace])
            Dim html As New StringBuilder
            Dim link$ = url.GetTypeNamespaceLink(Me)
            Dim markdown As New MarkdownHTML

            html.AppendLine(<h1><%= Name %></h1>)
            html.AppendLine(<i>namespace: <a href=<%= link %>><%= [Namespace].Path %></a></i>)
            html.AppendLine(
                <p>
                    <%= "%s" %>
                </p>,
                markdown.Transform(Me.Summary.CleanText))
            html.AppendLine(
                <blockquot>
                    <%= "%s" %>
                </blockquot>,
                markdown.Transform(Me.Remarks))

            Dim text$ =
$"{fieldList}

{eventList}

{propertyList}

{constructors}

{methodList}

{operators}"

            html.AppendLine(<div id="content">
                                <%= "%s" %>
                            </div>, text)
            text = html.ToString.MarkdownPage(title:="Class " & Name, url:=url)

            Return text
        End Function
    End Class
End Namespace