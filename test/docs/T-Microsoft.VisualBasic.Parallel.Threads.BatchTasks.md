
# BatchTasks
_namespace: [Microsoft.VisualBasic.Parallel.Threads](N-Microsoft.VisualBasic.Parallel.Threads.md)_



### Methods

#### BatchTask``1
由于LINQ是分片段来执行的，当某个片段有一个线程被卡住之后整个进程都会被卡住，所以执行大型的计算任务的时候效率不太好，
 使用这个并行化函数可以避免这个问题，同时也可以自己手动控制线程的并发数
#### BatchTask``2

_returns: _



