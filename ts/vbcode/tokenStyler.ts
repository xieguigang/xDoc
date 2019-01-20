namespace vscode {

    export class tokenStyler {

        private code: StringBuilder = new StringBuilder("", "<br />\n");

        public get Html(): string {
            return this.code.toString();
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

        public comment(token: string) {
            this.code.AppendLine(tokenStyler.tagClass(token, "comment"));
        }

        public string(token: string) {
            this.code.Append(tokenStyler.tagClass(token, "string"));
        }

        public keyword(token: string) {
            this.code.Append(tokenStyler.tagClass(token, "keyword"));
        }

        public attribute(token: string) {
            this.code.Append(tokenStyler.tagClass(token, "attribute"));
        }
    }
}