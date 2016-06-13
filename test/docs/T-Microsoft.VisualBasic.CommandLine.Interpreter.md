
# Interpreter
_namespace: [Microsoft.VisualBasic.CommandLine](N-Microsoft.VisualBasic.CommandLine.md)_

Command line interpreter for your cli program.(命令行解释器，请注意，在调试模式之下，命令行解释器会在运行完命令之后暂停，而Release模式之下则不会。
 假若在调试模式之下发现程序有很长一段时间处于cpu占用为零的静止状态，则很有可能已经运行完命令并且等待回车退出)

### Methods

#### #ctor

#### __executeEmpty
命令行是空的

_returns: _
#### __getsAllCommands
导出所有符合条件的静态方法

_returns: _
#### __methodInvoke
The interpreter runs all of the command from here.(所有的命令行都从这里开始执行)

_returns: _
#### AddCommand
Add a command in current cli interpreter.(x向当前的这个CLI命令行解释器之中添加一个命令)
#### Clear
Clear the hash table of the cli command line interpreter command entry points.(清除本CLI解释器之中的所有的命令行执行入口点的哈希数据信息)
#### CreateEmptyCLIObject
Create an empty cli command line interpreter object which contains no commands entry.
 (创建一个没有包含有任何命令入口点的空的CLI命令行解释器)

_returns: _
#### CreateInstance
Create a new interpreter instance from a specific dll/exe path, this program assembly file should be a standard .NET assembly.
 (从一个标准的.NET程序文件之中构建出一个命令行解释器)

_returns: _
#### CreateInstance``1
Create a new interpreter instance using the specific type information.
 (使用所制定的目标类型信息构造出一个CLI命令行解释器)

_returns: _
#### Execute
Process the command option arguments of the main function:
 'Public Function Main(argvs As String()) As Integer
 '

_returns: _
#### ExistsCommand
The target command line command is exists in this cli interpreter using it name property?(判断目标命令行命令是否存在于本CLI命令行解释器之中)

_returns: _
#### GetAllCommands
导出所有符合条件的静态方法，请注意，在这里已经将外部的属性标记和所属的函数的入口点进行连接了

_returns: _
#### Help
Gets the help information of a specific command using its name property value.(获取某一个命令的帮助信息)

_returns: Error code, ZERO for no error_
#### ListPossible
列举出所有可能的命令

_returns: _
#### SDKdocs
Generate the sdk document for the target program assembly.(生成目标应用程序的命令行帮助文档，markdown格式的)

_returns: _
#### ToDictionary
Gets the dictionary data which contains all of the available command information in this assembly module.
 (获取从本模块之中获取得到的所有的命令行信息)

_returns: _


### Properties

#### Count
Gets the command counts in current cli interpreter.(返回本CLI命令行解释器之中所包含有的命令的数目)
#### ExecuteEmptyCli
Public Delegate Function __ExecuteEmptyCli() As Integer,
 (@"T:Microsoft.VisualBasic.CommandLine.__ExecuteEmptyCLI": 假若所传入的命令行是空的，就会执行这个函数指针)
#### ExecuteFile
Public Delegate Function __ExecuteFile(path As String, args As String()) As Integer,
 (@"T:Microsoft.VisualBasic.CommandLine.__ExecuteFile": 假若所传入的命令行的name是文件路径，解释器就会执行这个函数指针)
 这个函数指针一般是用作于执行脚本程序的
#### Item

#### ListCommandInfo
Returns the command entry info list array.
#### ListCommandsEntryName
List all of the command line entry point name which were contains in this cli interpreter.
 (列举出本CLI命令行解释器之中的所有的命令行执行入口点的名称)

