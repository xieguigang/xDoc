/// <reference path="../../ts/build/linq.d.ts" />
/// <reference path="../../ts/build/vbcode.d.ts" />
declare module Navigate {
    function HashParser(hash?: string): Reference;
    interface Reference {
        fileName: string;
        line: number;
    }
    function Do(callback?: Delegate.Sub): void;
    function JumpToLine(line: number): void;
}
declare module CodeEditor {
    function highLightVBfile(file: string, callback?: Delegate.Sub): void;
    function doLineHighlight(L: number): void;
    function requestGithubFile(fileName: string, callback: Delegate.Sub): void;
}