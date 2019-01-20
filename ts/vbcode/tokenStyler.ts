namespace vscode {

    export class tokenStyler {

        private code: StringBuilder = new StringBuilder("", "<br />\n");
        private lastTypeKeyword: boolean = false;

        public get Html(): string {
            return this.code.toString();
        }

        /**
         * 上一个追加的单词是一个类型定义或者引用的关键词
        */
        public get LastTypeKeyword(): boolean {
            return this.lastTypeKeyword;
        }

        private static tagClass(token: string, cls: string): string {
            return `<span class="${cls}">${token}</span>`;
        }

        public append(token: string = "&nbsp;") {
            this.code.Append(token);

            if (token != "&nbsp;") {
                this.lastTypeKeyword = false;
            }
        }

        public appendLine(token: string = "") {
            this.code.AppendLine(token);
            this.lastTypeKeyword = false;
        }

        public type(token: string) {
            this.code.Append(tokenStyler.tagClass(token, "type"));
            this.lastTypeKeyword = false;
        }

        public comment(token: string) {
            this.code.AppendLine(tokenStyler.tagClass(token, "comment"));
            this.lastTypeKeyword = false;
        }

        public string(token: string) {
            this.code.Append(tokenStyler.tagClass(token, "string"));
            this.lastTypeKeyword = false;
        }

        public keyword(token: string) {
            this.code.Append(tokenStyler.tagClass(token, "keyword"));

            if (TypeDefine.indexOf(token) > -1) {
                this.lastTypeKeyword = true;
            } else {
                this.lastTypeKeyword = false;
            }
        }

        public attribute(token: string) {
            this.code.Append(tokenStyler.tagClass(token, "attribute"));
            this.lastTypeKeyword = false;
        }
    }
}