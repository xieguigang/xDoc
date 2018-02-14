Imports System.Runtime.CompilerServices
Imports Microsoft.VisualBasic.ApplicationServices
Imports Microsoft.VisualBasic.ApplicationServices.Development
Imports Microsoft.VisualBasic.ApplicationServices.Development.VisualStudio
Imports Microsoft.VisualBasic.ComponentModel.Algorithm.base
Imports Microsoft.VisualBasic.Imaging
Imports Microsoft.VisualBasic.Language
Imports Microsoft.VisualBasic.Linq
Imports Microsoft.VisualBasic.MIME.Markup.HTML.CSS
Imports Microsoft.VisualBasic.Serialization.JSON
Imports Microsoft.VisualBasic.Text
Imports Microsoft.VisualBasic.Text.Xml
Imports DevAssmInfo = Microsoft.VisualBasic.ApplicationServices.Development.AssemblyInfo

Public Module ProjectDocument

    Public Function Build(vbproj$, EXPORT$, Optional schema As Schema = Nothing) As Boolean
        Dim folder$ = vbproj.ParentPath
        Dim css$
        Dim fontSize!
        Dim fontStyle$

        With (schema Or Schema.VisualStudioDefault)
            fontSize = .font.size
            fontStyle = .font.CSSInlineStyle
            css = .CSSStyle _
                .Replace(".vscode > ", "")
        End With

        ' index.html
        Call vbproj.Summary.SaveTo($"{EXPORT}/index.html")

        With App.GetAppSysTempFile(".zip", App.PID)
            Call My.Resources._lib.FlushStream(.ByRef)
            Call GZip.ImprovedExtractToDirectory(.ByRef, $"{EXPORT}/lib")
            Call My.Resources.Folder_16x.SaveAs($"{EXPORT}/images/Folder_16x.png")
            Call My.Resources.VB_16x.SaveAs($"{EXPORT}/images/VB_16x.png")
        End With

        ' itemgroups\compiles
        For Each file As String In vbproj.EnumerateSourceFiles
            Dim vb$ = $"{folder}/{file}".ReadAllText
            Dim html$ = vb _
                .ToVBhtml _
                .jsfilelinecontainer

            Call sprintf(
                <html>
                    <head>
                        <title>%s</title>

                        <style type="text/css">
                            %s
                        </style>
                        <style type="text/css">                           
                            .js-line-number {
                                color: #2b91af;                                
                                text-align: right;
                                padding-right: 5px;
                                border-right-style: inset;
                            }

                            .js-file-line .js-line-number {
                                font: <%= fontStyle %>;
                            }

                            .js-file-line {
                                padding-left: 10px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="vscode">
                            %s
                        </div>
                    </body>
                </html>, file, css, html) _
                .SaveTo($"{EXPORT}/{file}".ChangeSuffix("html"))
        Next

        Return True
    End Function

    ''' <summary>
    ''' javascript class define for ``js-file-line-container``
    ''' </summary>
    ''' <param name="highlights"></param>
    ''' <returns></returns>
    ''' 
    <Extension>
    Private Function jsfilelinecontainer(highlights As String) As String
        Dim lines$() = highlights.lTokens
        Dim tr$() = lines _
            .Select(Function(L, i)
                        Dim num$ = i + 1

                        Return sprintf(
                            <tr>
                                <td id=<%= "L" & num %> class="blob-num js-line-number" data-line-number=<%= num %>><%= num %></td>
                                <td id=<%= "LC" & num %> class="blob-code blob-code-inner js-file-line">%s</td>
                            </tr>, L)
                    End Function) _
            .ToArray

        Return sprintf(
            <table class="highlight tab-size js-file-line-container" data-tab-size="8">
                <tbody>%s</tbody>
            </table>, tr.JoinBy(ASCII.LF))
    End Function

    <Extension>
    Public Function Summary(vbproj As String) As String
        Dim assmInfo As DevAssmInfo = vbproj.GetAssemblyInfo
        Dim tree$ = jstree(vbproj)

        Return sprintf(
            <html>
                <head>
                    <title><%= assmInfo.AssemblyTitle %></title>

                    <link rel="stylesheet" href="lib/jstree/default/style.min.css"/>

                    <script type="text/javascript" src="lib/jquery.min.js"></script>
                    <script type="text/javascript" src="lib/jstree/jstree.min.js"></script>
                </head>
                <body>

                    <h2>Project Files</h2>

                    <div id="vbproj-tree"></div>

                    <script type="text/javascript">
                        $('#vbproj-tree').jstree({ 
                            'core' : {
                                'data' : %s
                            } 
                        });
                    </script>
                </body>
            </html>, tree)
    End Function

    Public Function jstree(vbproj As String) As String
        Dim files$() = vbproj _
            .EnumerateSourceFiles _
            .ToArray
        Dim nodes As New Dictionary(Of String, jstreeNode)

        nodes("#") = New jstreeNode With {.id = "#"}

        For Each path As String In files
            Dim tokens$() = path.Split("\"c)
            Dim append As New List(Of String)
            Dim parent$

            For i As Integer = 0 To tokens.Length - 1
                parent = append.JoinBy("\")
                append += tokens(i)
                path = append.JoinBy("\")

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
                        nodes(path).icon = "images/VB_16x.png"
                    Else
                        nodes(path).icon = "images/Folder_16x.png"
                    End If
                End If
            Next
        Next

        nodes.Remove("#")

        Return nodes _
            .Values _
            .ToArray _
            .GetJson(indent:=True) _
            .Replace("\", "/")
    End Function
End Module

Public Class jstreeNode

    Public Property id As String
    Public Property parent As String
    Public Property text As String
    Public Property icon As String

    Public Overrides Function ToString() As String
        Return Me.GetJson
    End Function
End Class