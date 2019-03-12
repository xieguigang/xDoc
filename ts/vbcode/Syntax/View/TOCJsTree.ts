namespace vscode.TOC.View {

    export function jsTree(summary: Summary): JSTreeStaticDefaults {
        var treeData: treeNode[] = [];
        var hashTable: {} = {};

        typeNodes(summary.Declares, "#", treeData);

        for (let node of treeData) {
            hashTable[node.id] = node.hashLine;
        }

        return <any>{
            core: <JSTreeStaticDefaultsCore>{
                data: treeData
            },
            hashSet: hashTable
        };
    }

    function typeIcon(type: VBType): string {
        switch (type.type) {

            case "Class": return Icons.vbclass;
            case "Module": return Icons.vbmodule;
            case "Interface": return Icons.vbinterface;
            case "Delegate": return Icons.vbdelegate;
            case "Namespace": return Icons.vbnamespace;
            case "Structure": return Icons.vbstructure;

            default:
                return Icons.vbclass;
        }
    }

    function typeNodes(types: VBType[], parent: string, tree: treeNode[]) {
        for (var type of types) {
            let typeNode: treeNode = <treeNode>{
                icon: typeIcon(type),
                id: `node_${tree.length + 1}`,
                parent: parent,
                text: type.symbol,
                hashLine: `#L${type.line}`
            };

            tree.push(typeNode);
            typeTree(type, typeNode.id, tree);
        }
    }

    function typeTree(type: VBType, parent: string, tree: treeNode[]) {
        if (!IsNullOrEmpty(type.innerType)) {
            typeNodes(type.innerType, parent, tree);
        }

        memberNodes(type.fields, parent, Icons.vbfield, tree);
        memberNodes(type.properties, parent, Icons.vbproperty, tree);
        memberNodes(type.functions, parent, Icons.vbmethod, tree);
        memberNodes(type.subs, parent, Icons.vbmethod, tree);
        memberNodes(type.operators, parent, Icons.vboperator, tree);
    }

    function memberNodes(members: CodeMap[], parent: string, icon: string, tree: treeNode[]) {
        if (!IsNullOrEmpty(members)) {
            for (var member of members) {
                let memberNode: treeNode = <treeNode>{
                    icon: icon,
                    id: `node_${tree.length + 1}`,
                    parent: parent,
                    text: member.symbol,
                    hashLine: `#L${member.line}`
                }

                tree.push(memberNode);
            }
        }
    }

    export interface treeNode {
        icon: string;
        id: string;
        parent: string;
        text: string;
        hashLine: string;
    }
}