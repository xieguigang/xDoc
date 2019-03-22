var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    function githubImageURL(href) {
        var url = href.toLowerCase();
        var isFullName = href.toLowerCase().indexOf("http://") > -1 || href.toLowerCase().indexOf("https://") > -1;
        console.log(url + " is full path? " + isFullName);
        if (isFullName) {
            return href;
        }
        else {
            return github.RawfileURL(href);
        }
    }
    CodeEditor.githubImageURL = githubImageURL;
})(CodeEditor || (CodeEditor = {}));
/// <reference path="../build/linq.d.ts" />
/// <reference path="../build/vbcode.d.ts" />
/// <reference path="./Navigate.ts" />
/// <reference path="./Editor.ts" />
/// <reference path="../build/marked.d.ts" />
htmlRenderer.hrefSolver = CodeEditor.githubImageURL;
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
        var opt_1 = option.Defaults;
        opt_1.renderer = new CodeEditor.MDRender();
        CodeEditor.requestGithubFile("README.md", function (markdown) {
            info_1.display(marked(markdown, opt_1, null));
            vscode.highlightVB(vscode.VisualStudio, ".language-vbnet");
        });
    }
});
window.onhashchange = Navigate.Do;
var CodeEditor;
(function (CodeEditor) {
    var MDRender = /** @class */ (function (_super) {
        __extends(MDRender, _super);
        function MDRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MDRender.prototype.image = function (href, title, text) {
            href = helpers.cleanUrl(this.options.sanitize, this.options.baseUrl, href);
            if (href === null) {
                return text;
            }
            else if (htmlRenderer.hrefSolver && htmlRenderer.hrefSolver != undefined) {
                href = htmlRenderer.hrefSolver(href);
            }
            var out = '<img style="max-width: 65%;" src="' + href + '" alt="' + text + '"';
            if (title) {
                out += ' title="' + title + '"';
            }
            out += this.options.xhtml ? '/>' : '>';
            return out;
        };
        return MDRender;
    }(htmlRenderer));
    CodeEditor.MDRender = MDRender;
})(CodeEditor || (CodeEditor = {}));
//# sourceMappingURL=vbproj.js.map