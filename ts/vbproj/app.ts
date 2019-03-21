﻿/// <reference path="../build/linq.d.ts" />
/// <reference path="../build/vbcode.d.ts" />

/// <reference path="./Navigate.ts" />
/// <reference path="./Editor.ts" />

$ts.get("projects/Microsoft.VisualBasic.Core.json", data => {
    let assembly = data["assembly"];
    let tree = new Dictionary<any>(data["tree"]).Values.ToArray(false);
    let vbprojfiles = data["path"];
    let line = Navigate.HashParser();

    TypeScript.logging.log(tree);
    TypeScript.logging.log(assembly);

    $('#vbproj-tree').jstree({
        core: {
            data: tree
        }
    });
    $('#vbproj-tree').on("changed.jstree", function (e, data) {
        let nodeID: string = data.selected[0];
        let file: string = vbprojfiles[nodeID];

        CodeEditor.highLightVBfile(file.replace("\\", "/"));
    });

    if (!isNullOrUndefined(line)) {
        Navigate.Do(function () {
            if (line && line.line > 0) {
                CodeEditor.doLineHighlight(line.line);
            }

            $ts("#md-text").hide();
        });
    } else {
        // 首页，则显示assembly信息
        let info = $ts("#md-text");
        let projReadme: IHTMLElement = $ts("<div>");

        for (var name in assembly) {
            let row = $ts("<p>");

            row.append($ts("<span>").display(`${name}: `));
            row.append($ts("<span>").display(assembly[name]));
            info.appendChild(row)
        }

        info.appendChild(projReadme);
        CodeEditor.requestGithubFile("README.md", <any>function (markdown: string) {
            info.display((<any>window).marked(markdown));
            vscode.highlightVB(vscode.VisualStudio, ".language-vbnet");
        })
    }
});

window.onhashchange = <any>Navigate.Do;