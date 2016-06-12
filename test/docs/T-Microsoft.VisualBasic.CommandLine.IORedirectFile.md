
# IORedirectFile
_namespace: [Microsoft.VisualBasic.CommandLine](N-Microsoft.VisualBasic.CommandLine.md)_

Using this class object rather than is more encouraged.
 (假若所建立的子进程并不需要进行终端交互，相较于对象，更加推荐使用本对象类型来执行。
 似乎对象在创建一个子进程的时候的对象IO重定向的句柄的处理有问题，所以在这里构建一个更加简单的类型对象，
 这个IO重定向对象不具备终端交互功能)

### Methods

#### #ctor
Using this class object rather than is more encouraged if there is no console interactive with your folked process.
#### CopyRedirect
将目标子进程的标准终端输出文件复制到一个新的文本文件之中
_returns: _
#### Run
Start target child process and then wait for the child process exits. 
 So that the thread will be stuck at here until the sub process is 
 job done!
 (启动目标子进程，然后等待执行完毕并返回退出代码(请注意，在进程未执行完毕
 之前，整个线程会阻塞在这里))
_returns: _
#### Start
启动子进程，但是不等待执行完毕，当目标子进程退出的时候，回调函数句柄


### Properties

#### StandardOutput
目标子进程的终端标准输出

