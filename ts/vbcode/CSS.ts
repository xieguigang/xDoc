namespace vscode {

    export interface CSS {
        string: string;
        comment: string;
        keyword: string;
    }

    export function defaultStyle(): CSS {
        return <CSS>{
            string: "red",
            comment: "green",
            keyword: "blue"
        };
    }

    export function applyStyle(div: string, style: CSS = defaultStyle()) {
        $ts.select(".string").attr("style", `color: ${style.string};`);
        $ts.select(".comment").attr("style", `color: ${style.comment};`);
        $ts.select(".keyword").attr("style", `color: ${style.keyword}`);
    }
}