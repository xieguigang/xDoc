
# Set
_namespace: [Microsoft.VisualBasic.ComponentModel.DataStructures](N-Microsoft.VisualBasic.ComponentModel.DataStructures.md)_

Represents an unordered grouping of unique hetrogenous members.
 (这个对象的功能和List类似，但是这个对象的主要的作用是进行一些集合运算：使用AND求交集以及使用OR求并集的)

### Methods

#### #ctor
Constructor called when the source data is an array of Sets. They will
 be unioned together, with addition exceptions quietly eaten.
#### Add
Method to add an Object to the set. The new member 
 must be unique.
#### Clear
Empty the set of all members.
#### Contains
Method to determine if a given object is a member of the set.
_returns: True if it is a member of the Set, false if not._
#### Dispose
Performs cleanup tasks on the Set object.
#### Equals
Determines whether two Set instances are equal.
_returns: true if the specified Set is equal to the current 
 Set; otherwise, false._
#### GetHashCode
Serves as a hash function for a particular type, suitable for use in hashing 
 algorithms and data structures like a hash table.
_returns: A hash code for the current Set._
#### IEnumerable_GetEnumerator
Returns an enumerator that can iterate through a collection.
_returns: An IEnumerator that can be 
 used to iterate through the collection._
#### IsEmpty
A method to determine whether the Set has members.
_returns: True is there are members, false if there are 0 members._
#### op_Addition
求两个集合的并集，将两个集合之中的所有元素都合并在一起，这个操作符会忽略掉重复出现的元素
_returns: _
#### op_BitwiseAnd
Performs an intersection of two sets.(求交集)
_returns: A new Set object that contains the members
 that were common to both of the input sets._
#### op_BitwiseOr
Performs a union of two sets.(求并集)
_returns: A new Set object that contains all of the
 members of each of the input sets._
#### op_Equality
Overloaded == operator to determine if 2 sets are equal.
_returns: True if the two comparison sets have the same number of elements, and
 all of the elements of set s1 are contained in s2._
#### op_Explicit
If the Set is created by casting an array to it, add the members of
 the array through the Add method, so if the array has dupes an error
 will occur.
_returns: A new Set object based on the members of the array._
#### op_Inequality
Overloaded != operator to determine if 2 sets are unequal.
_returns: True if the two comparison sets fail the equality (==) test,
 false if the pass the equality test._
#### op_Subtraction
except(差集)集合运算：先将其中完全重复的数据行删除，再返回只在第一个集合中出现，在第二个集合中不出现的所有行。
_returns: _
#### Remove
Remove a member from the Set.
_returns: True if a member was removed, false if nothing was found that 
 was removed._
#### ToArray
Copies the members of the Set to an array of 
 Objects.
_returns: An Object array copies of the 
 elements of the Set_
#### ToArray``1
DirectCast
_returns: _
#### ToString
Returns a String that represents the current
 Set.
_returns: A String that represents the current
 Set._


### Properties

#### Item
Public accessor for the members of the Set.
#### Length
The number of members of the set.

