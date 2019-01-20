var vscode;
(function (vscode) {
    function defaultStyle() {
        return {
            string: "red",
            comment: "green",
            keyword: "blue",
            attribute: "cyan"
        };
    }
    vscode.defaultStyle = defaultStyle;
    function applyStyle(div, style) {
        if (style === void 0) { style = defaultStyle(); }
        $ts.select(".string").attr("style", "color: " + style.string + ";");
        $ts.select(".comment").attr("style", "color: " + style.comment + ";");
        $ts.select(".keyword").attr("style", "color: " + style.keyword);
        $ts.select(".attribute").attr("style", "color: " + style.attribute);
    }
    vscode.applyStyle = applyStyle;
})(vscode || (vscode = {}));
/// <reference path="../build/linq.d.ts" />
$ts.mode = Modes.debug;
// $ts.mode = Modes.production;
var vscode;
(function (vscode) {
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
    })("\n        |AddHandler|AddressOf|Alias|And|AndAlso|As|\n        |Boolean|ByRef|Byte|\n        |Call|Case|Catch|CBool|CByte|CChar|CDate|CDec|CDbl|Char|CInt|Class|CLng|CObj|Const|Continue|CSByte|CShort|CSng|CStr|CType|CUInt|CULng|CUShort|\n        |Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|\n        |Each|Else|ElseIf|End|EndIf|Enum|Erase|Error|Event|Exit|\n        |False|Finally|For|Friend|Function|\n        |Get|GetType|GetXMLNamespace|Global|GoSub|GoTo|\n        |Handles|\n        |If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|\n        |Let|Lib|Like|Long|Loop|\n        |Me|Mod|Module|MustInherit|MustOverride|MyBase|MyClass|\n        |Namespace|Narrowing|New|Next|Not|Nothing|NotInheritable|NotOverridable|NameOf|\n        |Object|Of|On|Operator|Option|Optional|Or|OrElse|Overloads|Overridable|Overrides|\n        |ParamArray|Partial|Private|Property|Protected|Public|\n        |RaiseEvent|ReadOnly|ReDim|REM|RemoveHandler|Resume|Return|\n        |SByte|Select|Set|Shadows|Shared|Short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|\n        |Then|Throw|To|True|Try|TryCast|TypeOf|\n        |Variant|\n        |Wend|\n        |UInteger|ULong|UShort|Using|\n        |When|While|Widening|With|WithEvents|WriteOnly|\n        |Xor|\n        |Yield|\n    ");
    function highlight(code, display, style) {
        if (style === void 0) { style = vscode.defaultStyle(); }
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
        var code = new StringBuilder("", "<br />\n");
        var render = new vscode.tokenStyler();
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
                code.Append(token[0]);
                code.Append(render.attribute($ts(token).Skip(1).Take(token.length - 2).JoinBy("")));
                code.Append(token[token.length - 1]);
            }
            else {
                // 结束当前的单词
                var word = token.join("");
                if (vscode.VBKeywords.indexOf(word) > -1) {
                    code.Append(render.keyword(word));
                }
                else {
                    code.Append(word);
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
                    code.AppendLine(render.comment(token.join("")));
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
                    code.AppendLine();
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
                    code.Append(render.string(token.join("")));
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
            else if (c == " ") {
                // 使用空格进行分词
                if (!escapes.comment && !escapes.string) {
                    endToken();
                    code.Append("&nbsp;");
                }
                else {
                    token.push("&nbsp;");
                }
            }
            else if (c == "<" || c == "&") {
                token.push(Strings.escapeXml(c));
            }
            else {
                token.push(c);
            }
        }
        return code.toString();
    }
    vscode.codeHtml = codeHtml;
})(vscode || (vscode = {}));
var vscode;
(function (vscode) {
    var tokenStyler = /** @class */ (function () {
        function tokenStyler() {
        }
        tokenStyler.prototype.comment = function (token) {
            return "<span class=\"comment\">" + token + "</span>";
        };
        tokenStyler.prototype.string = function (token) {
            return "<span class=\"string\">" + token + "</span>";
        };
        tokenStyler.prototype.keyword = function (token) {
            return "<span class=\"keyword\">" + token + "</span>";
        };
        tokenStyler.prototype.attribute = function (token) {
            return "<span class=\"attribute\">" + token + "</span>";
        };
        return tokenStyler;
    }());
    vscode.tokenStyler = tokenStyler;
})(vscode || (vscode = {}));
//# sourceMappingURL=vbcode.js.map