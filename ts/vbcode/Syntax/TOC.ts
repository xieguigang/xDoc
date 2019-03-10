/**
 * VB.NET源代码文档摘要
*/
namespace vscode.TOC {

    /**
     * 在VB之中用于类型申明的关键词
    */
    export const typeDeclares: {} = TypeInfo.EmptyObject(["Class", "Structure", "Enum", "Module", "Delegate", "Interface"], true);
    export const fieldDeclares: {} = TypeInfo.EmptyObject(["Dim", "Public", "Private", "Friend", "Protected", "ReadOnly", "Const", "Shared"], true);
    export const propertyDeclare: string = "Property";
    export const operatorDeclare: string = "Operator";
    export const functionDeclare: string = "Function";
    export const subroutineDeclare: string = "Sub";
    export const endStack: string = "End";
    export const operatorKeywords: {} = TypeInfo.EmptyObject(["And", "Or", "Not", "AndAlso", "OrElse", "Xor", "IsTrue", "IsFalse", "CType", "Like"], true);

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
                this.keywordRoutine(symbol, line);
            } else {
                // 是一个普通的符号
                if (this.lastDeclare != declares.NA) {
                    this.symbolRoutine(symbol, line);
                    this.lastDeclare = declares.NA;
                }
            }
        }

        private symbolRoutine(symbol: string, line: number) {
            // 枚举类型的成员都是字段
            if (!isNullOrUndefined(this.current) && this.lastType == "Enum") {
                this.current.addField(symbol, line);
            } else {
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
                        this.typeDeclare(new VBType(symbol, this.lastType, line));
                        break;
                    default:
                    // do nothing
                }
            }
        }

        private typeDeclare(type: VBType) {
            if (isNullOrUndefined(this.current)) {
                if (this.lastType == "Delegate") {
                    // delegate类型没有内部成员，所以stack不需要变化
                    this.lastDeclare = declares.NA;
                    this.endStack = false;
                    this.current = null;
                    this.types.push(type);
                } else {
                    // 当前的类型数据为空的，则不是内部类型的声明
                    this.current = type;
                }
            } else {
                // 当前的类型数据不为空，则是当前的类型内的内部类型
                this.current.innerType.push(type);

                if (this.lastType == "Delegate") {
                    // delegate类型没有内部成员，所以stack不需要变化
                    this.lastDeclare = declares.NA;
                    this.endStack = false;
                    this.current = null;
                } else {
                    this.typeStack.push(this.current);
                    this.current = type;
                }
            }
        }

        private keywordRoutine(symbol: string, line: number) {
            if (symbol in typeDeclares) {
                if (this.endStack) {
                    // 前面一个符号为结束符
                    if (this.typeStack.length == 0) {
                        // 不是内部类，则直接添加
                        this.types.push(this.current);
                        this.current = null;
                    } else {
                        this.current = this.typeStack.pop();
                    }

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
                this.memberMethodStackRoutine(declares.property);
            } else if (symbol == operatorDeclare) {
                this.memberMethodStackRoutine(declares.operator);
            } else if (symbol == functionDeclare) {
                // delegate function
                if (this.lastDeclare == declares.type && this.lastType == "Delegate") {
                    // do nothing
                } else {
                    this.memberMethodStackRoutine(declares.function);
                }
            } else if (symbol == subroutineDeclare) {
                // delegate function
                if (this.lastDeclare == declares.type && this.lastType == "Delegate") {
                    // do nothing
                } else {
                    this.memberMethodStackRoutine(declares.sub);
                }
            } else if (symbol == endStack) {
                this.endStack = true;
            } else if (symbol in operatorKeywords) {
                this.current.addOperator(symbol, line);
                this.lastDeclare = declares.NA;
            } else {
                // 什么也不是，重置
                this.lastDeclare = declares.NA;
            }
        }

        private memberMethodStackRoutine(declareAs: declares) {
            if (this.endStack) {
                this.scope = scopes.type;
                this.endStack = false;
            } else {
                if (this.scope == scopes.type) {
                    // 当前类型之中的子过程成员声明
                    this.lastDeclare = declareAs;
                    this.scope = scopes.method;
                }
            }
        }

        /**
         * 生成当前源代码的大纲目录
        */
        public TOC(): HTMLElement {
            return Tree.BuildTOC(this);
        }
    }
}