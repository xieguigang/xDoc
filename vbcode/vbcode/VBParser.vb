Imports Microsoft.VisualBasic.Emit.Marshal
Imports Microsoft.VisualBasic.Language
Imports Microsoft.VisualBasic.Text

Public Class VBParser

    Dim code As New tokenStyler
    Dim escapes As New escapes
    Dim token As New List(Of Char)

    Dim chars As Pointer(Of Char)

    Public ReadOnly Property isKeyword As Boolean
        Get
            Return token.JoinBy("") Like Highlighter.VBKeywords
        End Get
    End Property

    Public ReadOnly Property isAttribute As Boolean
        Get
            If token > 0 Then
                Dim haveTagEnd = token.Last = ">"c OrElse chars.Value(-1) = "("c
                Return token(Scan0) = "<" AndAlso haveTagEnd
            Else
                Return False
            End If
        End Get
    End Property

    Sub New(chars As Pointer(Of Char))
        Me.chars = chars
    End Sub

    Public Function getTokens() As tokenStyler
        Do While Not chars.EndRead
            Call walkChar(++chars)
        Loop

        If token > 0 Then
            Call walknewline
        End If

        Call code.flush()
        Return code
    End Function

    Private Shared Function peekNextToken(chars As Pointer(Of Char), Optional allowNewline As Boolean = False) As String
        Dim i As VBInteger = 1
        Dim c As Value(Of Char) = ""

        Do While ((c = chars.RawBuffer(++i)) = " "c) OrElse c Like ASCII.CR OrElse c Like ASCII.LF
            If c Like ASCII.CR OrElse c Like ASCII.LF AndAlso Not allowNewline Then
                Exit Do
            End If
        Loop

        Return c
    End Function

    Private Sub endToken()
        If token = 0 Then
            Return
        End If

        If isAttribute Then
            code.append(token(0))

            If token.Last = ">"c Then
                code.attribute(token.Skip(1).Take(token.Count - 2).JoinBy(""))
                code.append(token.Last)
            Else
                code.attribute(token.Skip(1).Take(token.Count - 1).JoinBy(""))
            End If
        ElseIf code.LastNewLine AndAlso token(Scan0) = "#"c Then
            code.directive(token.CharString)
        Else
            Dim word As New String(token)

            If code.LastDirective Then
                code.directive(word)
            ElseIf word Like VBKeywords Then
                code.keyword(word)
            ElseIf code.LastTypeKeyword Then
                If code.LastAddedToken = "Imports" Then

                    If VBParser.peekNextToken(chars) = "=" Then
                        code.type(word)
                    Else
                        code.append(word)
                    End If
                ElseIf word = "(" Then
                    code.append(word)
                Else
                    code.type(word)
                End If
            Else
                code.append(word)
            End If
        End If

        token *= 0
    End Sub

    Private Sub walkNewline()
        If escapes.comment Then
            code.comment(token.CharString)
            escapes.comment = False
            token *= 0
        ElseIf escapes.string Then
            code.string(token.CharString)
            code.appendLine()
            token *= 0
        Else
            endToken()
            code.appendLine()
        End If
    End Sub

    Private Sub walkStringQuot()
        If Not escapes.string Then
            escapes.string = True
            endToken()
            token += """"c
        ElseIf escapes.string Then
            escapes.string = False
            token += """"c
            code.string(token.CharString)
            token *= 0
        End If
    End Sub

    Private Sub addToken(c As Char)
        If c = " "c Then
            token += " "
        ElseIf c = ASCII.TAB Then
            token += {" "c, " "c, " "c, " "c}
        Else
            token += c
        End If
    End Sub

    Private Sub walkChar(c As Char)
        If c = ASCII.LF Then
            walkNewline()
        ElseIf c = ASCII.CR Then
            ' do nothing
        ElseIf escapes.comment Then
            addToken(c)
        ElseIf c = """"c Then
            walkStringQuot()
        ElseIf c = "'"c Then
            If Not escapes.string Then
                escapes.comment = True
                endToken()
                token += c
            Else
                token += c
            End If
        ElseIf c = " "c OrElse c = ASCII.TAB Then
            If Not escapes.string Then
                endToken()
                code.append(c)
            Else
                addToken(c)
            End If
        ElseIf c Like delimiterSymbols Then
            If Not escapes.string Then
                If c = "("c Then
                    endToken()
                    token += "("c
                    endToken()
                Else
                    endToken()
                    code.append(c)
                End If
            Else
                token += c
            End If
        ElseIf c = "<"c OrElse c = "&"c Then
            token += c
        Else
            token += c
        End If
    End Sub

End Class

Public Class escapes
    Public [string] As Boolean = False
    Public comment As Boolean = False
    ''' <summary>
    ''' VB之中使用[]进行关键词的转义操作
    ''' </summary>
    Public keyword As Boolean = False
End Class