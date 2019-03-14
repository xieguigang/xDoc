Imports System.Runtime.CompilerServices
Imports Microsoft.VisualBasic.Serialization.JSON

Namespace jstree

    Public Class jstreeNode

        Public Property id As String
        Public Property parent As String
        Public Property text As String
        Public Property icon As String
        ''' <summary>
        ''' project/file/folder
        ''' </summary>
        ''' <returns></returns>
        Public Property type As String

        Public Overrides Function ToString() As String
            Return Me.GetJson
        End Function
    End Class

    Public Class jstreeBuild

        Public Property PathList As Dictionary(Of String, String)
        Public Property tree As Dictionary(Of String, jstreeNode)

        <MethodImpl(MethodImplOptions.AggressiveInlining)>
        Public Function GetPathListJson() As String
            Return PathList.GetJson.Replace("\", "/")
        End Function

        <MethodImpl(MethodImplOptions.AggressiveInlining)>
        Public Function GetJavaScriptCode() As String
            Return tree _
                .Values _
                .ToArray _
                .GetJson(indent:=True) _
                .Replace("\", "/")
        End Function

        Public Overrides Function ToString() As String
            Return Me.GetJson
        End Function
    End Class
End Namespace