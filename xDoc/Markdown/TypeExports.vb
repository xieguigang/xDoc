Imports System.Text
Imports Microsoft.VisualBasic.ApplicationServices.Development.XmlDoc.Assembly
Imports Microsoft.VisualBasic.Text

Namespace Markdown

    Public Class TypeExports : Inherits ProjectType

        Sub New(type As ProjectType)
            Call MyBase.New(type)
        End Sub

        ''' <summary>
        ''' Exports for the specific type in a namespace
        ''' </summary>
        ''' <param name="folderPath"></param>
        ''' <param name="pageTemplate"></param>
        ''' <param name="url"></param>
        ''' <remarks>这里还应该包括完整的函数的参数注释的输出</remarks>
        Public Sub ExportMarkdownFile(folderPath As String, pageTemplate As String, url As URLBuilder)
            Dim methodList As New StringBuilder()

            If Me.methods.Values.Count > 0 Then
                methodList.AppendLine("### Methods" & vbCr & vbLf)

                Dim sortedMembers As New SortedList(Of String, ProjectMember)()

                For Each pm As ProjectMember In Me.methods.Values
                    sortedMembers.Add(pm.Name, pm)
                Next

                For Each pm As ProjectMember In sortedMembers.Values
                    methodList.AppendLine("#### " & pm.Name)
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
            End If

            Dim propertyList As New StringBuilder()

            If Me.properties.Count > 0 Then
                propertyList.AppendLine("### Properties" & vbCr & vbLf)

                Dim sortedMembers As SortedList(Of String, ProjectMember) = New SortedList(Of String, ProjectMember)()

                For Each pm As ProjectMember In Me.properties.Values
                    sortedMembers.Add(pm.Name, pm)
                Next

                For Each pm As ProjectMember In sortedMembers.Values
                    propertyList.AppendLine("#### " & pm.Name)
                    propertyList.AppendLine(CleanText(pm.Summary))
                Next
            End If

            Dim rmk As String = ""

            For Each l As String In Remarks.lTokens
                rmk &= "> " & l & vbCrLf
            Next

            If Trim(rmk) = ">" OrElse rmk.StringEmpty Then
                rmk = ""
            End If

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
    End Class
End Namespace