export class Syntax {

    private code: CodeStyler = new CodeStyler();
    private escapes = {
        string: false,
        comment: false,
        keyword: false,
        quot: "'"
    }
    private tokenBuffer: string[] = [];

    public constructor(private chars: Pointer<string>) {
    }

    public getTokens(): CodeStyler {
        while (!this.chars.EndRead) {
            this.walkChar(this.chars.Next);
        }



        return this.code;
    }

    private walkChar(c: string) {

    }
}