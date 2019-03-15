/// <reference path="linq.d.ts" />
/// <reference path="vbcode.d.ts" />
declare module CodeEditor {
    function highLightVBfile(file: string, callback?: Delegate.Sub): void;
    function doLineHighlight(L: number): void;
}
declare module Navigate {
    function HashParser(hash?: string): Reference;
    interface Reference {
        fileName: string;
        line: number;
    }
    function Do(): void;
    function JumpToLine(line: number): void;
}
