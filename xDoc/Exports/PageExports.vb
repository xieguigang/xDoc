Imports System.Text
Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Assembly
Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Serialization
Imports Microsoft.VisualBasic.Language
Imports xDoc.Markdown

Namespace Exports

    ''' <summary>
    ''' 这个部件提供导出部件所生成的markdown文本的保存的功能
    ''' </summary>
    Public Class PageExports

        Public ReadOnly url As URLBuilder

        ReadOnly template$
        ReadOnly folderPath$

        ''' <summary>
        ''' 
        ''' </summary>
        ''' <param name="folderPath">
        ''' The root directory folder path for the generated markdown document that saved.
        ''' </param>
        ''' <param name="url"></param>
        ''' <param name="template$">
        ''' A markdown page template. This token: ``{$content}`` will be replaced with generated markdown content.
        ''' </param>
        Sub New(folderPath$, url As URLBuilder, Optional template$ = "{$content}")
            Me.template = template
            Me.url = url
            Me.folderPath = folderPath
        End Sub

        ''' <summary>
        ''' 生成 browser by namespace 总索引页面
        ''' </summary>
        ''' <param name="target">Target document assembly for output.</param>
        Public Function SaveNamespaceIndexPage(target As ProjectSpace) As Boolean
            Dim path As String = folderPath & "/index.md"
            Dim allns$() = LinqAPI.Exec(Of String) _
 _
                () <= From x As Project
                      In target
                      Let list = x.Namespaces.Select(Function(ns) ns.Path)
                      Select list

            Dim annotations = target.ScanAnnotations
            Dim ext As String = If(url.[lib] = Libraries.Hexo, ".html", ".md")
            Dim links As String() = allns _
                .OrderBy(Function(ns) ns) _
                .Select(Function(ns)
                            Return __getIndexLink(ns, ext, url.[lib], annotations, html:=False)
                        End Function) _
                .ToArray
            Dim sb As String = "Browser by namespace:" & vbCrLf & vbCrLf
            sb = sb & "|Namespace|Description|
|----------|-----------|
"
            sb = sb & links.JoinBy(vbCrLf)
            sb = sb.MarkdownPage("API index", url)

            Return sb.SaveTo(path)
        End Function

        Private Shared Function __getIndexLink(ns$, ext$, [lib] As Libraries, annotations As Dictionary(Of String, String), html As Boolean) As String
            If [lib] = Libraries.Hexo Then
                If html Then
                    Return $"+ [{ns}]({If([lib] = Libraries.Hexo, $"N-{ns}{ext}", $"./{ns}/index.md")})"
                Else
                    Return $"+ [{ns}]({If([lib] = Libraries.Hexo, $"N-{ns}{ext}", $"./{ns}/index.md")})"
                End If
            ElseIf [lib] = Libraries.xDoc Then
                Dim info$ = If(annotations.ContainsKey(ns), annotations(ns).lTokens.JoinBy("<br />"), "-")

                If html Then
                    Return <tr>
                               <td><a href=<%= $"/docs/{ns.Replace(".", "/")}/index.html" %>><%= ns %></a></td>
                               <td><%= info %></td>
                           </tr>
                Else
                    Return $"|[{ns}](/docs/{ns.Replace(".", "/")}/index.html)|{info}|"
                End If
            Else
                Throw New NotImplementedException
            End If
        End Function

        Public Function SaveNamespaceIndexHtmlPage(target As ProjectSpace) As Boolean
            Dim path As String = folderPath & "/index.md"
            Dim allns$() = LinqAPI.Exec(Of String) _
 _
                () <= From x As Project
                      In target
                      Let list = x.Namespaces.Select(Function(ns) ns.Path)
                      Select list

            Dim annotations = target.ScanAnnotations
            Dim ext As String = If(url.[lib] = Libraries.Hexo, ".html", ".md")
            Dim links As String() = allns _
                .OrderBy(Function(ns) ns) _
                .Select(Function(ns)
                            Return __getIndexLink(ns, ext, url.[lib], annotations, html:=True)
                        End Function) _
                .ToArray
            Dim sb As New StringBuilder

            sb.AppendLine(<p>Browser by namespace:</p>)
            sb.AppendLine("<table>")
            sb.AppendLine(<thead>
                              <tr>
                                  <th>Namespace</th>
                                  <th>Description</th>
                              </tr>
                          </thead>)

            sb.AppendLine("<tbody>")
            sb.AppendLine(links.JoinBy(vbCrLf))
            sb.AppendLine("</tbody>")
            sb.AppendLine("</table>")

            Return sb.ToString.MarkdownPage("API index", url).SaveTo(path)
        End Function
    End Class
End Namespace