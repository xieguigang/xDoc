namespace vscode {

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
            },
            lineHeight: "11px"
        };
    }
}