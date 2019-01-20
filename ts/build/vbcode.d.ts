/// <reference path="linq.d.ts" />
declare namespace vscode {
    interface CSS {
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
    function defaultStyle(): CSS;
    function applyStyle(div: string, style?: CSS): void;
}
declare namespace vscode {
    class tokenStyler {
        private code;
        private lastKeyword;
        readonly Html: string;
        /**
         * 上一个追加的单词是一个关键词
        */
        readonly LastKeyword: boolean;
        private static tagClass;
        append(token: string): void;
        appendLine(token?: string): void;
        type(token: string): void;
        comment(token: string): void;
        string(token: string): void;
        keyword(token: string): void;
        attribute(token: string): void;
    }
}
declare namespace vscode {
    const VisualStudio: CSS;
    const TypeDefine: string[];
    /**
     * List of VB.NET language keywords
    */
    const VBKeywords: string[];
    function highlight(code: string, display: string, style?: CSS): void;
    function codeHtml(chars: Pointer<string>): string;
}
