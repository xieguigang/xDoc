/// <reference path="linq.d.ts" />
declare namespace vscode {
    /**
     * List of VB.NET language keywords
    */
    const VBKeywords: string[];
    function highlight(code: string, display: string): void;
    function codeHtml(chars: Pointer<string>): string;
}
declare namespace vscode {
    class tokenStyler {
        comment(token: string): string;
        string(token: string): string;
        keyword(token: string): string;
    }
}
