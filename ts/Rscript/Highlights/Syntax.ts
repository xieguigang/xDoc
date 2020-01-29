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

    /** 
     * ??????????
    */
    private walkNewLine() {
        // ??????
        if (this.escapes.comment) {
            // vb???????????????????                    
            this.code.comment(this.tokenBuffer.join("").replace("<", "&lt;"));
            this.escapes.comment = false;
            this.tokenBuffer = [];
        } else if (this.escapes.string) {
            // vb??????????????????
            // this.token.push("<br />");
            this.code.string(this.tokenBuffer.join(""));
            this.code.appendLine();
            this.tokenBuffer = [];
        } else {
            // ?????token
            this.endToken();
            this.code.appendLine();
        }
    }

    private endToken() {

    }

    private walkChar(c: string) {
        let escapes = this.escapes;

        if (c == "\n") {
            this.walkNewLine();
        }

        if (escapes.comment) {

        }

        if (c == "#") {

        }
    }
}