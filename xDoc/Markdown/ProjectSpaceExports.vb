Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Assembly
Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Serialization
Imports Microsoft.VisualBasic.Text
Imports xDoc.Exports

Namespace Markdown

    ''' <summary>
    ''' 通过这个模块对象主要进行 https://docs.microsoft.com/en-us/dotnet/api/?view=netframework-4.7.1
    ''' 页面的导出操作，命名空间的注释主要是通过 <see cref="APIExtensions.NamespaceDoc"/> 名字的<see cref="Type"/>来完成
    ''' 可能一个命名空间会出现在不同的Assembly之中，并且会定义有多个NamespaceDoc，那么他们的注释将会被合并在一起输出
    ''' </summary>
    Public Class ProjectSpaceExports : Inherits ProjectSpace

        Sub New(ps As ProjectSpace, Optional excludeNamespace$() = Nothing)
            Call MyBase.New(excludeVBSpecific:=False)

            Me.projects = {ps.Sum(excludeNamespace, name:=ps.ToString)}.AsList
            Me.handle = ps.ToString
        End Sub

        Public Function ExportMarkdownFiles(pageBuilder As PageExports) As Boolean
            Dim md$
            Dim path$

            For Each p As Project In Me.projects
                For Each pn As ProjectNamespace In p.Namespaces
                    Dim nsExport As New NamespaceExports(pn)

                    md = nsExport.MarkdownPage(pageBuilder.url)
                    path = pageBuilder.url.GetNamespaceSave(nsExport)
                    md.SaveTo(path, TextEncodings.UTF8WithoutBOM)

                    For Each pt As ProjectType In pn.Types.Where(Function(type) type.Name <> NamespaceDoc)
                        Dim typeExport As New TypeExports(pt)
                        md = typeExport.MarkdownPage(pageBuilder.url)
                        path = pageBuilder.url.GetTypeSave(type:=pt)
                        md.SaveTo(path, TextEncodings.UTF8WithoutBOM)
                    Next
                Next
            Next

            Return pageBuilder.SaveNamespaceIndexPage(target:=Me)
        End Function
    End Class
End Namespace
