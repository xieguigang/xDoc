﻿/// <reference path="../build/linq.d.ts" />
/// <reference path="../build/vbcode.d.ts" />

let github = new vscode.github.raw("@github.user", "@github.repo", "@github.commits");

function highLightVBfile(file: string) {
    github.highlightCode(file, "#vbcode", vscode.VisualStudio, function (summary) {
        var toc = <any>summary.jsTree();
        var hash = toc.hashSet;
        var click = function (e, data) {
            let line = hash[data.selected[0]];
            let n: number = parseInt(/\d+/.exec(line)[0]) - 8;
            let jump = `#L${n <= 0 ? 1 : n}`;

            window.location.hash = jump;
        }

        window.location.hash = `#/${file}`;

        $('#toc-tree').jstree("destroy").empty();
        $('#toc-tree').jstree(toc);
        $('#toc-tree').on("changed.jstree", click);

        (<HTMLAnchorElement><any>$ts("#ca-viewsource")).href = github.RawfileURL(file);
        (<HTMLAnchorElement><any>$ts("#ca-history")).href = github.commitHistory(file);
        (<HTMLAnchorElement><any>$ts("#ca-blame")).href = github.blame(file);
    });
}

$ts.get("projects/Microsoft.VisualBasic.Core.json", data => {
    let assembly = data["assembly"];
    let tree = new Dictionary<any>(data["tree"]).Values.ToArray(false);
    let vbprojfiles = data["path"];

    console.log(tree);

    $('#vbproj-tree').jstree({
        core: {
            data: tree
        }
    });
    $('#vbproj-tree').on("changed.jstree", function (e, data) {
        let nodeID: string = data.selected[0];
        let file: string = vbprojfiles[nodeID];

        highLightVBfile(file.replace("\\", "/"));
    });
});

let input = Navigate.HashParser();

if (!isNullOrUndefined(input)) {
    highLightVBfile(input.fileName);
}


