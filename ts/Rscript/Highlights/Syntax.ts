class Syntax {

    private code: CodeStyler = new CodeStyler();
    private escapes = {
        string: false,
        comment: false,
        keyword: false,
        quot: "'"
    }
    private tokenBuffer: string[] = [];

    public get peekLast(): string {
        if (this.tokenBuffer.length == 0) {
            return null;
        } else {
            return this.tokenBuffer[this.tokenBuffer.length - 1];
        }
    }

    public constructor(private chars: Pointer<string>) {
    }

    public getTokens(): CodeStyler {
        while (!this.chars.EndRead) {
            this.walkChar(this.chars.Next);
        }



        return this.code;
    }

    /** 
     * 处理当前的这个换行符
    */
    private walkNewLine() {
        // 是一个换行符
        if (this.escapes.comment) {
            // vb之中注释只有单行注释，换行之后就结束了                    
            this.code.comment(this.tokenBuffer.join("").replace("<", "&lt;"));
            this.escapes.comment = false;
            this.tokenBuffer = [];
        } else if (this.escapes.string) {
            // vb之中支持多行文本字符串，所以继续添加
            // this.token.push("<br />");
            this.code.string(this.tokenBuffer.join(""));
            this.code.appendLine();
            this.tokenBuffer = [];
        } else {
            // 结束当前的token
            this.endToken();
            this.code.appendLine();
        }
    }

    private endToken() {

    }

    private endString() {
        let escapes = this.escapes;

        escapes.string = false;
        escapes.quot = null;
    }

    private walkChar(c: string) {
        let escapes = this.escapes;

        if (c == "\n") {
            this.walkNewLine();
        } else if (escapes.comment) {
            this.tokenBuffer.push(c);
        } else if (escapes.string) {
            if (c == escapes.quot) {
                if (this.peekLast == "\\") {
                    this.tokenBuffer.push(c);
                } else {
                    this.endString();
                }
            } else {
                this.tokenBuffer.push(c);
            }
        } else if (c == "#") {
            escapes.comment = true;
        } else if (c == "'" || c == '"' || c == '`') {
            escapes.string = true;
            escapes.quot = c;
        } else if (c == " " || c == "\t") {
            this.endToken();
        } else {
            this.tokenBuffer.push(c);
        }
    }
}