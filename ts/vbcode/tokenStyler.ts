namespace vscode {

    export class tokenStyler {

        private code: StringBuilder = new StringBuilder("", "<br />\n");
        private lastTypeKeyword: boolean = false;
        private lastNewLine: boolean = true;
        private lastDirective: boolean = false;
        private lastToken: string = null;

        //#region "status"

        public get Html(): string {
            return this.code.toString();
        }

        public get LastAddedToken(): string {
            return this.lastToken;
        }

        /**
         * 上一个追加的单词是一个类型定义或者引用的关键词
        */
        public get LastTypeKeyword(): boolean {
            return this.lastTypeKeyword;
        }

        public get LastNewLine(): boolean {
            return this.lastNewLine;
        }

        public get LastDirective(): boolean {
            return this.lastDirective;
        }

        //#endregion

        private tagClass(token: string, cls: string): string {
            this.lastToken = token;
            return `<span class="${cls}">${token}</span>`;
        }

        public append(token: string) {
            if (token == " ") {
                this.code.Append("&nbsp;");
            } else if (token == "\t") {
                // 是一个TAB
                // 则插入4个空格
                for (var i: number = 0; i < 4; i++) {
                    this.code.Append("&nbsp;");
                }
            } else if (token == "(" || token == "{") {
                this.code.Append(token);
            } else {
                // 不计算空格
                this.code.Append(token);
                this.lastTypeKeyword = false;
                this.lastDirective = false;
                this.lastToken = token;
            }

            this.lastNewLine = false;
        }

        public appendLine(token: string = "") {
            this.code.AppendLine(token);
            this.lastTypeKeyword = false;
            this.lastNewLine = true;
            this.lastDirective = false;
            this.lastToken = token;
        }

        public directive(token: string) {
            this.code.Append(this.tagClass(token, "directive"));
            this.lastTypeKeyword = false;
            this.lastNewLine = false;
            this.lastDirective = true;
        }

        public type(token: string) {
            this.code.Append(this.tagClass(token, "type"));
            this.lastTypeKeyword = false;
            this.lastNewLine = false;
            this.lastDirective = false;
        }

        public comment(token: string) {
            this.code.AppendLine(this.tagClass(token, "comment"));
            this.lastTypeKeyword = false;
            this.lastNewLine = true;
            this.lastDirective = false;
        }

        public string(token: string) {
            this.code.Append(this.tagClass(token, "string"));
            this.lastTypeKeyword = false;
            this.lastNewLine = false;
            this.lastDirective = false;
        }

        public keyword(token: string) {
            this.code.Append(this.tagClass(token, "keyword"));

            if (TypeDefine.indexOf(token) > -1) {
                this.lastTypeKeyword = true;
            } else {
                this.lastTypeKeyword = false;
            }

            this.lastNewLine = false;
            this.lastDirective = false;
        }

        public attribute(token: string) {
            this.code.Append(this.tagClass(token, "attribute"));
            this.lastTypeKeyword = false;
            this.lastNewLine = false;
            this.lastDirective = false;
        }
    }
}