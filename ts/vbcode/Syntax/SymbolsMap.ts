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

        fields: CodeMap[] = [];
        properties: CodeMap[] = [];
        subs: CodeMap[] = [];
        functions: CodeMap[] = [];
        operators: CodeMap[] = [];

        /**
         * 在当前类型之中定义的类型
        */
        innerType: VBType[] = [];

        /**
         * 类，结构体或者枚举？
        */
        public type: string;

        public constructor(symbol: string, type: string, line: number) {
            super(symbol, line);

            // 获取得到类型声明的类型
            this.type = type;
        }

        //#region "add methods"

        public addField(symbol: string, line: number) {
            this.fields.push(new CodeMap(symbol, line));
        }

        public addProperty(symbol: string, line: number) {
            this.properties.push(new CodeMap(symbol, line));
        }

        public addSub(symbol: string, line: number) {
            this.subs.push(new CodeMap(symbol, line));
        }

        public addFunction(symbol: string, line: number) {
            this.functions.push(new CodeMap(symbol, line));
        }

        public addOperator(symbol: string, line: number) {
            this.operators.push(new CodeMap(symbol, line));
        }

        //#endregion
    }
}