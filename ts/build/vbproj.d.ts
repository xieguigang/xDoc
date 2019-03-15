/// <reference path="linq.d.ts" />
/// <reference path="vbcode.d.ts" />
declare module Navigate {
    function HashParser(hash?: string): Reference;
    interface Reference {
        fileName: string;
        line: number;
    }
    function Do(): void;
    function JumpToLine(line: number): void;
}
declare let github: vscode.github.raw;
declare let previousHighlight: HTMLElement;
declare function highLightVBfile(file: string, callback?: Delegate.Sub): void;
