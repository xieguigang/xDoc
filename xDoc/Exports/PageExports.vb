Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Assembly
Imports Microsoft.VisualBasic.Language

Namespace Exports

    Public Class PageExports

        ReadOnly template$
        ReadOnly url As URLBuilder

        Sub New(template As String, url As URLBuilder)
            Me.template = template
            Me.url = url
        End Sub

        ''' <summary>
        ''' 生成 browser by namespace 总索引页面
        ''' </summary>
        ''' <param name="folderPath"></param>
        ''' <param name="target">Target document assembly for output.</param>
        Public Function SaveNamespaceIndexPage(folderPath$, target As ProjectSpace) As Boolean
            Dim path As String = folderPath & "/index.md"
            Dim allns$() = LinqAPI.Exec(Of String) _
 _
                () <= From x As Project
                      In projects
                      Let list = x.Namespaces.Select(Function(ns) ns.Path)
                      Select list

            Dim ext As String = If([lib] = Libraries.Hexo, ".html", ".md")
            Dim links As String() = allns _
                .OrderBy(Function(ns) ns) _
                .Select(Function(ns) __getIndexLink(ns, ext, [lib])) _
                .ToArray
            Dim sb As String = "Browser by namespace:" & vbCrLf &
                vbCrLf &
                links.JoinBy(vbCrLf)

            If [lib] = Libraries.Hexo Then
                sb = $"---
title: API index
date: {Now.ToString}
---

" & sb
            End If

            Return sb.SaveTo(path)
        End Function

        Private Shared Function __getIndexLink(ns$, ext$, [lib] As Libraries) As String
            If [lib] <> Libraries.xDoc Then
                Return $"+ [{ns}]({If([lib] = Libraries.Hexo, $"N-{ns}{ext}", $"./{ns}/index.md")})"
            Else
                Return $"+ <a href=""#"" onClick=""load('/docs/{ns}/index.md')"">{ns}</a>"
            End If
        End Function
    End Class
End Namespace