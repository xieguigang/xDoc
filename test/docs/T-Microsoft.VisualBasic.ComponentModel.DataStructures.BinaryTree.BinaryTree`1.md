
# BinaryTree`1
_namespace: [Microsoft.VisualBasic.ComponentModel.DataStructures.BinaryTree](N-Microsoft.VisualBasic.ComponentModel.DataStructures.BinaryTree.md)_

The Binary tree itself.
 
 A very basic Binary Search Tree. Not generalized, stores
 name/value pairs in the tree nodes. name is the node key.
 The advantage of a binary tree is its fast insert and lookup
 characteristics. This version does not deal with tree balancing.

### Methods

#### #ctor
初始化有一个根节点
#### Add
Recursively locates an empty slot in the binary tree and inserts the node
#### clear
Clear the binary tree.
#### delete
Delete a given node. This is the more complex method in the binary search
 class. The method considers three senarios, 1) the deleted node has no
 children; 2) the deleted node as one child; 3) the deleted node has two
 children. Case one and two are relatively simple to handle, the only
 unusual considerations are when the node is the root node. Case 3) is
 much more complicated. It requires the location of the successor node.
 The node to be deleted is then replaced by the sucessor node and the
 successor node itself deleted. Throws an exception if the method fails
 to locate the node for deletion.
#### DirectFind
假若节点是不适用标识符来标识自己的左右的位置，则必须要使用这个方法才可以查找成功
_returns: _
#### findSuccessor
Find the next ordinal node starting at node startNode.
 Due to the structure of a binary search tree, the
 successor node is simply the left most node on the right branch.
_returns: Returns a reference to the node if successful, else null_
#### FindSymbol
Find name in tree. Return a reference to the node
 if symbol found else return null to indicate failure.
_returns: Returns null if it fails to find the node, else returns reference to node_
#### insert
Add a symbol to the tree if it's a new one. Returns reference to the new
 node if a new node inserted, else returns null to indicate node already present.
_returns:  Returns reference to the new node is the node was inserted.
 If a duplicate node (same name was located then returns null_
#### ToString
Return the tree depicted as a simple string, useful for debugging, eg
 50(40(30(20, 35), 45(44, 46)), 60)
_returns: Returns the tree_


### Properties

#### Length
Returns the number of nodes in the tree

