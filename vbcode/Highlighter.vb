Imports Microsoft.VisualBasic.ComponentModel.Collection
Imports Microsoft.VisualBasic.Emit.Marshal
Imports Microsoft.VisualBasic.Scripting.SymbolBuilder.VBLanguage

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

    Public Function HighlightHtml(code As String) As String
        Dim rows = New VBParser(New Pointer(Of Char)(code)).getTokens.ToString

        Return $"<table class=""pre"">
<tbody>
{rows}
</tbody>
</table>"
    End Function

End Module
