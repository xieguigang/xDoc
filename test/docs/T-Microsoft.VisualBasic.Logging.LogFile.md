
# LogFile
_namespace: [Microsoft.VisualBasic.Logging](N-Microsoft.VisualBasic.Logging.md)_

日志文件记录模块.

### Methods

#### #ctor

#### Save
日志文件在保存的时候默认是追加的方式
_returns: _
#### SaveLog
在进行保存的时候会清空内存之中的现有日志数据
#### SystemInfo
给出用于调试的系统的信息摘要
_returns: _
#### WriteLine



### Properties

#### ColorfulOutput
是否采用彩色的输出，默认为关闭：
 一般的消息 - 白色; 
 警告级别的消息 - 黄色; 
 错误级别的消息 - 红色
#### FileName
没有路径名称和拓展名，仅包含有单独的文件名
#### Mute
当这个设置为真之后，终端就不会再有任何的输出了
#### NowTimeNormalizedString
将时间字符串里面的":"符号去除之后，剩余的字符串可以用于作为路径来使用
#### SuppressError
Indicated that write the Error type message to the console screen, this 
 property will override the WriteToScreen parameter in function when the 
 message type is Error type.
#### SuppressWarns
Indicated that write the Warn type message to the console screen, this 
 property will override the WriteToScreen parameter in function when the 
 message type is Warn type.

