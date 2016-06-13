
# App
_namespace: [Microsoft.VisualBasic](N-Microsoft.VisualBasic.md)_

Provides information about, and means to manipulate, the current environment Application information collection.
 (More easily runtime environment information provider on @"F:System.PlatformID.Unix"/LINUX platform for visualbasic program.)

### Methods

#### __completeCLI
自动停止GC当前程序的线程

_returns: _
#### __GCThreadInvoke
自动垃圾回收线程
#### __getTEMP
由于可能会运行多个使用本模块的进程，单独考哈希来作为表示会产生冲突，所以这里使用应用程序的启动时间戳以及当前的哈希值来生成唯一标示

_returns: _
#### __sysTEMP
@"M:Microsoft.VisualBasic.FileIO.FileSystem.GetParentPath(System.String)"(@"M:Microsoft.VisualBasic.FileIO.FileSystem.GetTempFileName")
 当临时文件夹被删除掉了的时候，会出现崩溃。。。。所以弃用改用读取环境变量

_returns: _
#### BugsFormatter
Generates the formatted error log file content.(生成简单的日志板块的内容)

_returns: _
#### CLICode
IF the flag is True, that means cli API execute successfully, function returns ZERO, or a negative integer(Default -100) for failures.

_returns: _
#### ElapsedMilliseconds
The distance of time that this application running from start and to current time.
 (当前距离应用程序启动所逝去的时间)

_returns: _
#### Exit
Terminates this @"T:System.Diagnostics.Process" and gives the underlying operating system the specified exit code.
 (这个方法还会终止本应用程序里面的自动GC线程)
#### GenerateTemp


_returns: _
#### GetAppSysTempFile
Get temp file name in app system temp directory.

_returns: _
#### GetProductSharedDIR
使用@"P:Microsoft.VisualBasic.App.ProductSharedDIR"的位置会变化的，则使用本函数则会使用获取当前的模块的文件夹，即使其不是exe程序而是一个dll文件

_returns: _
#### GetProductSharedTemp
Gets a temp file name which is located at directory @"P:Microsoft.VisualBasic.App.ProductSharedDIR".
 (获取位于共享文件夹@"P:Microsoft.VisualBasic.App.ProductSharedDIR"里面的临时文件)

_returns: _
#### GetTempFile
Creates a uniquely named zero-byte temporary file on disk and returns the full
 path of that file.

_returns: _
#### LogException
This is the custom message of the exception, not extract from the function @"M:System.Exception.ToString"

_returns: _
#### RunCLI
Running the string as a cli command line.(请注意，在调试模式之下，命令行解释器会在运行完命令之后暂停，而Release模式之下则不会。
 假若在调试模式之下发现程序有很长一段时间处于cpu占用为零的静止状态，则很有可能已经运行完命令并且等待回车退出)

_returns: Returns the function execute result to the operating system._
#### SelfFolk
Self call this program itself for batch parallel task calculation.
 (调用自身程序，这个通常是应用于批量的数据的计算任务的实现)

_returns: _
#### SelfFolks
Folk this program itself for the large amount data batch processing.

_returns: 返回任务的执行的总时长_
#### StartGC
Start the automatic garbage collection threads.
 (这条线程只会自动清理*.tmp临时文件，因为假若不清理临时文件的话，有时候临时文件比较多的时候，会严重影响性能，甚至无法运行应用程序框架里面的IO重定向操作)
#### StopGC
Stop the automatic garbage collection threads.
#### TraceBugs
Function returns the file path of the application log file.
 (函数返回的是日志文件的文件路径)

_returns: _


### Properties

#### AppSystemTemp
Application temp data directory in the system temp root: %@"P:Microsoft.VisualBasic.App.SysTemp"%/@"P:Microsoft.VisualBasic.App.AssemblyName"
#### AssemblyName
Gets the name, without the extension, of the assembly file for the application.
#### Command
Returns the argument portion of the @"T:Microsoft.VisualBasic.CommandLine.CommandLine" used to start Visual Basic or
 an executable program developed with Visual Basic. The My feature provides greater
 productivity and performance than the @"M:Microsoft.VisualBasic.Interaction.Command" function. For more information,
 see @"P:Microsoft.VisualBasic.ApplicationServices.ConsoleApplicationBase.CommandLineArgs".
#### CommandLine
Gets the command-line arguments for this @"T:System.Diagnostics.Process".
#### CurrentDirectory
The currrent working directory of this application.(应用程序的当前的工作目录)
#### Desktop
Gets a path name pointing to the Desktop directory.
#### ExceptionLogFile
@"P:Microsoft.VisualBasic.App.LocalData"/error.log
#### ExecutablePath
The file path of the current running program executable file.(本应用程序的可执行文件的文件路径)
#### HOME
The program directory of the current running program.
#### LocalData
The local data dir of the application in the %user%/<CurrentUser>/Local/Product/App
#### LocalDataTemp
The temp directory in the application local data.
#### LogErrDIR
Error default log fie location from function @"M:Microsoft.VisualBasic.App.LogException(System.Exception,System.String)".(存放自动存储的错误日志的文件夹)
#### PID
Get the @"T:System.Diagnostics.Process" id(PID) of the current program process.
#### Process
Gets a new @"T:System.Diagnostics.Process" component and associates it with the currently active process.
#### ProductProgramData
The repository root of the product application program data.
#### ProductSharedDIR
The shared program data directory for a group of app which have the same product series name.
 (同一產品程序集所共享的數據文件夾)
#### StartTime
The time tag of the application started.(应用程序的启动的时间)
#### StartupDirectory
Gets the path for the executable file that started the application, not including the executable name.
#### SysTemp
The directory path of the system temp data.
#### userHOME
Getting the path of the home directory
#### Version
Gets the product version associated with this application.

