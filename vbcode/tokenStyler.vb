Imports System.Text
Imports Microsoft.VisualBasic.Scripting.SymbolBuilder
Imports Microsoft.VisualBasic.Language

Public Class tokenStyler

    ReadOnly code As New StringBuilder()

    Dim rowList As New List(Of String)
    Dim lastToken As Value(Of String) = ""

    ''' <summary>
    ''' 获取当前的符号所处的行号 
    ''' </summary>
    ''' <returns></returns>
    Public ReadOnly Property lineNumber As Integer
        Get
            Return rowList.Count
        End Get
    End Property

    ''' <summary>
    ''' 获取上一次添加的符号
    ''' </summary>
    ''' <returns></returns>
    Public ReadOnly Property LastAddedToken As String
        Get
            Return lastToken
        End Get
    End Property

    '''' <summary>
    '''' 获取得到代码源文件的大纲概览结构信息
    '''' </summary>
    '''' <returns></returns>
    'Public ReadOnly Property CodeSummary As TOC.Summary
    '    Get
    '        Return this.summary
    '    End Get
    'End Property

    ''' <summary>
    ''' 上一个追加的单词是一个类型定义或者引用的关键词
    ''' </summary>
    ''' <returns></returns>
    Public Property LastTypeKeyword As Boolean

    ''' <summary>
    ''' 上一次添加的符号是一个换行符
    ''' </summary>
    ''' <returns></returns>
    Public Property LastNewLine As Boolean = True

    ''' <summary>
    ''' 上一次添加的符号是一个预处理符号
    ''' </summary>
    ''' <returns></returns>
    Public Property LastDirective As Boolean

    Private Function tagClass(token As String, cls As String) As String
        Return $"<span class=""{cls}"">{lastToken = token}</span>"
    End Function

    Public Sub append(token As String)
        If token = " " Then
            Call code.Append("&nbsp;")
        ElseIf token = vbTab Then
            ' 是一个TAB
            ' 则插入4个空格
            For i As Integer = 0 To 4 - 1
                Call code.Append("&nbsp;")
            Next
        ElseIf token = "(" OrElse token = "{" OrElse token = "," Then
            Call code.Append(token)
        Else
            Call code.Append(lastToken = token)

            LastTypeKeyword = False
            LastDirective = False
        End If

        LastNewLine = False
    End Sub

    Public Sub appendLine(Optional token As String = "")
        code.AppendLine((lastToken = token) & "<br />")
        LastTypeKeyword = False
        LastNewLine = True
        LastDirective = False

        Call appendNewRow()
    End Sub

    Private Function buildHashLink(L As Integer) As String
        Return $"<a id=""L{L}"" href=""#L{L}"" class=""line-hash"">{{0}}</a>"
    End Function

    Public Sub flush()
        If code.Length > 0 Then
            Call appendNewRow()
        End If
    End Sub

    Private Sub appendNewRow()
        Dim L = lineNumber
        Dim line = $"<span class=""line"">{L}: </span>"
        Dim hash = String.Format(buildHashLink(L), line)
        Dim snippet = $"<td class=""snippet"">{code.ToString}</td>"
        Dim tr = $"<tr>
    <td class=""lines"">{hash}</td>
 {snippet}
</tr>"

        rowList += tr
        code.Clear()
    End Sub

    Public Sub directive(token As String)
        Call code.Append(tagClass(token, NameOf(directive)))
        LastTypeKeyword = False
        LastNewLine = False
        LastDirective = True
    End Sub

    Public Sub type(token As String)
        code.Append(tagClass(token, NameOf(type)))
        LastTypeKeyword = False
        LastNewLine = False
        LastDirective = False


    End Sub

    Public Sub comment(token As String)
        code.AppendLine(tagClass(highlightURLs(token), NameOf(comment)) & "<br />")

        LastTypeKeyword = False
        LastNewLine = True
        LastDirective = False

        appendNewRow()
    End Sub

    Public Shared Function highlightURLs(token As String) As String
        Dim urls = token.Matches("((https?)|(ftp))[:]\/{2}\S+\.[a-z]+[^ >""]*").ToArray
        Dim a As String

        For Each url As String In urls
            a = $"<a href=""{url}"">{url}</a>"
            token = token.Replace(url, a)
        Next

        Return token
    End Function

    Public Sub [string](token As String)
        code.Append(highlightURLs(token), NameOf([string]))

        LastTypeKeyword = False
        LastNewLine = False
        LastDirective = False
    End Sub

    Public Sub keyword(token As String)
        code.Append(tagClass(token, NameOf(keyword)))

        If token Like Highlighter.typeDefine Then
            LastTypeKeyword = True
        Else
            LastTypeKeyword = False
        End If

        LastNewLine = False
        LastDirective = False
    End Sub

    Public Sub attribute(token As String)
        code.Append(tagClass(token, NameOf(attribute)))

        LastTypeKeyword = False
        LastNewLine = False
        LastDirective = False
    End Sub
End Class
