var Navigate;
(function (Navigate) {
    function HashParser(hash) {
        if (hash === void 0) { hash = window.location.hash; }
        if (Strings.Empty(hash, true)) {
            return null;
        }
        else {
            var tokens = hash.substr(1).split("#");
            var line = -1;
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
    function Do(callback) {
        if (callback === void 0) { callback = null; }
        var input = Navigate.HashParser();
        if (!isNullOrUndefined(input)) {
            CodeEditor.highLightVBfile(input.fileName, function () {
                if (input.line > 0) {
                    $ts.location.hash(false, "#/" + input.fileName + "#L" + input.line);
                    JumpToLine(input.line);
                }
                if (callback) {
                    callback();
                }
            });
        }
    }
    Navigate.Do = Do;
    function JumpToLine(line) {
        window.scrollTo(0, 16 * line);
    }
    Navigate.JumpToLine = JumpToLine;
})(Navigate || (Navigate = {}));
var CodeEditor;
(function (CodeEditor) {
    var github = new vscode.github.raw("@github.user", "@github.repo", "@github.commits");
    var previousHighlight = null;
    function highLightVBfile(file, callback) {
        if (callback === void 0) { callback = null; }
        var handleTOC = function (summary) {
            var toc = summary.jsTree();
            var hash = toc.hashSet;
            var click = function (e, data) {
                var line = hash[data.selected[0]];
                var jump = "#/" + file + line;
                var n = parseInt(/\d+/.exec(line)[0]);
                $ts.location.hash(false, jump);
                Navigate.JumpToLine(n);
            };
            $ts.location.hash(false, "#/" + file);
            $('#toc-tree').jstree("destroy").empty();
            $('#toc-tree').jstree(toc);
            $('#toc-tree').on("changed.jstree", click);
            if (!isNullOrUndefined(callback)) {
                callback();
            }
        };
        var handleHash = function (L) {
            $ts.location.hash(false, "#/" + file + "#L" + L);
            Navigate.JumpToLine(L);
            doLineHighlight(L);
        };
        github.highlightCode(file, "#vbcode", vscode.VisualStudio, handleTOC, handleHash);
        $ts("#md-text").hide();
        $ts("#ca-viewsource").href = github.RawfileURL(file);
        $ts("#ca-history").href = github.commitHistory(file);
        $ts("#ca-blame").href = github.blame(file);
    }
    CodeEditor.highLightVBfile = highLightVBfile;
    function doLineHighlight(L) {
        var line = $ts("#L" + L).parentElement.parentElement;
        line.style.backgroundColor = "#FFD801";
        if (previousHighlight) {
            previousHighlight.style.backgroundColor = null;
        }
        previousHighlight = line;
    }
    CodeEditor.doLineHighlight = doLineHighlight;
    function requestGithubFile(fileName, callback) {
        $ts.getText(github.RawfileURL(fileName), callback);
    }
    CodeEditor.requestGithubFile = requestGithubFile;
})(CodeEditor || (CodeEditor = {}));
/// <reference path="../build/linq.d.ts" />
/// <reference path="../build/vbcode.d.ts" />
/// <reference path="./Navigate.ts" />
/// <reference path="./Editor.ts" />
$ts.get("projects/Microsoft.VisualBasic.Core.json", function (data) {
    var assembly = data["assembly"];
    var tree = new Dictionary(data["tree"]).Values.ToArray(false);
    var vbprojfiles = data["path"];
    var line = Navigate.HashParser();
    TypeScript.logging.log(tree);
    TypeScript.logging.log(assembly);
    $('#vbproj-tree').jstree({
        core: {
            data: tree
        }
    });
    $('#vbproj-tree').on("changed.jstree", function (e, data) {
        var nodeID = data.selected[0];
        var file = vbprojfiles[nodeID];
        CodeEditor.highLightVBfile(file.replace("\\", "/"));
    });
    if (!isNullOrUndefined(line)) {
        Navigate.Do(function () {
            if (line && line.line > 0) {
                CodeEditor.doLineHighlight(line.line);
            }
            $ts("#md-text").hide();
        });
    }
    else {
        // 首页，则显示assembly信息
        var info_1 = $ts("#md-text");
        var projReadme = $ts("<div>");
        for (var name in assembly) {
            var row = $ts("<p>");
            row.append($ts("<span>").display(name + ": "));
            row.append($ts("<span>").display(assembly[name]));
            info_1.appendChild(row);
        }
        info_1.appendChild(projReadme);
        CodeEditor.requestGithubFile("README.md", function (markdown) {
            info_1.display(window.marked(markdown));
        });
    }
});
window.onhashchange = Navigate.Do;
//# sourceMappingURL=vbproj.js.map