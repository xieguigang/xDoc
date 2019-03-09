namespace vscode {

    /** 
     * 输出的是一个``table``对象的html文本
    */
    export class tokenStyler {

        private code: StringBuilder = new StringBuilder("", "<br />\n");
        private rowList: HTMLTableRowElement[] = [];

        /**
         * 上一个追加的单词是一个类型定义或者引用的关键词
        */
        private lastTypeKeyword: boolean = false;
        private lastNewLine: boolean = true;
        private lastDirective: boolean = false;
        private lastToken: string = null;
        private summary: TOC.Summary = new TOC.Summary();

        //#region "status"

        public get rows(): HTMLTableRowElement[] {
            return this.rowList;
        }

        public get LastAddedToken(): string {
            return this.lastToken;
        }

        public get CodeSummary(): TOC.Summary {
            return this.summary;
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
            } else if (token == "(" || token == "{" || token == ",") {
                this.code.Append(token);
            } else {
                // 不计算空格
                this.code.Append(token);
                this.lastTypeKeyword = false;
                this.lastDirective = false;
                this.lastToken = token;
                this.summary.insertSymbol(token, TOC.symbolTypes.symbol, this.rowList.length + 1);
            }

            this.lastNewLine = false;
        }

        /** 
         * 生成一个新的table的行对象
        */
        public appendLine(token: string = "") {
            this.code.AppendLine(token);
            this.lastTypeKeyword = false;
            this.lastNewLine = true;
            this.lastDirective = false;
            this.lastToken = token;

            this.appendNewRow();
        }

        private appendNewRow() {
            // 构建新的row对象，然后将原来的代码字符串缓存清空
            var L = this.rowList.length + 1;
            var line = $ts("<span>", { class: "line" }).display(`${L}: `);
            var hash = $ts("<a>", { id: `L${L}`, href: `#L${L}`, class: "line-hash" }).display(line);
            var snippet = $ts("<td>", { class: "snippet" }).display(this.code.toString());
            var tr = $ts("<tr>").asExtends
                .append($ts("<td>", { class: "lines" }).display(hash))
                .append(snippet);

            this.rowList.push(<any>tr.HTMLElement);
            this.code = new StringBuilder("", "<br />\n");
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
            this.code.AppendLine(this.tagClass(tokenStyler.highlightURLs(token), "comment"));
            this.lastTypeKeyword = false;
            this.lastNewLine = true;
            this.lastDirective = false;

            this.appendNewRow();
        }

        private static highlightURLs(token: string): string {
            var urls: string[] = TypeScript.URL.ParseAllUrlStrings(token);
            var a: string;

            if (urls.length > 0 && Internal.outputEverything()) {
                console.log(urls);
            }

            for (let url of urls) {
                a = `<a href="${url}">${url}</a>`;
                token = token.replace(url, a);
            }

            return token;
        }

        /** 
         * 可能会存在url
        */
        public string(token: string) {
            this.code.Append(this.tagClass(tokenStyler.highlightURLs(token), "string"));
            this.lastTypeKeyword = false;
            this.lastNewLine = false;
            this.lastDirective = false;
        }

        public keyword(token: string) {
            this.code.Append(this.tagClass(token, "keyword"));

            if (TypeDefine.indexOf(token) > -1) {
                this.lastTypeKeyword = true;
                this.summary.insertSymbol(token, TOC.symbolTypes.keyword, this.rowList.length + 1);
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