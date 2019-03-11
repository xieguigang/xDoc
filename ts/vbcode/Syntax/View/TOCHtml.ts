namespace vscode.TOC.View {

    export function BuildTOC(summary: Summary): HTMLElement {
        let modules: VBType[] = summary.Declares;
        let root: IHTMLElement = $ts("<ul>");

        for (let node of modules) {
            root.append(treeNode(node, false));
        }

        return root;
    }

    function codeMapAnchor(symbol: CodeMap, className: string): HTMLElement {
        let title: HTMLElement = $ts("<a>", {
            class: className,
            href: `#L${symbol.line}`
        }).display(symbol.symbol);
        let item: HTMLElement = $ts("<li>").display(title);

        return item;
    }

    function displayTitle(type: VBType, isInner: boolean): HTMLElement {
        let title: HTMLElement;

        if (isInner) {
            title = $ts("<div>").display(`${type.type} ${type.symbol}`);
        } else {
            title = $ts("<strong>").display(`${type.type} ${type.symbol}`);
        }

        return $ts("<a>", {
            class: "type",
            href: `#L${type.line}`
        }).display(title);
    }

    function treeNode(type: VBType, isInner: boolean = true): HTMLElement {
        let title: HTMLElement = displayTitle(type, isInner);
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
        codeMapGroup(root, type.fields, "Fields:", "field");
        codeMapGroup(root, type.properties, "Properties:", "property");
        codeMapGroup(root, type.functions, "Functions:", "function");
        codeMapGroup(root, type.subs, "Sub Programs:", "sub");
        codeMapGroup(root, type.operators, "Operators:", "operator");

        return root;
    }

    function codeMapGroup(root: HTMLElement, symbols: CodeMap[], title: string, className: string) {
        if (!IsNullOrEmpty(symbols)) {
            root.append($ts("<p>").display(title));

            let inner: IHTMLElement = $ts("<ul>");

            for (let node of symbols) {
                inner.append(codeMapAnchor(node, className));
            }

            root.append(inner);
        }
    }
}