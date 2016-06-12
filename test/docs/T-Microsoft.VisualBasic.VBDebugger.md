
# VBDebugger
_namespace: [Microsoft.VisualBasic](N-Microsoft.VisualBasic.md)_

Debugger helper module for VisualBasic Enterprises System.

### Methods

#### __DEBUG_ECHO
Output the full debug information while the project is debugging in debug mode.
 (向标准终端和调试终端输出一些带有时间戳的调试信息)
_returns: 其实这个函数是不会返回任何东西的，只是因为为了Linq调试输出的需要，所以在这里是返回Nothing的_
#### Assertion
If is false(means this assertion test failure), then throw exception.
#### Echo
Alias for
#### LinqProc``1
当在执行大型的数据集合的时候怀疑linq里面的某一个任务进入了死循环状态，可以使用这个方法来检查是否如此
_returns: _
#### PrintException
可以使用这个方法.获取得到所需要的参数信息
_returns: _
#### PrintException``1
The function will print the exception details information on the standard , console, and system console.
 (分别在标准终端，调试终端，系统调试终端之中打印出错误信息，请注意，函数会直接返回False可以用于指定调用者函数的执行状态，这个函数仅仅是在终端上面打印出错误，不会保存为日志文件)
#### Warning
Display the wraning level(YELLOW color) message on the console.
_returns: _


### Properties

#### Mute
Disable the debugger information outputs on the console if this property is set to True, 
 and enable the output if this property is set to False. 
 NOTE: this debugger option property can be overrides by the debugger parameter from the CLI parameter named '--echo'

