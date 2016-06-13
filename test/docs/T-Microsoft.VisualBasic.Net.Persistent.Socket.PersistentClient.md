
# PersistentClient
_namespace: [Microsoft.VisualBasic.Net.Persistent.Socket](N-Microsoft.VisualBasic.Net.Persistent.Socket.md)_

请注意，这个对象是应用于客户端与服务器保持长连接所使用，并不会主动发送消息给服务器，而是被动的接受服务器的数据请求

### Methods

#### #ctor

#### __send
????
 An exception of type 'System.Net.Sockets.SocketException' occurred in System.dll but was not handled in user code
 Additional information: A request to send or receive data was disallowed because the socket is not connected and
 (when sending on a datagram socket using a sendto call) no address was supplied
#### BeginConnect
函数会想服务器上面的socket对象一样在这里发生阻塞
#### ConnectCallback
Retrieve the socket from the state object.
#### readDataBuffer
Read data from the remote device.

_returns: _
#### Receive
An exception of type '@"T:System.Net.Sockets.SocketException"' occurred in System.dll but was not handled in user code
 Additional information: A request to send or receive data was disallowed because the socket is not connected and
 (when sending on a datagram socket using a sendto call) no address was supplied
#### ReceiveCallback
Retrieve the state object and the client socket from the asynchronous state object.


### Properties

#### OnServerHashCode
本客户端socket在服务器上面的哈希句柄值
#### RemoteServerShutdown
远程主机强制关闭连接之后触发这个动作

