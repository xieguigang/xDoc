Imports Microsoft.VisualBasic.ComponentModel.Collection
Imports Microsoft.VisualBasic.Emit.Marshal
Imports Microsoft.VisualBasic.Scripting.SymbolBuilder.VBLanguage

Public Class Class1

    ''' <summary>
    ''' All of the VB keywords that following type names
    ''' </summary>
    Public ReadOnly TypeDefine As String() = {
        "As", "Class", "Structure", "Module", "Imports", "Of", "New", "GetType", "Implements", "Inherits"
    }

    ''' <summary>
    ''' 在VB.NET之中，单词与单词之间的分隔符列表
    ''' </summary>
    Public ReadOnly delimiterSymbols As Index(Of String) = {
        ".",
        ",",
        "=",
        "(",
        ")",
        "{",
        "}"
    }

    ''' <summary>
    ''' List of VB.NET language keywords
    ''' </summary>
    Public ReadOnly VBKeywords As String() = KeywordProcessor.TokenWords

    Public Function HighlightHtml(code As String) As String
        Dim pcode As New Pointer(Of Char)(code)

    End Function

End Class
