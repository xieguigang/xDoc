/// <reference path="../build/linq.d.ts" />

$ts.mode = Modes.debug;
// $ts.mode = Modes.production;

namespace vscode {

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
        `|AddHandler|AddressOf|Alias|And|AndAlso|As|
        |Boolean|ByRef|Byte|
        |Call|Case|Catch|CBool|CByte|CChar|CDate|CDec|CDbl|Char|CInt|Class|CLng|CObj|Const|Continue|CSByte|CShort|CSng|CStr|CType|CUInt|CULng|CUShort|
        |Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|
        |Each|Else|ElseIf|End|EndIf|Enum|Erase|Error|Event|Exit|
        |False|Finally|For|Friend|Function|
        |Get|GetType|GetXMLNamespace|Global|GoSub|GoTo|
        |Handles|
        |If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|
        |Let|Lib|Like|Long|Loop|
        |Me|Mod|Module|MustInherit|MustOverride|MyBase|MyClass|
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
        |Yield|`);

    export function highlight(code: string, display: string) {
        $ts(display).display(codeHtml(code));
    }

    export function codeHtml(code: string): string {
        return code;
    }
}

