Imports System.Runtime.CompilerServices
Imports Microsoft.VisualBasic.Language

Namespace jstree

    Public Module jstreeBuilder

        <Extension>
        Public Function jstree(files As IEnumerable(Of String),
                               Optional deli As Char = "\"c,
                               Optional folderIcon$ = "images/Folder_16x.png",
                               Optional fileIcon$ = "images/VB_16x.png") As jstreeBuild

            Dim nodes As New Dictionary(Of String, jstreeNode)
            Dim pathList As New Dictionary(Of String, String)

            nodes("#") = New jstreeNode With {
                .id = "#"
            }

            For Each path As String In files.OrderByDescending(Function(l) l.Split(deli).Length)
                Dim tokens$() = path.Split(deli)
                Dim append As New List(Of String)
                Dim parent$

                For i As Integer = 0 To tokens.Length - 1
                    parent = append.JoinBy(deli)
                    append += tokens(i)
                    path = append.JoinBy(deli)

                    If i = 0 Then
                        parent = "#"
                    End If

                    If Not nodes.ContainsKey(path) Then
                        nodes(path) = New jstreeNode With {
                            .id = "n" & nodes.Count,
                            .parent = nodes(parent).id,
                            .text = tokens(i)
                        }

                        If i = tokens.Length - 1 Then
                            nodes(path).icon = fileIcon
                        Else
                            nodes(path).icon = folderIcon
                        End If

                        pathList(nodes(path).id) = path
                    End If
                Next
            Next

            nodes.Remove("#")

            Return New jstreeBuild With {
                .PathList = pathList,
                .tree = nodes
            }
        End Function
    End Module
End Namespace