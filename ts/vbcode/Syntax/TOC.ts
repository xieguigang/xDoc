/**
 * VB.NET源代码文档摘要
*/
namespace vscode.TOC {
       
    /**
     * 在VB之中用于类型申明的关键词
    */
    export const typeDeclares: string[] = ["Class", "Structure", "Enum", "Module"];
    export const fieldDeclares: string[] = ["Dim", "Public", "Private", "Friend", "Protected"];
    export const propertyDeclare: string = "Property";
    export const operatorDeclare: string = "Operator";
    export const functionDeclare: string = "Function";
    export const subroutineDeclare: string = "Sub";

    export enum symbolTypes {
        keyword = 1,
        symbol = 2
    }

    /**
     * 源代码文档概览
    */
    export class Summary {

        private types: VBType[] = [];
        private currentStack: VBType;

        public insertSymbol(symbol: string, type: symbolTypes, line: number) {
            if (type == symbolTypes.keyword) {
                if ()
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