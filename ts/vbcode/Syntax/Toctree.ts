namespace vscode.TOC.Tree {

    export function BuildTOC(summary: Summary): HTMLElement {
        let modules: VBType[] = summary.Declares;
        let root: IHTMLElement = $ts("<ul>");

        for (let node of modules) {
            root.append(treeNode(node));
        }

        return root;
    }

    function codeMapAnchor(symbol: CodeMap): HTMLElement {
        let title: HTMLElement = $ts("<a>", {
            class: "",
            href: `#L${symbol.line}`
        }).display(symbol.symbol);
        let item: HTMLElement = $ts("<li>").display(title);

        return item;
    }

    function treeNode(type: VBType): HTMLElement {
        let title: IHTMLElement = $ts("<a>", {
            class: "type",
            href: `#L${type.line}`
        }).display(`${type.type} ${type.symbol}`);
        let root: IHTMLElement = $ts("<li>").display(title);

        if (!IsNullOrEmpty(type.innerType)) {
            root.append($ts("<p>").display("Internal Types:"));

            let inner: IHTMLElement = $ts("<ul>");

            for (let node of type.innerType) {
                inner.append(treeNode(node));
            }

            root.append(inner);
        }

        // append members
        codeMapGroup(root, type.fields, "Fields:");
        codeMapGroup(root, type.properties, "Properties:");
        codeMapGroup(root, type.functions, "Functions:");
        codeMapGroup(root, type.subs, "Sub Programs:");
        codeMapGroup(root, type.operators, "Operators:");

        return root;
    }

    function codeMapGroup(root: HTMLElement, symbols: CodeMap[], title: string) {
        if (!IsNullOrEmpty(symbols)) {
            root.append($ts("<p>").display(title));

            let inner: IHTMLElement = $ts("<ul>");

            for (let node of symbols) {
                inner.append(codeMapAnchor(node));
            }

            root.append(inner);
        }
    }
}