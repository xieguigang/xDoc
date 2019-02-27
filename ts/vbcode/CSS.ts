namespace vscode {

    export interface CSS {
        string: string;
        comment: string;
        keyword: string;
        attribute: string;
        /**
         * 用户类型的颜色样式值
        */
        type: string;
        directive: string;

        globalFont: CanvasHelper.CSSFont;
    }

    export function defaultStyle(): CSS {
        return <CSS>{
            string: "#a31515",
            comment: "#008000",
            keyword: "#0000ff",
            attribute: "#2b91af",
            type: "#2b91af",
            directive: "grey",
            globalFont: {
                fontName: "Consolas",
                size: { pixel: 11 }
            }
        };
    }

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
        preview.style.lineHeight = "1.125em;";
    }
}