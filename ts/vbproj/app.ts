/// <reference path="../build/linq.d.ts" />
/// <reference path="../build/vbcode.d.ts" />

/// <reference path="./Navigate.ts" />
/// <reference path="./Editor.ts" />

/// <reference path="../build/marked.d.ts" />

$ts.mode = Modes.debug;
$ts("#file-suggest-list").hide();
$ts.get("projects/Microsoft.VisualBasic.Core.json", data => {
    let assembly = data["assembly"];
    let tree = new Dictionary<CodeEditor.Navigate.IJsTreeTerm>(data["tree"])
        .Values
        .ToArray(false);
    let vbprojfiles = data["path"];
    let line = CodeEditor.Navigate.HashParser();
    let indexTerms = $ts(tree)
        .Where(t => t.type != "folder")
        .Select(t => new CodeEditor.Search.term(t.id, t.text))
        .ToArray(false);
    let showFileById = function (nodeID: string) {
        CodeEditor.highLightVBfile(vbprojfiles[nodeID].replace("\\", "/"));
    }
    let suggests = CodeEditor.Search.makeSuggestions(
        indexTerms, "#file-suggest-list",
        term => showFileById(<string>term.id),
        10, true
    );

    TypeScript.logging.log(tree);
    TypeScript.logging.log(assembly);

    $('#vbproj-tree').jstree({
        core: {
            data: tree
        }
    });
    $('#vbproj-tree').on("changed.jstree", function (e, data) {
        showFileById(data.selected[0]);
    });

    let searchInputHandler = function () {
        let search: string = $ts("#searchInput").CType<HTMLInputElement>().value;

        if (TypeScript.logging.outputEverything) {
            console.log(search);
        }

        if (search) {
            $ts("#vbproj-tree").hide();
            $ts("#file-suggest-list").show();

            suggests(search);
        } else {
            $ts("#vbproj-tree").show();
            $ts("#file-suggest-list").hide();
        }
    }

    $ts("#searchInput").onkeypress = searchInputHandler;
    $ts("#searchInput").onchange = searchInputHandler;

    if (!isNullOrUndefined(line)) {
        CodeEditor.Navigate.Do(function () {
            if (line && line.line > 0) {
                CodeEditor.doLineHighlight(line.line);
            }

            $ts("#md-text").hide();
        });
    } else {
        // 首页，则显示assembly信息
        let info = $ts("#md-text");
        let opt: markedjs.option = markedjs.option.Defaults;

        opt.renderer = new CodeEditor.MDRender();
        opt.debug = false;

        CodeEditor.requestGithubFile("README.md", <any>function (markdown: string) {
            info.display(marked(markdown, opt, null));
            vscode.highlightVB(vscode.VisualStudio, ".language-vbnet");
        })
    }
});

window.onhashchange = <any>CodeEditor.Navigate.Do;