
# APIEntryPoint
_namespace: [Microsoft.VisualBasic.CommandLine.Reflection.EntryPoints](N-Microsoft.VisualBasic.CommandLine.Reflection.EntryPoints.md)_

The entry point data of the commands in the command line which was original loaded 
 from the source meta data in the compiled target.
 (命令行命令的执行入口点)

### Methods

#### #ctor
Instance method can be initialize from this constructor.
 (假若目标方法为实例方法，请使用本方法进行初始化)
#### __directInvoke
记录错误信息的最上层的堆栈
_returns: _
#### DirectInvoke
不会自动调整补齐参数
_returns: _
#### EntryPointFullName
The full name path of the target invoked method delegate in the namespace library.
_returns: _
#### HelpInformation
Returns the help information details for this command line entry object.(获取本命令行执行入口点的详细帮助信息)
_returns: _
#### Invoke
Invoke this command line and returns the function value.
 (函数会补齐可选参数)
_returns: _
#### InvokeCLI
Invoke this command line but returns the function execute success, Zero for success and -1 for failure.
 (函数会补齐可选参数)
_returns: _


### Properties

#### EntryPoint
The reflection entry point in the assembly for the target method object.
#### InvokeOnObject
If the target invoked method delegate is a instance method, 
 then this property value should be the target object instance which has the method delegate.
 (假若目标方法不是共享的方法，则必须要使用本对象来进行Invoke的调用)
#### IsInstanceMethod
The shared method did not requires of the object instance.(这个方法是否为实例方法)

