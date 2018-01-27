﻿Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Assembly
Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Serialization
Imports Microsoft.VisualBasic.Language

Namespace Markdown

    Public Class ProjectSpaceExports : Inherits ProjectSpace

        Sub New(ps As ProjectSpace)
            Me.projects = {ps.Sum}.AsList
            Me.handle = ps.ToString
        End Sub

        ''' <summary>
        ''' 
        ''' </summary>
        ''' <param name="folderPath">The root directory folder path for the generated markdown document that saved.</param>
        ''' <param name="pageTemplate">
        ''' a markdown page template. This token: [content] will be replaced with generated content.
        ''' </param>
        Public Sub ExportMarkdownFiles(folderPath As String, pageTemplate As String, url As URLBuilder)
            Dim directory$

            For Each p As Project In Me.projects
                For Each pn As ProjectNamespace In p.Namespaces

                    With New NamespaceExports(pn)
                        .ExportMarkdownFile(folderPath, pageTemplate, url)
                        directory = url.GetNamespaceSave(folderPath, pn).ParentPath

                        For Each pt As ProjectType In pn.Types
                            .ExportMarkdownFile(directory, pageTemplate, url)
                        Next
                    End With
                Next
            Next
        End Sub

        ''' <summary>
        ''' Default page content template
        ''' </summary>
        Public Const TemplateToken As String = "[content]"

        ''' <summary>
        ''' Using this method for the xml docs export as markdown documents
        ''' </summary>
        ''' <param name="folderPath">
        ''' The root directory folder path for the generated markdown document that saved.
        ''' </param>
        ''' <param name="url">Generates the hexo page source file?</param>
        ''' <returns></returns>
        Public Function ExportMarkdownFiles(folderPath$, Optional url As URLBuilder = Nothing) As Boolean
            With url Or New URLBuilder().AsDefault
                Call ExportMarkdownFiles(folderPath, TemplateToken, .ref)
                Call "Build library index...".__DEBUG_ECHO

                Return BuildIndex(folderPath, .lib)
            End With
        End Function
    End Class
End Namespace
