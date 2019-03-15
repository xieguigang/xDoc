﻿/// <reference path="../build/linq.d.ts" />
/// <reference path="../build/vbcode.d.ts" />

$ts.get("projects/Microsoft.VisualBasic.Core.json", data => {
    let assembly = data["assembly"];
    let tree = new Dictionary<any>(data["tree"]).Values.ToArray(false);
    let vbprojfiles = data["path"];
    let line = Navigate.HashParser().line;

    console.log(tree);

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

    Navigate.Do(function () {
        if (line > 0) {
            CodeEditor.doLineHighlight(line);
        }
    });
});

window.onhashchange = <any>Navigate.Do;



