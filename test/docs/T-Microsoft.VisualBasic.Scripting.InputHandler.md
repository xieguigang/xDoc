
# InputHandler
_namespace: [Microsoft.VisualBasic.Scripting](N-Microsoft.VisualBasic.Scripting.md)_

转换从终端或者脚本文件之中输入的字符串的类型的转换

### Methods

#### CanbeHandle
主要为了方便减少脚本编程模块的代码
_returns: _
#### CastArray``1
The parameter should implements a interface on the type. and then DirectCast object to target type.
_returns: _
#### CTypeDynamic
Converts a string expression which was input from the console or script file to the specified type.
 (请注意，函数只是转换最基本的数据类型，转换错误会返回空值)
_returns: An object whose type at run time is the requested target type._
#### CTypeDynamic``1
Converts a string expression which was input from the console or script file to the specified type.
 (请注意，函数只是转换最基本的数据类型，转换错误会返回空值)
_returns: An object whose type at run time is the requested target type._
#### DirectCast

_returns: _
#### GetType
类型获取失败会返回空值，大小写不敏感
_returns: _
#### IsPrimitive
Does this type can be cast from the type?(目标类型能否由字符串转换过来??)
_returns: _
#### ToString
, 出现错误的时候总是会返回空字符串的
_returns: _
#### UpdateHandle
Dynamics updates the capability of function , 
 and


### Properties

#### CasterString
Object为字符串类型，这个字典可以讲字符串转为目标类型
#### String
information for type from GetType operator
#### TypeNames
键值都是小写的

