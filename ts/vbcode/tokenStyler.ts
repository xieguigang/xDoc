namespace vscode {

    export class tokenStyler {

        private code: StringBuilder = new StringBuilder("", "<br />\n");
        private lastKeyword: boolean = false;

        public get Html(): string {
            return this.code.toString();
        }

        /**
         * 上一个追加的单词是一个关键词
        */
        public get LastKeyword(): boolean {
            return this.lastKeyword;
        }

        private static tagClass(token: string, cls: string): string {
            return `<span class="${cls}">${token}</span>`;
        }

        public append(token: string) {
            this.code.Append(token);
        }

        public appendLine(token: string = "") {
            this.code.AppendLine(token);
        }

        public type(token: string) {
            this.code.Append(tokenStyler.tagClass(token, "type"));
        }

        public comment(token: string) {
            this.code.AppendLine(tokenStyler.tagClass(token, "comment"));
        }

        public string(token: string) {
            this.code.Append(tokenStyler.tagClass(token, "string"));
        }

        public keyword(token: string) {
            this.code.Append(tokenStyler.tagClass(token, "keyword"));
            this.lastKeyword = true;
        }

        public attribute(token: string) {
            this.code.Append(tokenStyler.tagClass(token, "attribute"));
        }
    }
}