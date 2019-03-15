var Navigate;
(function (Navigate) {
    function HashParser(hash) {
        if (hash === void 0) { hash = window.location.hash; }
        if (Strings.Empty(hash, true)) {
            return null;
        }
        else {
            var tokens = hash.substr(1).split("#");
            var line = 1;
            var path = tokens[0];
            if (tokens.length > 1) {
                line = parseInt(/\d+/.exec(tokens[1])[0]);
            }
            if (path.charAt(0) == "/") {
                path = path.substr(1);
            }
            return { fileName: path, line: line };
        }
    }
    Navigate.HashParser = HashParser;
    function Do() {
        var input = Navigate.HashParser();
        if (!isNullOrUndefined(input)) {
            highLightVBfile(input.fileName);
        }
    }
    Navigate.Do = Do;
})(Navigate || (Navigate = {}));
/// <reference path="../build/linq.d.ts" />
/// <reference path="../build/vbcode.d.ts" />
var github = new vscode.github.raw("@github.user", "@github.repo", "@github.commits");
function highLightVBfile(file) {
    github.highlightCode(file, "#vbcode", vscode.VisualStudio, function (summary) {
        var toc = summary.jsTree();
        var hash = toc.hashSet;
        var click = function (e, data) {
            var line = hash[data.selected[0]];
            var n = parseInt(/\d+/.exec(line)[0]) - 8;
            var jump = "#L" + (n <= 0 ? 1 : n);
            window.location.hash = jump;
        };
        window.location.hash = "#/" + file;
        $('#toc-tree').jstree("destroy").empty();
        $('#toc-tree').jstree(toc);
        $('#toc-tree').on("changed.jstree", click);
        $ts("#ca-viewsource").href = github.RawfileURL(file);
        $ts("#ca-history").href = github.commitHistory(file);
        $ts("#ca-blame").href = github.blame(file);
    });
}
$ts.get("projects/Microsoft.VisualBasic.Core.json", function (data) {
    var assembly = data["assembly"];
    var tree = new Dictionary(data["tree"]).Values.ToArray(false);
    var vbprojfiles = data["path"];
    console.log(tree);
    $('#vbproj-tree').jstree({
        core: {
            data: tree
        }
    });
    $('#vbproj-tree').on("changed.jstree", function (e, data) {
        var nodeID = data.selected[0];
        var file = vbprojfiles[nodeID];
        highLightVBfile(file.replace("\\", "/"));
    });
    Navigate.Do();
});
window.onhashchange = Navigate.Do;
//# sourceMappingURL=vbproj.js.map