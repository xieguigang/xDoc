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

        globalFont: CanvasHelper.CSSFont;
    }

    export function defaultStyle(): CSS {
        return <CSS>{
            string: "#a31515",
            comment: "#008000",
            keyword: "#0000ff",
            attribute: "#2b91af",
            type: "#2b91af",
            globalFont: {
                fontName: "Consolas",
                size: { pixel: 12 }
            }
        };
    }

    export function applyStyle(div: string, style: CSS = vscode.VisualStudio) {
        $ts.select(".string").attr("style", `color: ${style.string};`);
        $ts.select(".comment").attr("style", `color: ${style.comment};`);
        $ts.select(".keyword").attr("style", `color: ${style.keyword}`);
        $ts.select(".attribute").attr("style", `color: ${style.attribute}`);
        $ts.select(".type").attr("style", `color: ${style.type}`);

        CanvasHelper.CSSFont.applyCSS($ts(div), style.globalFont);
    }
}