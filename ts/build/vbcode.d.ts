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
     * The VB code syntax token generator
    */
    class VBParser {
        private chars;
        private code;
        private escapes;
        private token;
        /**
         * @param chars A chars enumerator
        */
        constructor(chars: Pointer<string>);
        /**
         * Get source file document highlight result
        */
        GetTokens(): tokenStyler;
        private static peekNextToken;
        private readonly isKeyWord;
        private readonly isAttribute;
        private endToken;
        /**
         * 处理当前的这个换行符
        */
        private walkNewLine;
        private walkStringQuot;
        private walkChar;
    }
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
        private static highlightURLs;
        /**
         * 可能会存在url
        */
        string(token: string): void;
        keyword(token: string): void;
        attribute(token: string): void;
    }
}
declare namespace vscode {
    /**
     * Visual Studio的默认代码渲染样式
    */
    const VisualStudio: CSS;
    /**
     * All of the VB keywords that following type names
    */
    const TypeDefine: string[];
    /**
     * 在VB.NET之中，单词与单词之间的分隔符列表
    */
    const delimiterSymbols: {
        ".": boolean;
        ",": boolean;
        "=": boolean;
        "(": boolean;
        ")": boolean;
        "{": boolean;
        "}": boolean;
    };
    /**
     * List of VB.NET language keywords
    */
    const VBKeywords: string[];
    /**
     * 一般用于高亮markdown之中的代码转换结果部分：``<pre class="vbnet">``
    */
    function highlightVB(style?: CSS): void;
    function highlightGithub(github: github.raw, filename: string, display: string | IHTMLElement, style?: CSS): void;
    /**
     * 解析所给定的VB.NET源代码文件为带格式的高亮HTML文本字符串，然后将HTML文件渲染到指定的id的标签之中
     *
     * @param code VB.NET source code in plain text.
     * @param style 可以传递一个null值来使用css进行样式的渲染
    */
    function highlight(code: string, display: string | IHTMLElement, style?: CSS): void;
}
declare namespace vscode.github {
    /**
     * Github 源文件请求帮助模块
    */
    class raw {
        username: string;
        repo: string;
        /**
         * 代码库的版本编号
        */
        commit: string;
        constructor(user: string, repo: string, commit?: string);
        /**
         * 构建生成目标源文件在github上面的位置链接url
        */
        fileURL(path: string): string;
        highlightCode(fileName: string, display: string | IHTMLElement, style?: CSS): void;
    }
}
