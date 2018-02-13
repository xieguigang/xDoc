Imports System.Runtime.CompilerServices
Imports System.Text
Imports Dev.xDoc.Markdown
Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Assembly
Imports Microsoft.VisualBasic.MIME.Markup.MarkDown
Imports Microsoft.VisualBasic.Text.Xml

Namespace Exports

    Module HtmlTypeExports

        <Extension>
        Public Function constructorMarkdown(methods As Dictionary(Of String, List(Of ProjectMember)), [namespace] As ProjectNamespace) As String
            Dim ctors As New Dictionary(Of String, List(Of ProjectMember))
            If methods.ContainsKey("#ctor") Then
                ctors.Add(".ctor", methods("#ctor"))
            End If
            Return ExportMembersInternal(ctors, "Constructor", "constructors", [namespace].Path)
        End Function

        <Extension>
        Public Function operatorMarkdown(methods As Dictionary(Of String, List(Of ProjectMember)), [namespace] As ProjectNamespace) As String
            Dim ops As New Dictionary(Of String, List(Of ProjectMember))

            For Each m In methods
                If m.Key.IsOperator Then
                    ops.Add(m.Key, m.Value)
                End If
            Next

            Return ExportMembersInternal(ops, "Operator", "operators", [namespace].Path)
        End Function

        <Extension>
        Public Function propertyMarkdown(properties As Dictionary(Of String, List(Of ProjectMember)), [namespace] As ProjectNamespace) As String
            Return ExportMembersInternal(properties, "Properties", "property", [namespace].Path)
        End Function

        <Extension>
        Public Function FieldsMarkdown(fields As Dictionary(Of String, ProjectMember), [namespace] As ProjectNamespace) As String
            Return ExportMembersInternal(fields.ToDictionary(Function(f) f.Key, Function(f) {f.Value}.ToList), "Fields", "field", [namespace].Path)
        End Function

        <Extension>
        Public Function EventsMarkdown(events As Dictionary(Of String, ProjectMember), [namespace] As ProjectNamespace) As String
            Return ExportMembersInternal(events.ToDictionary(Function(f) f.Key, Function(f) {f.Value}.ToList), "Events", "event", [namespace].Path)
        End Function

        <Extension>
        Public Function methodMarkdown(url As URLBuilder, methodList As Dictionary(Of String, List(Of ProjectMember)), [namespace] As ProjectNamespace) As String
            Dim methods = methodList _
                .Where(Function(tuple)
                           Return Not tuple.Key.IsConstructor AndAlso Not tuple.Key.IsOperator
                       End Function) _
                .ToDictionary
            Return ExportMembersInternal(methods, "Methods", "method", [namespace].Path)
        End Function

        <Extension>
        Private Function ExportMembersInternal(methods As Dictionary(Of String, List(Of ProjectMember)), type$, typeDescript$, namespace$) As String
            Dim html As New StringBuilder()

            If methods.Count = 0 Then
                Return ""
            Else
                html.AppendLine(<h3>
                                    <%= type %>
                                </h3>)
            End If

            For Each methodGroup In methods.OrderBy(Function(m) m.Key)
                Dim list = methodGroup.Value

                html.AppendLine(<h4>
                                    <%= list(0).Name %>
                                </h4>)

                If list.Count > 1 Then
                    html.AppendLine(
                        <blockquot>
                            <%= list.Count %><%= typeDescript %> Overloads.
                        </blockquot>)
                End If

                For Each pm In list
                    Call memberInternal(member:=pm, html:=html, namespaceSkip:=[namespace].Length)
                Next
            Next

            Return html.ToString
        End Function

        ReadOnly markdown As New MarkdownHTML

        <Extension>
        Private Sub memberInternal(member As ProjectMember, html As StringBuilder, namespaceSkip%)
            If Not member.Declare.StringEmpty Then
                html.AppendLine(
                    <pre>
                        <code class="vbnet">
                            <%= Mid(member.Declare, namespaceSkip + 2) %>
                        </code>
                    </pre>)
            End If

            html.AppendLine(
                <p>
                    <%= "%s" %>
                </p>, markdown.Transform(member.Summary.CleanText))

            If Not member.Params.IsNullOrEmpty Then
                Call html.AppendLine("<table>")
                Call html.AppendLine(
                    <thead>
                        <tr>
                            <th>Parameter Name</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>)
                Call html.AppendLine("<tbody>")

                For Each arg In member.Params
                    Call html.AppendLine(
                        <tr>
                            <td><%= arg.name %></td>
                            <td><%= "%s" %></td>
                        </tr>, markdown.Transform(arg.text))
                Next

                Call html.AppendLine("</tbody>")
                Call html.AppendLine("</table>")
            End If

            If Not member.Returns.StringEmpty Then
                html.AppendLine()
                html.AppendLine(
                    <p>
                        <i>returns: <%= "%s" %></i>
                    </p>, markdown.Transform(member.Returns))
            End If

            If Not member.Remarks.StringEmpty Then
                html.AppendLine(<blockquot>
                                    <%= "%s" %>
                                </blockquot>, markdown.Transform(member.Remarks))
            End If

            Call html.AppendLine()
        End Sub
    End Module
End Namespace