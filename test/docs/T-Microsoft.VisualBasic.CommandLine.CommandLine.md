
# CommandLine
_namespace: [Microsoft.VisualBasic.CommandLine](N-Microsoft.VisualBasic.CommandLine.md)_

A command line object that parse from the user input commandline string.
 (从用户所输入的命令行字符串之中解析出来的命令行对象，标准的命令行格式为：
 ==<EXE> <CLI_Name> ["Parameter" "Value"]==)

### Methods

#### CheckMissingRequiredParameters
Checking for the missing required parameter, this function will returns the missing parameter
 in the current cli command line object using a specific parameter name list.
 (检查**list**之中的所有参数是否存在，函数会返回不存在的参数名)

_returns: _
#### Contains
只是通过比较名称来判断是否存在，值没有进行比较

_returns: _
#### ContainsParameter
大小写不敏感，

_returns: _
#### GetBoolean
Gets the value Of the specified column As a Boolean.
 (这个函数也同时包含有开关参数的，开关参数默认为逻辑值类型，当包含有开关参数的时候，其逻辑值为True，反之函数会检查参数列表，参数不存在则为空值字符串，则也为False)

_returns: _
#### GetByte
Gets the 8-bit unsigned Integer value Of the specified column.

_returns: _
#### GetBytes
Reads a stream Of bytes from the specified column offset into the buffer As an array, starting at the given buffer offset.

_returns: _
#### GetChar
Gets the character value Of the specified column.

_returns: _
#### GetChars
Reads a stream Of characters from the specified column offset into the buffer As an array, starting at the given buffer offset.

_returns: _
#### GetCommandsOverview
Gets the brief summary information of current cli command line object.(获取当前的命令行对象的参数摘要信息)

_returns: _
#### GetDateTime
Gets the Date And time data value Of the specified field.

_returns: _
#### GetDecimal
Gets the fixed-position numeric value Of the specified field.

_returns: _
#### GetDouble
Gets the Double-precision floating point number Of the specified field.

_returns: _
#### GetEnumerator
这个枚举函数也会将开关给包含进来，与@"M:Microsoft.VisualBasic.CommandLine.CommandLine.GetValueArray"方法所不同的是，这个函数里面的逻辑值开关的名称没有被修饰剪裁

_returns: _
#### GetFloat
Gets the Single-precision floating point number Of the specified field.

_returns: _
#### GetGuid
Returns the GUID value Of the specified field.

_returns: _
#### GetInt16
Gets the 16-bit signed Integer value Of the specified field.

_returns: _
#### GetInt32
Gets the 32-bit signed Integer value Of the specified field.

_returns: _
#### GetInt64
Gets the 64-bit signed Integer value Of the specified field.

_returns: _
#### GetObject``1


_returns: _
#### GetOrdinal
Return the index Of the named field. If the name is not exists in the parameter list, then a -1 value will be return.

_returns: _
#### GetString
Gets the String value Of the specified field.

_returns: _
#### GetValue``1
If the given parameter is not exists in the user input arguments, then a developer specific default value will be return.

_returns: _
#### GetValueArray
ToArray拓展好像是有BUG的，所以请使用这个函数来获取所有的参数信息，请注意，逻辑值开关的名称会被去掉前缀

_returns: _
#### HavebFlag
查看命令行之中是否存在某一个逻辑开关

_returns: _
#### IsNull
Return whether the specified field Is Set To null.

_returns: _
#### op_Addition
Open a handle for a file system object.

_returns: _
#### op_LessThanOrEqual
Gets the CLI parameter value.

_returns: _
#### op_Subtraction
Try get parameter value.

_returns: _
#### ToString
Returns the original cli command line argument string.(返回所传入的命令行的原始字符串)

_returns: _


### Properties

#### BoolFlags
对于参数而言，都是--或者-或者/或者\开头的，下一个单词为单引号或者非上面的字符开头的，例如/o <path>
 对于开关而言，与参数相同的其实符号，但是后面不跟参数而是其他的开关，通常开关用来进行简要表述一个逻辑值
#### CLICommandArgvs
Get the original command line string.(获取所输入的命令行对象的原始的字符串)
#### Count
Get the switch counts in this commandline object.(获取本命令行对象中的所定义的开关的数目)
#### IsNullOrEmpty
Does this cli command line object contains any parameter argument information.(查看本命令行参数对象之中是否存在有参数信息)
#### Item
开关的名称是不区分大小写的
#### Name
The command name that parse from the input command line.
 (从输入的命令行中所解析出来的命令的名称)
#### Parameters
The parameters in the commandline without the first token of the command name.
 (将命令行解析为词元之后去掉命令的名称之后所剩下的所有的字符串列表)
#### Tokens
The command tokens that were parsed from the input commandline.
 (从所输入的命令行之中所解析出来的命令参数单元)

