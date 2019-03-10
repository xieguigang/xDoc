namespace vscode.TOC.Tree {

    export function BuildTOC(summary: Summary): HTMLElement {
        let modules: VBType[] = summary.Declares;
        let root: IHTMLElement = $ts("<ul>");

        for (let node of modules) {
            root.append(treeNode(node));
        }

        return root;
    }

    function treeNode(type: VBType): HTMLElement {
        let title: IHTMLElement = $ts("<a>", {
            class: "type",
            href: `#L${type.line}`
        }).display(`${type.type} ${type.symbol}`);
        let root: IHTMLElement = $ts("<li>").display(title);

        return root;
    }
}