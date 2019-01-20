/// <reference path="../build/linq.d.ts" />
/// <reference path="CSS.ts" />
/// <reference path="tokenStyler.ts" />

$ts.mode = Modes.debug;
// $ts.mode = Modes.production;

namespace vscode {

    export const VisualStudio: CSS = vscode.defaultStyle();
    export const TypeDefine: string[] = [
        "As", "Class", "Structure", "Module"
    ];

    /**
     * List of VB.NET language keywords
    */
    export const VBKeywords: string[] = (function (str: string) {
        var lines: string[] = Strings.lineTokens(str.trim());
        var words: string[] = $ts(lines)
            .Select(s => s.split("|"))
            .Unlist(s => s)
            .Where(s => !Strings.Empty(s) && !Strings.Blank(s))
            .ToArray();

        if (Internal.outputEverything()) {
            console.log(words);
        }

        return words;
    })(
        `
        |AddHandler|AddressOf|Alias|And|AndAlso|As|
        |Boolean|ByRef|Byte|
        |Call|Case|Catch|CBool|CByte|CChar|CDate|CDec|CDbl|Char|CInt|Class|CLng|CObj|Const|Continue|CSByte|CShort|CSng|CStr|CType|CUInt|CULng|CUShort|
        |Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|
        |Each|Else|ElseIf|End|EndIf|Enum|Erase|Error|Event|Exit|
        |False|Finally|For|Friend|Function|
        |Get|GetType|GetXMLNamespace|Global|GoSub|GoTo|
        |Handles|
        |If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|
        |Let|Lib|Like|Long|Loop|
        |Me|Mod|Module|MustInherit|MustOverride|MyBase|MyClass|My|
        |Namespace|Narrowing|New|Next|Not|Nothing|NotInheritable|NotOverridable|NameOf|
        |Object|Of|On|Operator|Option|Optional|Or|OrElse|Overloads|Overridable|Overrides|
        |ParamArray|Partial|Private|Property|Protected|Public|
        |RaiseEvent|ReadOnly|ReDim|REM|RemoveHandler|Resume|Return|
        |SByte|Select|Set|Shadows|Shared|Short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|
        |Then|Throw|To|True|Try|TryCast|TypeOf|
        |Variant|
        |Wend|
        |UInteger|ULong|UShort|Using|
        |When|While|Widening|With|WithEvents|WriteOnly|
        |Xor|
        |Yield|
    `);

    export function highlight(code: string, display: string, style: CSS = vscode.VisualStudio) {
        var pcode = new Pointer<string>(Strings.ToCharArray(code));
        var html: string = vscode.codeHtml(pcode);

        $ts(display).display(html);
        vscode.applyStyle(display, style);

        if (Internal.outputEverything()) {
            console.log(html);
        }
    }

    export function codeHtml(chars: Pointer<string>): string {
        var code: tokenStyler = new tokenStyler();
        var escapes = {
            string: false,
            comment: false,
            keyword: false // VB之中使用[]进行关键词的转义操作
        };
        var token: string[] = [];
        var c: string;
        var endToken = function () {
            if (token[0] == "&lt;" && (token[token.length - 1] == ">" || token[token.length - 1] == "(")) {
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
                    code.keyword(word);
                } else if (code.LastTypeKeyword) {
                    code.type(word);
                } else {
                    code.append(word);
                }
            }

            token = [];
        }

        while (!chars.EndRead) {
            c = chars.Next;

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
                    endToken();
                    code.appendLine();
                }
            } else if (c == '"') {
                // 可能是字符串的起始
                if (!escapes.comment && !escapes.string) {
                    escapes.string = true;
                    endToken();
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
                    endToken();
                    token.push(c);
                } else {
                    token.push(c);
                }
            } else if (c == " " || c == "\t") {
                // 使用空格进行分词
                if (!escapes.comment && !escapes.string) {
                    endToken();
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
            } else if (c == "." || c == "=" || c == ")") {
                // 也会使用小数点进行分词
                if (!escapes.comment && !escapes.string) {
                    endToken();
                    code.append(c);
                } else {
                    token.push(c);
                }
            } else if (c == "<" || c == "&") {
                token.push(Strings.escapeXml(c));
            } else if (c == "(") {
                token.push("(");

                // attribute
                if (token[0] == "&lt;") {
                    endToken();
                }
            } else {
                token.push(c);
            }
        }

        return code.Html;
    }
}

