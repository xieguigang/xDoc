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
    })("|AddHandler|AddressOf|Alias|And|AndAlso|As|\n        |Boolean|ByRef|Byte|\n        |Call|Case|Catch|CBool|CByte|CChar|CDate|CDec|CDbl|Char|CInt|Class|CLng|CObj|Const|Continue|CSByte|CShort|CSng|CStr|CType|CUInt|CULng|CUShort|\n        |Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|\n        |Each|Else|ElseIf|End|EndIf|Enum|Erase|Error|Event|Exit|\n        |False|Finally|For|Friend|Function|\n        |Get|GetType|GetXMLNamespace|Global|GoSub|GoTo|\n        |Handles|\n        |If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|\n        |Let|Lib|Like|Long|Loop|\n        |Me|Mod|Module|MustInherit|MustOverride|MyBase|MyClass|\n        |Namespace|Narrowing|New|Next|Not|Nothing|NotInheritable|NotOverridable|NameOf|\n        |Object|Of|On|Operator|Option|Optional|Or|OrElse|Overloads|Overridable|Overrides|\n        |ParamArray|Partial|Private|Property|Protected|Public|\n        |RaiseEvent|ReadOnly|ReDim|REM|RemoveHandler|Resume|Return|\n        |SByte|Select|Set|Shadows|Shared|Short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|\n        |Then|Throw|To|True|Try|TryCast|TypeOf|\n        |Variant|\n        |Wend|\n        |UInteger|ULong|UShort|Using|\n        |When|While|Widening|With|WithEvents|WriteOnly|\n        |Xor|\n        |Yield|");
    function highlight(code, display) {
        $ts(display).display(codeHtml(code));
    }
    vscode.highlight = highlight;
    function codeHtml(code) {
        return code;
    }
    vscode.codeHtml = codeHtml;
})(vscode || (vscode = {}));
//# sourceMappingURL=vbcode.js.map