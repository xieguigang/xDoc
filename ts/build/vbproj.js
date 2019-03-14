/// <reference path="../build/linq.d.ts" />
/// <reference path="../build/vbcode.d.ts" />
var github = new vscode.github.raw("@github.user", "@github.repo", "@github.commits");
function highLightVBfile(file) {
    github.highlightCode(file, "#vbcode", vscode.VisualStudio, function (summary) {
        var toc = summary.jsTree();
        var hash = toc.hashSet;
        var click = function (e, data) {
            console.log(hash[data.selected[0]]);
        };
        console.log(hash);
        $('#toc-tree').jstree(toc);
        $('#toc-tree').on("changed.jstree", click);
    });
}
$ts.get("projects/Microsoft.VisualBasic.Core.json", function (data) {
    var assembly = data["assembly"];
    var tree = data["tree"];
    var vbprojfiles = data["pathList"];
    $('#vbproj-tree').jstree({
        core: {
            data: tree
        }
    });
    $('#vbproj-tree').on("changed.jstree", function (e, data) {
        var nodeID = data.selected[0];
        var file = vbprojfiles[nodeID];
        console.log(file);
        highLightVBfile(file.replace("\\", "/"));
    });
});
//# sourceMappingURL=vbproj.js.map