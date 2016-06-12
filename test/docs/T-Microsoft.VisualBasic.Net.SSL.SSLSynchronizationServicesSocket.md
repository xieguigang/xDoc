
# SSLSynchronizationServicesSocket
_namespace: [Microsoft.VisualBasic.Net.SSL](N-Microsoft.VisualBasic.Net.SSL.md)_



### Methods

#### #ctor

#### Install
If the property of is set to TRUE, then no more new client can be connect to this server object.
 The only way to add new client on this server is using this function to imports the client's certificates direct manually.
 (假若ssl层关闭了握手协议，则不可能会再有新的客户端可以连接到这个服务器上面了，则这个时候就可以使用这个方法来手工的为新的客户端导入数字证书，从而可以只接受指定的客户端的连接操作
 假若是证书同步操作的话，则可以将app授权证书通过这个方法导入到服务器模块接收主节点的证书同步操作)
_returns: _
#### Run
This server waits for a connection and then uses asychronous operations to
 accept the connection, get data from the connected client,
 echo that data back to the connected client.
 It then disconnects from the client and waits for another client.(请注意，当服务器的代码运行到这里之后，代码将被阻塞在这里)
#### WaitForStart
等待底层socket成功进入监听模式


### Properties

#### CA
这个数字证书是当前版本下的服务器的客户端的数字签名，服务器会使用这个证书来验证客户端的文件是否被恶意破解，相当于公有密匙
#### ISSLServices_InstallCertificates
生成证书的方法
#### LocalPort
底层工作socket所监听的端口号
#### PrivateKeys
A table stores the certificates of the current connected clients on this server.
 (连接上来的客户端的私有证书列表)
#### RaiseHandshakingEvent
客户端和服务器握手之后触发这个动作
#### RefuseHandshake
Does this ssl server accepts the handshaking from the user client or just allow the client connect to this server from manual imports their certificates by using method
#### Responsehandler
: 
 Public Delegate Function (CA As , request As , 
 RemoteAddress As ) As

