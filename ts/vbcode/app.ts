/// <reference path="../build/linq.d.ts" />

namespace vscode {

    export function highlight(code: string, display: string) {
        $ts(display).display(codeHtml(code));
    }

    export function codeHtml(code: string): string {
        return code;
    }
}

