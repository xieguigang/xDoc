
# TCPExtensions
_namespace: [Microsoft.VisualBasic.Net](N-Microsoft.VisualBasic.Net.md)_



### Methods

#### ConnectSocket
假若不能成功的建立起连接的话，则会抛出错误

_returns: _
#### GetFirstAvailablePort
Get the first available TCP port on this local machine.
 (获取第一个可用的端口号，请注意，在高并发状态下可能会出现端口被占用的情况，
 所以这时候建议将**BEGIN_PORT**设置为-1，则本函数将会尝试使用随机数来分配可用端口，从而避免一些系统崩溃的情况产生)

_returns: _
#### Ping
-1 ping failure

_returns: _
#### PortIsAvailable
检查指定端口是否已用

_returns: _
#### PortIsUsed
获取操作系统已用的端口号

_returns: _



