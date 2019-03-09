namespace vscode {

    /** 
     * The VB code syntax token generator
    */
    export class VBParser {

        private code: tokenStyler = new tokenStyler();
        private escapes = {
            string: false,
            comment: false,
            keyword: false // VB之中使用[]进行关键词的转义操作
        };
        private token: string[] = [];

        /** 
         * @param chars A chars enumerator
        */
        public constructor(private chars: Pointer<string>) {
        }

        /**
         * Get source file document highlight result
        */
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

        private get isKeyWord(): boolean {
            return VBKeywords.indexOf(this.token.join("")) > -1;
        }
        private get isAttribute(): boolean {
            var token = this.token;
            var haveTagEnd = token[token.length - 1] == ">" || this.chars.Peek(-1) == "("; // token[token.length - 1] == "(";

            return token[0] == "&lt;" && haveTagEnd;
        }
        private endToken() {
            var code = this.code, token = this.token;

            if (this.isAttribute) {
                // 自定义属性需要一些额外的处理
                // 不渲染符号，只渲染单词
                code.append(token[0]);

                if (token[token.length - 1] == ">") {
                    code.attribute($ts(token).Skip(1).Take(token.length - 2).JoinBy(""));
                    code.append(token[token.length - 1]);
                } else {
                    code.attribute($ts(token).Skip(1).Take(token.length - 1).JoinBy(""));
                }

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

            this.token = [];
        }

        /** 
         * 处理当前的这个换行符
        */
        private walkNewLine() {
            // 是一个换行符
            if (this.escapes.comment) {
                // vb之中注释只有单行注释，换行之后就结束了                    
                this.code.comment(this.token.join("").replace("<", "&lt;"));
                this.escapes.comment = false;
                this.token = [];
            } else if (this.escapes.string) {
                // vb之中支持多行文本字符串，所以继续添加
                // this.token.push("<br />");
                this.code.string(this.token.join(""));
                this.code.appendLine();
                this.token = [];
            } else {
                // 结束当前的token
                this.endToken();
                this.code.appendLine();
            }
        }

        private walkStringQuot() {
            // 可能是字符串的起始
            if (!this.escapes.string) {
                this.escapes.string = true;
                this.endToken();
                this.token.push('"');
            } else if (this.escapes.string) {
                // 是字符串的结束符号
                this.escapes.string = false;
                this.token.push('"');
                this.code.string(this.token.join(""));
                this.token = [];
            }
        }

        private walkChar(c: string): void {
            var escapes = this.escapes;
            var code = this.code;

            if (c == "\n") {
                this.walkNewLine();

            } else if (this.escapes.comment) {
                // 当前的内容是注释的一部分，则直接添加内容
                this.token.push(c);

                // 下面的所有代码都是处理的非注释部分的内容了
                // 代码注释部分的内容已经在处理换行符和上面的代码之中完成了处理操作

            } else if (c == '"') {
                this.walkStringQuot();

            } else if (c == "'") {
                if (!escapes.string) {
                    // 是注释的起始
                    escapes.comment = true;
                    this.endToken();
                    this.token.push(c);
                } else {
                    this.token.push(c);
                }
            } else if (c == " " || c == "\t") {
                // 使用空格进行分词
                if (!escapes.string) {
                    this.endToken();
                    code.append(c);

                    // 是字符串的一部分
                } else if (c == " ") {
                    this.token.push("&nbsp;");
                } else {
                    // 是一个TAB
                    // 则插入4个空格
                    for (var i: number = 0; i < 4; i++) {
                        this.token.push("&nbsp;");
                    }
                }
            } else if (c in delimiterSymbols) {
                // 也会使用小数点进行分词
                if (!escapes.string) {
                    if (c == "(") {
                        //if (this.isKeyWord) {
                        this.endToken();
                        this.token.push("(");
                        this.endToken();
                        //} else {
                        //    this.endToken();
                        //    this.token.push("(");
                        //    this.endToken();
                        //}
                    } else {
                        this.endToken();
                        code.append(c);
                    }
                } else {
                    this.token.push(c);
                }
            } else if (c == "<" || c == "&") {
                this.token.push(Strings.escapeXml(c));
            } else {
                this.token.push(c);
            }
        }
    }
}