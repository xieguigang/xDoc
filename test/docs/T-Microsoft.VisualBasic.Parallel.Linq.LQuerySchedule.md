﻿
# LQuerySchedule
_namespace: [Microsoft.VisualBasic.Parallel.Linq](N-Microsoft.VisualBasic.Parallel.Linq.md)_

Parallel Linq query library for VisualBasic.
 (用于高效率执行批量查询操作和用于检测操作超时的工具对象，请注意，为了提高查询的工作效率，请尽量避免在查询操作之中生成新的临时对象
 并行版本的LINQ查询和原始的线程操作相比具有一些性能上面的局限性)

### Methods

#### AutoConfig
假如小于0，则认为是自动配置，0被认为是单线程，反之直接返回

_returns: _
#### LQuery``2
将大量的短时间的任务进行分区，合并，然后再执行并行化

_returns: _


### Properties

#### CPU_NUMBER
Get the number of processors on the current machine.(获取当前的系统主机的CPU核心数)
#### Recommended_NUM_THREADS
The possible recommended threads of the linq based on you machine processors number, i'm not sure...

