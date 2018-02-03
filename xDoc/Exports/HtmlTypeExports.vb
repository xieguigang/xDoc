Imports System.Runtime.CompilerServices
Imports System.Text
Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Assembly
Imports xDoc.Markdown

Namespace Exports

    Module HtmlTypeExports

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
                    <%= member.Summary.CleanText %>
                </p>)

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
                            <td><%= arg.text %></td>
                        </tr>)
                Next

                Call html.AppendLine("</tbody>")
                Call html.AppendLine("</table>")
            End If

            If Not member.Returns.StringEmpty Then
                html.AppendLine()
                html.AppendLine(
                    <p>
                        <i>returns: <%= member.Returns %></i>
                    </p>)
            End If

            If Not member.Remarks.StringEmpty Then
                html.AppendLine(<blockquot>
                                    <%= member.Remarks %>
                                </blockquot>)
            End If

            Call html.AppendLine()
        End Sub
    End Module
End Namespace