module CodeEditor {

    let github = new vscode.github.raw("@github.user", "@github.repo", "@github.commits");
    let previousHighlight: HTMLElement = null;

    export function highLightVBfile(file: string, callback: Delegate.Sub = null) {
        let handleTOC = function (summary: vscode.TOC.Summary): void {
            var toc = <any>summary.jsTree();
            var hash = toc.hashSet;
            var click = function (e, data) {
                let line: string = hash[data.selected[0]];
                let jump = `#/${file}${line}`
                let n: number = parseInt(/\d+/.exec(line)[0]);

                $ts.location.hash(false, jump);
                Navigate.JumpToLine(n);
            }

            $ts.location.hash(false, `#/${file}`);

            $('#toc-tree').jstree("destroy").empty();
            $('#toc-tree').jstree(toc);
            $('#toc-tree').on("changed.jstree", click);

            if (!isNullOrUndefined(callback)) {
                callback();
            }
        }
        let handleHash: Delegate.Sub = <any>function (L: number): void {
            $ts.location.hash(false, `#/${file}#L${L}`);
            Navigate.JumpToLine(L);
            doLineHighlight(L);
        }

        github.highlightCode(file, "#vbcode", vscode.VisualStudio, handleTOC, handleHash);

        $ts("#md-text").hide();

        (<HTMLAnchorElement><any>$ts("#ca-viewsource")).href = github.RawfileURL(file);
        (<HTMLAnchorElement><any>$ts("#ca-history")).href = github.commitHistory(file);
        (<HTMLAnchorElement><any>$ts("#ca-blame")).href = github.blame(file);
    }

    export function doLineHighlight(L: number) {
        let line: HTMLElement = $ts(`#L${L}`).parentElement.parentElement;

        line.style.backgroundColor = "#FFD801";

        if (previousHighlight) {
            previousHighlight.style.backgroundColor = null;
        }

        previousHighlight = line;
    }

    export function requestGithubFile(fileName: string, callback: Delegate.Sub) {
        $ts.getText(github.RawfileURL(fileName), callback);
    }

    export function githubImageURL(href: string): string {
        if (href.toLowerCase().indexOf("http://") > -1 || href.toLowerCase().indexOf("https://") > -1) {
            return href;
        } else {
            github.RawfileURL(href);
        }
    }
}