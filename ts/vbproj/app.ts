/// <reference path="../build/linq.d.ts" />
/// <reference path="../build/vbcode.d.ts" />

let github = new vscode.github.raw("@github.user", "@github.repo", "@github.commits");

function highLightVBfile(file: string) {
    github.highlightCode(file, "#vbcode", vscode.VisualStudio, function (summary) {
        var toc = <any>summary.jsTree();
        var hash = toc.hashSet;
        var click = function (e, data) {
            console.log(hash[data.selected[0]]);
        }

        console.log(hash);

        $('#toc-tree').jstree(toc);
        $('#toc-tree').on("changed.jstree", click);
    });
}

$ts.get("projects/Microsoft.VisualBasic.Core.json", data => {
    let assembly = data["assembly"];
    let tree = new Dictionary<any>(data["tree"]).Values.ToArray(false);
    let vbprojfiles = data["path"];

    $('#vbproj-tree').jstree({
        core: {
            data: tree
        }
    });
    $('#vbproj-tree').on("changed.jstree", function (e, data) {
        let nodeID: string = data.selected[0];
        let file: string = vbprojfiles[nodeID];

        console.log(file);
        highLightVBfile(file.replace("\\", "/"));
    });
});

