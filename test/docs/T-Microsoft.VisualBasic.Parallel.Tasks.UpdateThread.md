
# UpdateThread
_namespace: [Microsoft.VisualBasic.Parallel.Tasks](N-Microsoft.VisualBasic.Parallel.Tasks.md)_

Running a specific in the background periodically.
 (比较适合用于在服务器上面执行周期性的计划任务)

### Methods

#### #ctor
Running a specific action in the background periodically. The time unit of the parameter is ms or Ticks.
#### Start
运行这条线程，假若更新线程已经在运行了，则会自动忽略这次调用
#### Stop
停止更新线程的运行


### Properties

#### ErrHandle
If this exception handler is null, then when the unhandled exception occurring,
 this thread object will throw the exception and then stop working.
#### Periods
ms
#### Running
指示当前的这个任务处理对象是否处于运行状态

