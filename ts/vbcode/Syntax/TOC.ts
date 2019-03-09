/**
 * VB.NET源代码文档摘要
*/
namespace vscode.TOC {

    /**
     * 在VB之中用于类型申明的关键词
    */
    export const typeDeclares: {} = TypeInfo.EmptyObject(["Class", "Structure", "Enum", "Module"], true);
    export const fieldDeclares: {} = TypeInfo.EmptyObject(["Dim", "Public", "Private", "Friend", "Protected"], true);
    export const propertyDeclare: string = "Property";
    export const operatorDeclare: string = "Operator";
    export const functionDeclare: string = "Function";
    export const subroutineDeclare: string = "Sub";

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

    /**
     * 源代码文档概览
    */
    export class Summary {

        private types: VBType[] = [];
        private currentStack: VBType;

        public insertSymbol(symbol: string, type: symbolTypes, line: number) {
            if (type == symbolTypes.keyword) {
                if (symbol in typeDeclares) {
                    // 新的类型声明
                } else if (symbol in fieldDeclares) {
                    // 当前类型之中的字段成员声明
                } else if (symbol == propertyDeclare) {
                    // 当前类型之中的属性成员声明
                } else if (symbol == operatorDeclare) {
                    // 当前类型之中的操作符成员声明
                } else if (symbol == functionDeclare) {
                    // 当前类型之中的函数成员声明
                } else if (symbol == subroutineDeclare) {
                    // 当前类型之中的子过程成员声明
                } else {
                    // 什么也不是，略过当前的符号
                }
            } else {
                // 是一个普通的符号
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