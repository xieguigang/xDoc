namespace vscode.TOC {

    /**
     * 符号映射
    */
    export class CodeMap {

        /**
         * 构建出一个符号映射
         * 
         * @param symbol 对象符号字符串，例如类型名称，属性，函数名称等
         * @param line 目标符号对象在代码源文本之中所处的行编号
        */
        public constructor(public symbol: string, public line: number) {
        }
    }

    /**
     * class/structure/enum
    */
    export class VBType extends CodeMap {

        fields: CodeMap[];
        properties: CodeMap[];
        subs: CodeMap[];
        functions: CodeMap[];
        operators: CodeMap[];

        /**
         * 在当前类型之中定义的类型
        */
        innerType: VBType[];

        /**
         * 类，结构体或者枚举？
        */
        public type: string;

        public constructor(symbol: string, type: string, line: number) {
            super(symbol, line);

            this.type = type;
        }
    }
}