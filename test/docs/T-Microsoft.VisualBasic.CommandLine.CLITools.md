
# CLITools
_namespace: [Microsoft.VisualBasic.CommandLine](N-Microsoft.VisualBasic.CommandLine.md)_



### Methods

#### Args
Gets the commandline object for the current program.
_returns: _
#### CreateParameterValues
Parsing parameters from a specific tokens.
 (从给定的词组之中解析出参数的结构)
_returns: _
#### Equals
请注意，这个是有方向性的，由于是依照参数1来进行比较的，假若args2里面的参数要多于第一个参数，但是第一个参数里面的所有参数值都可以被参数2完全比对得上的话，就认为二者是相等的
_returns: _
#### GetLogicSWs
Get all of the logical parameters from the input tokens
_returns: _
#### GetTokens
Try parse the argument tokens which comes from the user input commandline string. 
 (尝试从用户输入的命令行字符串之中解析出所有的参数)
_returns: _
#### IsPossibleLogicSW
Is this string tokens is a possible boolean value flag
_returns: _
#### Join
ReGenerate the cli command line argument string text.(重新生成命令行字符串)
_returns: _
#### TrimParamPrefix
修建命令行参数名称的前置符号
_returns: _
#### TryParse
尝试从输入的语句之中解析出词法单元，注意，这个函数不是处理从操作系统所传递进入的命令行语句
_returns: _



