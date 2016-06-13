
# MessagePushServer
_namespace: [Microsoft.VisualBasic.Net.Persistent.Application](N-Microsoft.VisualBasic.Net.Persistent.Application.md)_

长连接模式的消息推送服务器

### Methods

#### #ctor

#### __requestHandlerInterface
只要是为ssl服务设置的

_returns: _
#### __sendMessage


_returns: _
#### __usrInvokeSend
用户客户端请求发送消息至指定编号的用户的终端之上

_returns: _
#### AcceptClient
建立一个新的连接
#### DisconnectUser
Disconnect user persistent connection who have the specific **user_id** from this server.
 (断开服务器与用户客户端的长连接)
#### RemoveFreeConnections
哈希值不存在于现有的登录用户列表之中就是空闲连接
#### SendMessage



### Properties

#### LocalPort
从这个端口号进行登录（协同长连接的socket正常工作的socket的端口号，可以看作为UserAPI）
#### UidMappings
将外部编号映射为内部的客户端句柄
 假若找不到，请返回-1

