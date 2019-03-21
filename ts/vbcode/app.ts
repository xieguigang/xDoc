/// <reference path="../build/linq.d.ts" />
/// <reference path="CSS.ts" />
/// <reference path="Syntax/tokenStyler.ts" />
/// <reference path="Syntax/VBparser.ts" />

// $ts.mode = Modes.debug;
$ts.mode = Modes.production;

namespace vscode {

    /**
     * Visual Studio的默认代码渲染样式
    */
    export const VisualStudio: CSS = vscode.defaultStyle();
    /**
     * All of the VB keywords that following type names
    */
    export const TypeDefine: string[] = [
        "As", "Class", "Structure", "Module", "Imports", "Of", "New", "GetType"
    ];

    /**
     * 在VB.NET之中，单词与单词之间的分隔符列表
    */
    export const delimiterSymbols = {
        ".": true,
        ",": true,
        "=": true,
        "(": true,
        ")": true,
        "{": true,
        "}": true
    }

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

        if (TypeScript.logging.outputEverything) {
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

    /** 
     * 一般用于高亮markdown之中的代码转换结果部分：``<pre class="vbnet">``
    */
    export function highlightVB(style: CSS = vscode.VisualStudio, className: string = ".vbnet") {
        var codeList = $ts.select(className);

        for (let code of codeList.ToArray()) {
            vscode.highlight(code.innerText, <any>code, style);

            if (code.tagName.toLowerCase() == "pre") {
                code.style.border = "none";
                code.style.padding = "0px";
            }
        }
    }

    export function highlightGithub(github: github.raw, filename: string, display: string | IHTMLElement,
        style: CSS = vscode.VisualStudio,
        TOC: (toc: TOC.Summary) => void = null,
        hashHandler: Delegate.Sub = null) {

        let highlight = function (code: string) {
            var toc = vscode.highlight(code, display, style, hashHandler);

            if (!isNullOrUndefined(toc)) {
                TOC(toc);
            }
        }

        HttpHelpers.GetAsyn(github.RawfileURL(filename), code => highlight(code));
    }

    /** 
     * 解析所给定的VB.NET源代码文件为带格式的高亮HTML文本字符串，然后将HTML文件渲染到指定的id的标签之中
     * 
     * @param code VB.NET source code in plain text. 
     * @param style 可以传递一个null值来使用css进行样式的渲染
    */
    export function highlight(code: string, display: string | IHTMLElement, style: CSS = vscode.VisualStudio, hashhandler: Delegate.Sub = null): TOC.Summary {
        var pcode = new Pointer<string>(<string[]>Strings.ToCharArray(code));
        var html: tokenStyler = new vscode.VBParser(hashhandler, pcode).GetTokens();

        var container: HTMLElement = $ts("<tbody>");
        var preview = $ts("<table>", { class: "pre" }).display(container);

        for (let row of html.rows) {
            container.appendChild(row);
        }

        if (typeof display == "string") {
            $ts(display).display(preview);
        } else {
            if (display.tagName == "pre") {
                preview.className = "";
            }

            display.clear();
            display.display(preview);
        }

        if (style) {
            vscode.applyStyle(display, style);
        }

        if (TypeScript.logging.outputEverything) {
            console.log(html.rows);
            console.log(html.CodeSummary.Declares);
        }

        return html.CodeSummary;
    }
}

