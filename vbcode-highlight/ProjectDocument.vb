﻿Imports System.Runtime.CompilerServices
Imports Dev.xDoc.VBCode.jstree
Imports Microsoft.VisualBasic.ApplicationServices
Imports Microsoft.VisualBasic.ApplicationServices.Development.VisualStudio
Imports Microsoft.VisualBasic.Imaging
Imports Microsoft.VisualBasic.Language
Imports Microsoft.VisualBasic.Linq
Imports Microsoft.VisualBasic.MIME.Markup.HTML.CSS
Imports Microsoft.VisualBasic.Scripting.SymbolBuilder
Imports Microsoft.VisualBasic.Text
Imports Microsoft.VisualBasic.Text.Xml
Imports DevAssmInfo = Microsoft.VisualBasic.ApplicationServices.Development.AssemblyInfo

Public Module ProjectDocument

    ''' <summary>
    ''' 生成源代码高亮文档
    ''' </summary>
    ''' <param name="vbproj$"></param>
    ''' <param name="EXPORT$"></param>
    ''' <param name="schema"></param>
    ''' <returns></returns>
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

        With App.GetAppSysTempFile(".zip", App.PID)
            Call My.Resources.splitter.FlushStream(.ByRef)
            Call GZip.ImprovedExtractToDirectory(.ByRef, EXPORT)
        End With

        ' index.html
        Call vbproj _
            .Summary(template:=$"{EXPORT}/index.html".ReadAllText) _
            .SaveTo($"{EXPORT}/index.html")

        With App.GetAppSysTempFile(".zip", App.PID)
            Call My.Resources.Folder_16x.SaveAs($"{EXPORT}/images/Folder_16x.png")
            Call My.Resources.VB_16x.SaveAs($"{EXPORT}/images/VB_16x.png")
            Call My.Resources.url.SaveTo($"{EXPORT}/lib/url.js")
            Call My.Resources._lib.FlushStream(.ByRef)

            Call GZip.ImprovedExtractToDirectory(.ByRef, $"{EXPORT}/lib")
        End With

        ' itemgroups\compiles
        For Each file As String In vbproj.EnumerateSourceFiles
            Dim vb$ = $"{folder}/{file}".ReadAllText
            Dim html$ = vb _
                .ToVBhtml _
                .jsfilelinecontainer
            Dim urlPath$ = "./" & file.BaseName & ".html"

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
                                /* border-right-style: inset; 
                                */
                            }

                            .js-file-line .js-line-number {
                                font: <%= fontStyle %>;
                            }

                            .js-file-line {
                                padding-left: 10px;
                            }

                            a:link { text-decoration: none;color: #2b91af}
　　                         a:active { text-decoration:blink}
　　                         a:hover { text-decoration:underline;color: #2b91af} 
　　                         a:visited { text-decoration: none;color: #2b91af}
                        </style>
                    </head>
                    <body>
                        <div class="vscode">
                            %s
                        </div>
                    </body>
                    <script type="text/javascript">
                        var url_path = "%s";
                                              
	                    var lines = document.getElementsByClassName("js-line-number");
	
	                    for (var i = 0; i %s lines.length; i++) {
		                    var line = lines[i];
		                    var a = document.createElement("a");
		                    var num = line.getAttribute("data-line-number");
		                    var id = line.id;
		
		                    a.setAttribute("href", url_path + "#" + id);
		                    a.setAttribute("target", "_self");
                            a.innerText = num;

		                    line.innerHTML = "";
		                    line.appendChild(a);
	                    }
                        </script>
                </html>, file, css, html, urlPath, "<") _
                .SaveTo($"{EXPORT}/{file}".ChangeSuffix("html"))

            Call file.__DEBUG_ECHO
        Next

        Call VBDebugger.WaitOutput()

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
        Dim lines$() = highlights.LineTokens
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
    Public Function Summary(vbproj$, template$) As String
        Dim assmInfo As DevAssmInfo = vbproj.GetAssemblyInfo
        Dim tree$, path$

        With vbproj _
            .EnumerateSourceFiles _
            .jstree

            path = .GetPathListJson
            tree = .GetJavaScriptCode
        End With

        With New ScriptBuilder(template)
            !title = assmInfo.AssemblyTitle
            !node_path = path
            !tree = sprintf(<div>
                                <h2>%sProject Files</h2>

                                <div id="vbproj-tree">
                                </div>

                                <script type="text/javascript">
                                    $('#vbproj-tree').jstree({ 
                                        'core' : {
                                            'data' : %s
                                        } 
                                    });

                                    $('#vbproj-tree').on("changed.jstree", function (e, data) {
                                        var id  = data.selected[0];
                                        var url = getUrl(id);

                                        console.log(url);
                                        
                                        var iframe = document.getElementById("source-frame");
                                        iframe.setAttribute("src", url);
                                    });
                                </script>
                            </div>, "&nbsp;", tree)

            Return .ToString
        End With
    End Function
End Module