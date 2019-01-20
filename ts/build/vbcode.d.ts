/// <reference path="linq.d.ts" />
declare namespace vscode {
    /**
     * List of VB.NET language keywords
    */
    const VBKeywords: string[];
    function highlight(code: string, display: string): void;
    function codeHtml(code: string): string;
}
