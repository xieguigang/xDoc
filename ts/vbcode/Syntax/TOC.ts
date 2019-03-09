/**
 * VB.NET源代码文档摘要
*/
namespace vscode.TOC {

    /**
     * 在VB之中用于类型申明的关键词
    */
    export const typeDeclares: {} = TypeInfo.EmptyObject(["Class", "Structure", "Enum", "Module"], true);
    export const fieldDeclares: {} = TypeInfo.EmptyObject(["Dim", "Public", "Private", "Friend", "Protected", "ReadOnly"], true);
    export const propertyDeclare: string = "Property";
    export const operatorDeclare: string = "Operator";
    export const functionDeclare: string = "Function";
    export const subroutineDeclare: string = "Sub";
    export const endStack: string = "End";

    export enum symbolTypes {
        /**
         * 普通符号
        */
        symbol = 2,
        /**
         * VB之中的关键词符号
        */
        keyword = 1
    }

    export enum declares {
        NA = 0,
        type,
        field,
        property,
        operator,
        function,
        sub
    }

    export enum scopes {
        type,
        method
    }

    /**
     * 源代码文档概览
    */
    export class Summary {

        private types: VBType[] = [];
        private typeStack: VBType[] = [];
        private current: VBType;
        private lastDeclare: declares = declares.NA;
        private lastType: string;
        private endStack: boolean = false;
        private scope: scopes;

        /**
         * 获取得到当前的源代码文档之中的类型定义信息
         * 这个列表是最外面的一层类型定义的列表
        */
        public get Declares(): VBType[] {
            return this.types;
        }

        public insertSymbol(symbol: string, type: symbolTypes, line: number) {
            if (symbol == "") {
                return;
            }

            if (type == symbolTypes.keyword) {
                this.keywordRoutine(symbol);
            } else {
                // 是一个普通的符号
                if (this.lastDeclare != declares.NA) {
                    this.symbolRoutine(symbol, line);
                    this.lastDeclare = declares.NA;
                }
            }
        }

        private symbolRoutine(symbol: string, line: number) {
            // 如果上一个符号是申明符号，则可以构建出一个新的类型或者成员
            switch (this.lastDeclare) {
                case declares.field:
                    this.current.addField(symbol, line);
                    break;
                case declares.function:
                    this.current.addFunction(symbol, line);
                    break;
                case declares.operator:
                    this.current.addOperator(symbol, line);
                    break;
                case declares.property:
                    this.current.addProperty(symbol, line);
                    break;
                case declares.sub:
                    this.current.addSub(symbol, line);
                    break;
                case declares.type:
                    if (isNullOrUndefined(this.current)) {
                        // 当前的类型数据为空的，则不是内部类型的声明
                        this.current = new VBType(symbol, this.lastType, line);
                    } else {
                        // 当前的类型数据不为空，则是当前的类型内的内部类型
                        let inner = new VBType(symbol, this.lastType, line);

                        this.typeStack.push(this.current);
                        this.current.innerType.push(inner);
                        this.current = inner;
                    }
                    break;
                default:
                // do nothing
            }
        }

        private keywordRoutine(symbol: string) {
            if (symbol in typeDeclares) {
                if (this.endStack) {
                    // 前面一个符号为结束符
                    if (this.typeStack.length == 0) {
                        // 不是内部类，则直接添加
                        this.types.push(this.current);
                    } else {
                        this.typeStack.pop();
                    }
                    this.current = null;
                    this.endStack = false;
                } else {
                    // 新的类型声明
                    this.lastDeclare = declares.type;
                    this.lastType = symbol;
                    this.scope = scopes.type;
                }
            } else if (symbol in fieldDeclares) {
                if (this.scope == scopes.type) {
                    // 当前类型之中的字段成员声明
                    this.lastDeclare = declares.field;
                } else {
                    this.lastDeclare = declares.NA;
                }
            } else if (symbol == propertyDeclare) {
                // 当前类型之中的属性成员声明
                this.lastDeclare = declares.property;
            } else if (symbol == operatorDeclare) {
                // 当前类型之中的操作符成员声明
                this.lastDeclare = declares.operator;
            } else if (symbol == functionDeclare) {
                if (this.endStack) {
                    this.scope = scopes.type;
                } else {
                    if (this.scope == scopes.type) {
                        // 当前类型之中的函数成员声明
                        this.lastDeclare = declares.function;
                        this.scope = scopes.method;
                    }
                }
            } else if (symbol == subroutineDeclare) {
                if (this.endStack) {
                    this.scope = scopes.type;
                } else {
                    if (this.scope == scopes.type) {
                        // 当前类型之中的子过程成员声明
                        this.lastDeclare = declares.sub;
                        this.scope = scopes.method;
                    }
                }
            } else if (symbol == endStack) {
                this.endStack = true;
            } else {
                // 什么也不是，重置
                this.lastDeclare = declares.NA;
            }
        }

        /**
         * 生成当前源代码的大纲目录
        */
        public TOC(): HTMLElement {
            throw "";
        }
    }
}