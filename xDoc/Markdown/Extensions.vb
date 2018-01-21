﻿Imports System.Runtime.CompilerServices
Imports Microsoft.VisualBasic.Language

Namespace Markdown

    ''' <summary>
    ''' 在Core模块之中只是一个XML assembly的解析器，对markdown文档的导出功能是被放置在这个项目之中的
    ''' </summary>
    Module Extensions

        Dim libraries As Dictionary(Of String, Libraries) =
            Enums(Of Libraries) _
            .ToDictionary(Function(x) x.ToString.ToLower)

        ''' <summary>
        ''' 类型名称的大小写不敏感
        ''' </summary>
        ''' <param name="type"></param>
        ''' <returns>查找失败的时候默认是返回<see cref="Libraries.Github"/></returns>
        <Extension>
        Public Function GetLibraryType(type As Value(Of String)) As Libraries
            If libraries.ContainsKey(type = LCase(+type)) Then
                Return libraries(+type)
            Else
                Return Markdown.Libraries.Github
            End If
        End Function

        <Extension>
        Public Function CleanText(incomingText As String) As String
            If incomingText Is Nothing Then
                Return String.Empty
            End If

            incomingText = incomingText.Replace(vbTab, "").Trim()

            Dim results As String = String.Empty
            Dim lastCharWasSpace As Boolean = False
            For Each c As Char In incomingText
                If c <> " "c Then
                    lastCharWasSpace = False
                    results += c
                ElseIf Not lastCharWasSpace Then
                    lastCharWasSpace = True
                    results += c
                End If
            Next

            Return results
        End Function
    End Module
End Namespace