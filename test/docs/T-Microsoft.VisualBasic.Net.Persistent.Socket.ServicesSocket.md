
# ServicesSocket
_namespace: [Microsoft.VisualBasic.Net.Persistent.Socket](N-Microsoft.VisualBasic.Net.Persistent.Socket.md)_



### Methods

#### #ctor
消息处理的方法接口： Public Delegate Function DataResponseHandler(str As String, RemotePort As Integer) As String
#### __initSocket
Bind the socket to the local endpoint and listen for incoming connections.
#### __initSocketThread
Create the state object for the async receive.
#### AcceptCallback
Get the socket that handles the client request.
#### Dispose
Stop the server socket listening threads.(终止服务器Socket监听线程)
#### Run
This server waits for a connection and then uses asychronous operations to
 accept the connection, get data from the connected client,
 echo that data back to the connected client.
 It then disconnects from the client and waits for another client.(请注意，当服务器的代码运行到这里之后，代码将被阻塞在这里)


### Properties

#### LocalPort
The server services listening on this local port.(当前的这个服务器对象实例所监听的本地端口号)

