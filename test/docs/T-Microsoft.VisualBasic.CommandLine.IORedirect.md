
# IORedirect
_namespace: [Microsoft.VisualBasic.CommandLine](N-Microsoft.VisualBasic.CommandLine.md)_

A communication fundation class type for the commandline program interop.
 (一个简单的用于从当前进程派生子进程的Wrapper对象，假若需要folk出来的子进程对象
 不需要终端交互功能，则更加推荐使用对象来进行调用)

### Methods

#### #ctor
Creates a wrapper for the CLI program operations.
 (在服务器上面可能会有一些线程方面的兼容性BUG的问题，不太清楚为什么会导致这样)
#### __detectProcessExit
检测目标子进程是否已经结束
#### __listenSTDOUT
输出目标子进程的标准输出设备的内容
#### GetError
Gets a used to read the error output of the application.
_returns: A  text value that read from the std_error of  
 that can be used to read the standard error stream of the application._
#### op_Implicit
在进行隐士转换的时候，假若可执行文件的文件路径之中含有空格，则这个时候应该要特别的小心
_returns: _
#### Run
线程会被阻塞在这里，直到外部应用程序执行完毕
_returns: _
#### Start
Gets the value that the associated process specified when it terminated.
_returns: The code that the associated process specified when it terminated._


### Properties

#### ProcessInfo
The process invoke interface of current IO redirect operation.
#### StandardOutput
Gets the standard output for the target invoke process.

