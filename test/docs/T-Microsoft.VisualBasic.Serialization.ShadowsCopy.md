
# ShadowsCopy
_namespace: [Microsoft.VisualBasic.Serialization](N-Microsoft.VisualBasic.Serialization.md)_



### Methods

#### __shadowsCopy
递归使用的，基本数据类型直接复制，引用类型则首先创建一个新的对象，在对该对象进行递归复制，假若目标对象没有可用的无参数的构造函数，则直接赋值

_returns: _
#### ShadowCopy``1
请使用这个函数来对CSV序列化的对象进行浅拷贝。将**source**之中的第一层的属性值拷贝到**target**对应的属性值之中，然后返回**target**

_returns: _
#### ShadowCopy``2
将第一层的属性值从基本类复制给继承类

_returns: _
#### ShadowsCopy
将目标对象之中的属性按值复制

_returns: _
#### ShadowsCopy``1
将目标对象之中的属性按值复制

_returns: _



