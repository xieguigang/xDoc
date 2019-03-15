/// <reference path="linq.d.ts" />
/// <reference path="vbcode.d.ts" />
declare module Navigate {
    function HashParser(hash?: string): Reference;
    interface Reference {
        fileName: string;
        line: number;
    }
}
declare let github: vscode.github.raw;
declare function highLightVBfile(file: string): void;
declare let input: Navigate.Reference;
