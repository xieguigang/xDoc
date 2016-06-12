
# TcpSynchronizationServicesSocket
_namespace: [Microsoft.VisualBasic.Net](N-Microsoft.VisualBasic.Net.md)_

Socket listening object which is running at the server side asynchronous able multiple threading.
 (运行于服务器端上面的Socket监听对象，多线程模型)

### Methods

#### #ctor
短连接socket服务端
#### BeginListen
函数返回Socket的注销方法
_returns: _
#### Dispose
Stop the server socket listening threads.(终止服务器Socket监听线程)
#### HandleRequest
All the data has been read from the client. Display it on the console.
 Echo the data back to the client.
#### IsServerInternalException
SERVER_INTERNAL_EXCEPTION，Server encounter an internal exception during processing
 the data request from the remote device.
 (判断是否服务器在处理客户端的请求的时候，发生了内部错误)
_returns: _
#### Run
This server waits for a connection and then uses asychronous operations to
 accept the connection, get data from the connected client,
 echo that data back to the connected client.
 It then disconnects from the client and waits for another client.(请注意，当服务器的代码运行到这里之后，代码将被阻塞在这里)
#### Send
Server reply the processing result of the request from the client.


### Properties

#### LocalPort
The server services listening on this local port.(当前的这个服务器对象实例所监听的本地端口号)
#### Responsehandler
This function pointer using for the data request handling of the data request from the client socket. 
 [Public Delegate Function DataResponseHandler(str As , RemoteAddress As ) As ]
 (这个函数指针用于处理来自于客户端的请求)

