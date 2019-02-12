/// <reference path="linq.d.ts" />
declare namespace vscode {
    interface CSS {
        string: string;
        comment: string;
        keyword: string;
        attribute: string;
        /**
         * 用户类型的颜色样式值
        */
        type: string;
        directive: string;
        globalFont: CanvasHelper.CSSFont;
    }
    function defaultStyle(): CSS;
    function applyStyle(div: string | IHTMLElement, style?: CSS): void;
}
declare namespace vscode {
    /**
     * 输出的是一个``table``对象的html文本
    */
    class tokenStyler {
        private code;
        private rowList;
        private lastTypeKeyword;
        private lastNewLine;
        private lastDirective;
        private lastToken;
        readonly rows: HTMLTableRowElement[];
        readonly LastAddedToken: string;
        /**
         * 上一个追加的单词是一个类型定义或者引用的关键词
        */
        readonly LastTypeKeyword: boolean;
        readonly LastNewLine: boolean;
        readonly LastDirective: boolean;
        private tagClass;
        append(token: string): void;
        /**
         * 生成一个新的table的行对象
        */
        appendLine(token?: string): void;
        private appendNewRow;
        directive(token: string): void;
        type(token: string): void;
        comment(token: string): void;
        string(token: string): void;
        keyword(token: string): void;
        attribute(token: string): void;
    }
}
declare namespace vscode {
    const VisualStudio: CSS;
    /**
     * All of the VB keywords that following type names
    */
    const TypeDefine: string[];
    /**
     * List of VB.NET language keywords
    */
    const VBKeywords: string[];
    /**
     * <pre class="vbnet">
    */
    function highlightVB(style?: CSS): void;
    function highlightGithub(github: github.raw, filename: string, display: string | IHTMLElement, style?: CSS): void;
    /**
     * @param style 可以传递一个null值来使用css进行样式的渲染
    */
    function highlight(code: string, display: string | IHTMLElement, style?: CSS): void;
    function codeHtml(chars: Pointer<string>): tokenStyler;
}
declare namespace vscode.github {
    class raw {
        username: string;
        repo: string;
        commit: string;
        fileURL(path: string): string;
    }
}
