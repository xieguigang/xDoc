namespace vscode {

    export class VBParser {

        private code: tokenStyler = new tokenStyler();
        private escapes = {
            string: false,
            comment: false,
            keyword: false // VB之中使用[]进行关键词的转义操作
        };
        private token: string[] = [];

        public constructor(private chars: Pointer<string>) {
        }

        public GetTokens(): tokenStyler {
            while (!this.chars.EndRead) {
                this.walkChar(this.chars.Next);
            }

            return this.code;
        }

        private static peekNextToken(chars: Pointer<string>, allowNewLine: boolean = false): string {
            var i: number = 0;
            var c: string = null;

            while ((c = chars.Peek(i++)) == " " || c == "\n") {
                if ((c == "\n") && !allowNewLine) {
                    break;
                }
            }

            return c;
        }

        private isKeyWord() {
            return VBKeywords.indexOf(this.token.join("")) > -1;
        }
        private isAttribute() {
            var token = this.token;
            var haveTagEnd = token[token.length - 1] == ">" || token[token.length - 1] == "(";
            return token[0] == "&lt;" && haveTagEnd;
        }
        private endToken() {
            var code = this.code, token = this.token;

            if (this.isAttribute()) {
                // 自定义属性需要一些额外的处理
                // 不渲染符号，只渲染单词
                code.append(token[0]);
                code.attribute($ts(token).Skip(1).Take(token.length - 2).JoinBy(""));
                code.append(token[token.length - 1]);
            } else if (code.LastNewLine && token[0] == "#") {
                code.directive(token.join(""));
            } else {
                // 结束当前的单词
                var word: string = token.join("");

                if (code.LastDirective) {
                    code.directive(word);
                } else if (VBKeywords.indexOf(word) > -1) {
                    // 当前的单词是一个关键词
                    code.keyword(word);
                } else if (code.LastTypeKeyword) {
                    if (code.LastAddedToken == "Imports") {
                        // Imports xxx = yyyy
                        if (VBParser.peekNextToken(this.chars) == "=") {
                            code.type(word);
                        } else {
                            code.append(word);
                        }
                    } else if (word == "(") {
                        code.append(word);
                    } else {
                        code.type(word);
                    }
                } else {
                    code.append(word);
                }
            }

            token = [];
        }

        private walkChar(c: string): void {
            var escapes = this.escapes;
            var code = this.code, token = this.token;

            if (c == "\n") {
                // 是一个换行符
                if (escapes.comment) {
                    // vb之中注释只有单行注释，换行之后就结束了                    
                    code.comment(token.join(""));
                    escapes.comment = false;
                    token = [];
                } else if (escapes.string) {
                    // vb之中支持多行文本字符串，所以继续添加
                    token.push("<br />");
                } else {
                    // 结束当前的token
                    this.endToken();
                    code.appendLine();
                }
            } else if (c == '"') {
                // 可能是字符串的起始
                if (!escapes.comment && !escapes.string) {
                    escapes.string = true;
                    this.endToken();
                    token.push(c);
                } else if (!escapes.comment && escapes.string) {
                    // 是字符串的结束符号
                    escapes.string = false;
                    token.push(c);
                    code.string(token.join(""));
                    token = [];
                }
            } else if (c == "'") {
                if (!escapes.comment && !escapes.string) {
                    // 是注释的起始
                    escapes.comment = true;
                    this.endToken();
                    token.push(c);
                } else {
                    token.push(c);
                }
            } else if (c == " " || c == "\t") {
                // 使用空格进行分词
                if (!escapes.comment && !escapes.string) {
                    this.endToken();
                    code.append(c);
                } else if (c == " ") {
                    token.push("&nbsp;");
                } else {
                    // 是一个TAB
                    // 则插入4个空格
                    for (var i: number = 0; i < 4; i++) {
                        token.push("&nbsp;");
                    }
                }
            } else if (c in delimiterSymbols) {
                // 也会使用小数点进行分词
                if (!escapes.comment && !escapes.string) {
                    if (c == "(") {
                        if (this.isKeyWord()) {
                            this.endToken();
                            token.push("(");
                            this.endToken();
                        } else {
                            token.push("(");
                            this.endToken();
                        }
                    } else {
                        this.endToken();
                        code.append(c);
                    }
                } else {
                    token.push(c);
                }
            } else if (c == "<" || c == "&") {
                token.push(Strings.escapeXml(c));
            } else {
                token.push(c);
            }
        }
    }
}