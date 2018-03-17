Imports Microsoft.VisualBasic.Serialization.JSON

Namespace jstree

    Public Class jstreeNode

        Public Property id As String
        Public Property parent As String
        Public Property text As String
        Public Property icon As String

        Public Overrides Function ToString() As String
            Return Me.GetJson
        End Function
    End Class
End Namespace