/// <reference path="../../ts/build/linq.d.ts" />
declare class CodeStyler {
    private code;
    private rowList;
    comment(text: string): void;
    string(str: string): void;
    appendLine(): void;
}
declare module "Highlights/Syntax" {
    export class Syntax {
        private chars;
        private code;
        private escapes;
        private tokenBuffer;
        constructor(chars: Pointer<string>);
        getTokens(): CodeStyler;
        /**
         * ??????????
        */
        private walkNewLine;
        private endToken;
        private walkChar;
    }
}
