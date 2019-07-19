Imports System.Runtime.CompilerServices
Imports Microsoft.VisualBasic.ComponentModel.Collection
Imports Microsoft.VisualBasic.Emit.Marshal
Imports Microsoft.VisualBasic.Scripting.SymbolBuilder.VBLanguage
Imports Microsoft.VisualBasic.Text

Public Module Highlighter

    ''' <summary>
    ''' All of the VB keywords that following type names
    ''' </summary>
    Public ReadOnly typeDefine As Index(Of String) = {
        "As", "Class", "Structure", "Module", "Imports", "Of", "New", "GetType", "Implements", "Inherits"
    }

    ''' <summary>
    ''' 在VB.NET之中，单词与单词之间的分隔符列表
    ''' </summary>
    Public ReadOnly delimiterSymbols As Index(Of String) = {".", ",", "=", "(", ")", "{", "}"}

    ''' <summary>
    ''' List of VB.NET language keywords
    ''' </summary>
    Public ReadOnly VBKeywords As Index(Of String) = KeywordProcessor.TokenWords

    <Extension>
    Public Function HighlightHtml(code As String) As String
        Dim trimCr = code.LineTokens.JoinBy(ASCII.LF)
        Dim rows = New VBParser(New Pointer(Of Char)(trimCr)).getTokens.ToString

        Return $"<table class=""pre"">
<tbody>
{rows}
</tbody>
</table>"
    End Function

End Module
