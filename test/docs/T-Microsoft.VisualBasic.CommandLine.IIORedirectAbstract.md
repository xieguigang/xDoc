
# IIORedirectAbstract
_namespace: [Microsoft.VisualBasic.CommandLine](N-Microsoft.VisualBasic.CommandLine.md)_



### Methods

#### Run
启动目标子进程，然后等待执行完毕并返回退出代码(请注意，在进程未执行完毕之前，整个线程会阻塞在这里)

_returns: _
#### Start
Start the target process. If the target invoked process is currently on the running state, 
 then this function will returns the -100 value as error code and print the warning 
 information on the system console.(启动目标进程)

_returns: 当发生错误的时候会返回错误代码，当当前的进程任然处于运行的状态的时候，程序会返回-100错误代码并在终端之上打印出警告信息_


### Properties

#### StandardOutput
Gets the standard output for the target invoke process.

