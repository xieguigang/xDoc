/// <reference path="../build/linq.d.ts" />
var vscode;
(function (vscode) {
    function highlight(code, display) {
        $ts(display).display(codeHtml(code));
    }
    vscode.highlight = highlight;
    function codeHtml(code) {
        return code;
    }
    vscode.codeHtml = codeHtml;
})(vscode || (vscode = {}));
//# sourceMappingURL=vbcode.js.map