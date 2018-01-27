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
            Dim methodList As New StringBuilder()

            methodList.AppendLine("### Methods" & vbCr & vbLf)

            For Each methodGroup In methods.OrderBy(Function(m) m.Key)
                Dim list = methodGroup.Value

                methodList.AppendLine("#### " & list(0).Name)

                If list.Count > 1 Then
                    methodList.AppendLine($"> {list.Count} function overloads.")
                End If

                For Each pm In list
                    If Not pm.Declare.StringEmpty Then
                        methodList.AppendLine("```csharp")
                        methodList.AppendLine($"{pm.Declare}")
                        methodList.AppendLine("```")
                    End If
                    methodList.AppendLine(pm.Summary.CleanText)

                    If Not pm.Params.IsNullOrEmpty Then
                        Call methodList.AppendLine()
                        Call methodList.AppendLine("|Parameter Name|Remarks|")
                        Call methodList.AppendLine("|--------------|-------|")

                        For Each arg In pm.Params
                            Call methodList.AppendLine($"|{arg.name}|{arg.text}|")
                        Next

                        Call methodList.AppendLine()
                    End If

                    If Not pm.Returns.StringEmpty Then
                        If Not url.[lib] = Libraries.Hexo Then
                            methodList.AppendLine()
                        End If
                        methodList.AppendLine("_returns: " & pm.Returns & "_")
                    End If

                    If Not pm.Remarks.StringEmpty Then
                        For Each line As String In pm.Remarks.lTokens
                            Call methodList.AppendLine("> " & line)
                        Next
                    End If

                    Call methodList.AppendLine()
                Next
            Next

            Return methodList.ToString
        End Function

        Private Function propertyMarkdown() As String
            Dim propertyList As New StringBuilder()

            propertyList.AppendLine("### Properties" & vbCr & vbLf)

            For Each pm In properties.OrderBy(Function(p) p.Key)
                Dim list = pm.Value

                propertyList.AppendLine("#### " & list(0).Name)

                If list.Count > 1 Then
                    propertyList.AppendLine($"> {list.Count} property overloads.")
                End If

                For Each prop As ProjectMember In list
                    propertyList.AppendLine(prop.Summary.CleanText())
                Next
            Next

            Return propertyList.ToString
        End Function

        ''' <summary>
        ''' Exports for the specific type in a namespace
        ''' </summary>
        ''' <param name="folderPath"></param>
        ''' <param name="pageTemplate"></param>
        ''' <param name="url"></param>
        ''' <remarks>这里还应该包括完整的函数的参数注释的输出</remarks>
        Public Sub ExportMarkdownFile()
            Dim methodList$
            Dim propertyList$

            If Me.methods.Count = 0 Then
                methodList = ""
            Else
                methodList = methodMarkdown(url)
            End If

            If Me.properties.Count = 0 Then
                propertyList = ""
            Else
                propertyList = propertyMarkdown()
            End If

            Dim rmk As String = Remarks.lTokens.Select(Function(line) "> " & line).JoinBy(ASCII.LF)
            Dim link$ = url.GetTypeNamespaceLink(Me)
            Dim text As String = String.Format("# {0}" & vbCr & vbLf &
                                               $"_namespace: {link}_" & vbCr & vbLf &
                                               vbCr & vbLf &
                                               "{2}" & vbCr & vbLf &
                                               vbCr & vbLf &
                                               "{3}" & vbCr & vbLf &
                                               vbCr & vbLf &
                                               "{4}" & vbCr & vbLf &
                                               "{5}", Me.Name, Me.[Namespace].Path, Me.Summary.CleanText, rmk, methodList.ToString(), propertyList.ToString())

            Dim path$ = url.GetTypeSave(folderPath, Me) ' *.md save path

            If url.[lib] = Libraries.Hexo Then
                text = $"---
title: {Me.Name}
---

" & text
            Else
                If pageTemplate IsNot Nothing Then
                    text = pageTemplate.Replace("[content]", text)
                End If
            End If

            Call text.SaveTo(path, UTF8WithoutBOM)
        End Sub

        Public Function MarkdownPage(url As URLBuilder) As String Implements IMarkdownExport.MarkdownPage
            Throw New NotImplementedException()
        End Function
    End Class
End Namespace