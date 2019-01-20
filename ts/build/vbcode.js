var vscode;
(function (vscode) {
    function defaultStyle() {
        return {
            string: "#a31515",
            comment: "#008000",
            keyword: "#0000ff",
            attribute: "#2b91af",
            type: "#2b91af",
            directive: "grey",
            globalFont: {
                fontName: "Consolas",
                size: { pixel: 12 }
            }
        };
    }
    vscode.defaultStyle = defaultStyle;
    function applyStyle(div, style) {
        if (style === void 0) { style = vscode.VisualStudio; }
        $ts.select(".string").attr("style", "color: " + style.string + ";");
        $ts.select(".comment").attr("style", "color: " + style.comment + ";");
        $ts.select(".keyword").attr("style", "color: " + style.keyword);
        $ts.select(".attribute").attr("style", "color: " + style.attribute);
        $ts.select(".type").attr("style", "color: " + style.type);
        $ts.select(".directive").attr("style", "color: " + style.directive);
        CanvasHelper.CSSFont.applyCSS($ts(div), style.globalFont);
    }
    vscode.applyStyle = applyStyle;
})(vscode || (vscode = {}));
var vscode;
(function (vscode) {
    var tokenStyler = /** @class */ (function () {
        function tokenStyler() {
            this.code = new StringBuilder("", "<br />\n");
            this.lastTypeKeyword = false;
            this.lastNewLine = true;
            this.lastDirective = false;
        }
        Object.defineProperty(tokenStyler.prototype, "Html", {
            get: function () {
                return this.code.toString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(tokenStyler.prototype, "LastTypeKeyword", {
            /**
             * 上一个追加的单词是一个类型定义或者引用的关键词
            */
            get: function () {
                return this.lastTypeKeyword;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(tokenStyler.prototype, "LastNewLine", {
            get: function () {
                return this.lastNewLine;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(tokenStyler.prototype, "LastDirective", {
            get: function () {
                return this.lastDirective;
            },
            enumerable: true,
            configurable: true
        });
        tokenStyler.tagClass = function (token, cls) {
            return "<span class=\"" + cls + "\">" + token + "</span>";
        };
        tokenStyler.prototype.append = function (token) {
            if (token == " ") {
                this.code.Append("&nbsp;");
            }
            else if (token == "\t") {
                // 是一个TAB
                // 则插入4个空格
                for (var i = 0; i < 4; i++) {
                    this.code.Append("&nbsp;");
                }
            }
            else {
                this.code.Append(token);
                this.lastTypeKeyword = false;
                this.lastDirective = false;
            }
            this.lastNewLine = false;
        };
        tokenStyler.prototype.appendLine = function (token) {
            if (token === void 0) { token = ""; }
            this.code.AppendLine(token);
            this.lastTypeKeyword = false;
            this.lastNewLine = true;
            this.lastDirective = false;
        };
        tokenStyler.prototype.directive = function (token) {
            this.code.Append(tokenStyler.tagClass(token, "directive"));
            this.lastTypeKeyword = false;
            this.lastNewLine = false;
            this.lastDirective = true;
        };
        tokenStyler.prototype.type = function (token) {
            this.code.Append(tokenStyler.tagClass(token, "type"));
            this.lastTypeKeyword = false;
            this.lastNewLine = false;
            this.lastDirective = false;
        };
        tokenStyler.prototype.comment = function (token) {
            this.code.AppendLine(tokenStyler.tagClass(token, "comment"));
            this.lastTypeKeyword = false;
            this.lastNewLine = true;
            this.lastDirective = false;
        };
        tokenStyler.prototype.string = function (token) {
            this.code.Append(tokenStyler.tagClass(token, "string"));
            this.lastTypeKeyword = false;
            this.lastNewLine = false;
            this.lastDirective = false;
        };
        tokenStyler.prototype.keyword = function (token) {
            this.code.Append(tokenStyler.tagClass(token, "keyword"));
            if (vscode.TypeDefine.indexOf(token) > -1) {
                this.lastTypeKeyword = true;
            }
            else {
                this.lastTypeKeyword = false;
            }
            this.lastNewLine = false;
            this.lastDirective = false;
        };
        tokenStyler.prototype.attribute = function (token) {
            this.code.Append(tokenStyler.tagClass(token, "attribute"));
            this.lastTypeKeyword = false;
            this.lastNewLine = false;
            this.lastDirective = false;
        };
        return tokenStyler;
    }());
    vscode.tokenStyler = tokenStyler;
})(vscode || (vscode = {}));
/// <reference path="../build/linq.d.ts" />
/// <reference path="CSS.ts" />
/// <reference path="tokenStyler.ts" />
$ts.mode = Modes.debug;
// $ts.mode = Modes.production;
var vscode;
(function (vscode) {
    vscode.VisualStudio = vscode.defaultStyle();
    vscode.TypeDefine = [
        "As", "Class", "Structure", "Module"
    ];
    /**
     * List of VB.NET language keywords
    */
    vscode.VBKeywords = (function (str) {
        var lines = Strings.lineTokens(str.trim());
        var words = $ts(lines)
            .Select(function (s) { return s.split("|"); })
            .Unlist(function (s) { return s; })
            .Where(function (s) { return !Strings.Empty(s) && !Strings.Blank(s); })
            .ToArray();
        if (Internal.outputEverything()) {
            console.log(words);
        }
        return words;
    })("\n        |AddHandler|AddressOf|Alias|And|AndAlso|As|\n        |Boolean|ByRef|Byte|\n        |Call|Case|Catch|CBool|CByte|CChar|CDate|CDec|CDbl|Char|CInt|Class|CLng|CObj|Const|Continue|CSByte|CShort|CSng|CStr|CType|CUInt|CULng|CUShort|\n        |Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|\n        |Each|Else|ElseIf|End|EndIf|Enum|Erase|Error|Event|Exit|\n        |False|Finally|For|Friend|Function|\n        |Get|GetType|GetXMLNamespace|Global|GoSub|GoTo|\n        |Handles|\n        |If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|\n        |Let|Lib|Like|Long|Loop|\n        |Me|Mod|Module|MustInherit|MustOverride|MyBase|MyClass|My|\n        |Namespace|Narrowing|New|Next|Not|Nothing|NotInheritable|NotOverridable|NameOf|\n        |Object|Of|On|Operator|Option|Optional|Or|OrElse|Overloads|Overridable|Overrides|\n        |ParamArray|Partial|Private|Property|Protected|Public|\n        |RaiseEvent|ReadOnly|ReDim|REM|RemoveHandler|Resume|Return|\n        |SByte|Select|Set|Shadows|Shared|Short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|\n        |Then|Throw|To|True|Try|TryCast|TypeOf|\n        |Variant|\n        |Wend|\n        |UInteger|ULong|UShort|Using|\n        |When|While|Widening|With|WithEvents|WriteOnly|\n        |Xor|\n        |Yield|\n    ");
    function highlight(code, display, style) {
        if (style === void 0) { style = vscode.VisualStudio; }
        var pcode = new Pointer(Strings.ToCharArray(code));
        var html = vscode.codeHtml(pcode);
        $ts(display).display(html);
        vscode.applyStyle(display, style);
        if (Internal.outputEverything()) {
            console.log(html);
        }
    }
    vscode.highlight = highlight;
    function codeHtml(chars) {
        var code = new vscode.tokenStyler();
        var escapes = {
            string: false,
            comment: false,
            keyword: false // VB之中使用[]进行关键词的转义操作
        };
        var token = [];
        var c;
        var endToken = function () {
            if (token[0] == "&lt;" && (token[token.length - 1] == ">" || token[token.length - 1] == "(")) {
                // 自定义属性需要一些额外的处理
                // 不渲染符号，只渲染单词
                code.append(token[0]);
                code.attribute($ts(token).Skip(1).Take(token.length - 2).JoinBy(""));
                code.append(token[token.length - 1]);
            }
            else if (code.LastNewLine && token[0] == "#") {
                code.directive(token.join(""));
            }
            else {
                // 结束当前的单词
                var word = token.join("");
                if (code.LastDirective) {
                    code.directive(word);
                }
                else if (vscode.VBKeywords.indexOf(word) > -1) {
                    code.keyword(word);
                }
                else if (code.LastTypeKeyword) {
                    code.type(word);
                }
                else {
                    code.append(word);
                }
            }
            token = [];
        };
        while (!chars.EndRead) {
            c = chars.Next;
            if (c == "\n") {
                // 是一个换行符
                if (escapes.comment) {
                    // vb之中注释只有单行注释，换行之后就结束了                    
                    code.comment(token.join(""));
                    escapes.comment = false;
                    token = [];
                }
                else if (escapes.string) {
                    // vb之中支持多行文本字符串，所以继续添加
                    token.push("<br />");
                }
                else {
                    // 结束当前的token
                    endToken();
                    code.appendLine();
                }
            }
            else if (c == '"') {
                // 可能是字符串的起始
                if (!escapes.comment && !escapes.string) {
                    escapes.string = true;
                    endToken();
                    token.push(c);
                }
                else if (!escapes.comment && escapes.string) {
                    // 是字符串的结束符号
                    escapes.string = false;
                    token.push(c);
                    code.string(token.join(""));
                    token = [];
                }
            }
            else if (c == "'") {
                if (!escapes.comment && !escapes.string) {
                    // 是注释的起始
                    escapes.comment = true;
                    endToken();
                    token.push(c);
                }
                else {
                    token.push(c);
                }
            }
            else if (c == " " || c == "\t") {
                // 使用空格进行分词
                if (!escapes.comment && !escapes.string) {
                    endToken();
                    code.append(c);
                }
                else if (c == " ") {
                    token.push("&nbsp;");
                }
                else {
                    // 是一个TAB
                    // 则插入4个空格
                    for (var i = 0; i < 4; i++) {
                        token.push("&nbsp;");
                    }
                }
            }
            else if (c == "." || c == "=" || c == ")") {
                // 也会使用小数点进行分词
                if (!escapes.comment && !escapes.string) {
                    endToken();
                    code.append(c);
                }
                else {
                    token.push(c);
                }
            }
            else if (c == "<" || c == "&") {
                token.push(Strings.escapeXml(c));
            }
            else if (c == "(") {
                token.push("(");
                // attribute
                if (token[0] == "&lt;") {
                    endToken();
                }
            }
            else {
                token.push(c);
            }
        }
        return code.Html;
    }
    vscode.codeHtml = codeHtml;
})(vscode || (vscode = {}));
//# sourceMappingURL=vbcode.js.map