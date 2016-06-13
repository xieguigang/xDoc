
# ProcExtensions
_namespace: [Microsoft.VisualBasic.CommandLine](N-Microsoft.VisualBasic.CommandLine.md)_

How to found the process by CLI

### Methods

#### Call


_returns: _
#### ExecSub
执行CMD命令
 Example:excuteCommand("ipconfig", "/all", AddressOf PrintMessage)
#### FindProc
这个主要是为了@"T:Microsoft.VisualBasic.CommandLine.IORedirectFile"对象进行相关进程的查找而设置的，
 对于@"T:Microsoft.VisualBasic.CommandLine.IORedirect"而言则直接可以从其属性@"P:Microsoft.VisualBasic.CommandLine.IORedirect.ProcessInfo"之中获取相关的进程信息

_returns: _
#### GetProc
Get process by command line parameter.(按照命令行参数来获取进程实例)

_returns: _



