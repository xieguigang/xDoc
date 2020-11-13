namespace vscode {



    export function applyStyle(div: string | IHTMLElement, style: CSS = vscode.VisualStudio): void {
        var preview: HTMLElement = typeof div == "string" ? $ts(div) : div;

        $ts.select(".string").attr("style", `color: ${style.string};`);
        $ts.select(".comment").attr("style", `color: ${style.comment};`);
        $ts.select(".keyword").attr("style", `color: ${style.keyword}`);
        $ts.select(".attribute").attr("style", `color: ${style.attribute}`);
        $ts.select(".type").attr("style", `color: ${style.type}`);
        $ts.select(".directive").attr("style", `color: ${style.directive}`);
        $ts.select(".line-hash").attr("style", `color: #3c3e3e; text-decoration: none;`);

        CanvasHelper.CSSFont.applyCSS(preview, style.globalFont);

        // set additional styles.
        preview.style.lineHeight = style.lineHeight;
    }
}