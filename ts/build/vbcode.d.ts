/// <reference path="linq.d.ts" />
declare namespace vscode {
    interface CSS {
        string: string;
        comment: string;
        keyword: string;
        attribute: string;
    }
    function defaultStyle(): CSS;
    function applyStyle(div: string, style?: CSS): void;
}
declare namespace vscode {
    class tokenStyler {
        private code;
        readonly Html: string;
        private static tagClass;
        append(token: string): void;
        appendLine(token?: string): void;
        comment(token: string): void;
        string(token: string): void;
        keyword(token: string): void;
        attribute(token: string): void;
    }
}
declare namespace vscode {
    const VisualStudio: CSS;
    /**
     * List of VB.NET language keywords
    */
    const VBKeywords: string[];
    function highlight(code: string, display: string, style?: CSS): void;
    function codeHtml(chars: Pointer<string>): string;
}
