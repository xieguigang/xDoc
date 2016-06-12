
# Protocol
_namespace: [Microsoft.VisualBasic.Net.Protocols.Reflection](N-Microsoft.VisualBasic.Net.Protocols.Reflection.md)_

This attribute indicates the entry point of the protocol processor definition location and the details of the protocol processor.

### Methods

#### #ctor
Generates the on the server side, this is using for initialize a protocol API entry point.(客户端上面的类型)
#### GetEntryPoint
This method is usually using for generates a details protocol processor, example is calling the method interface: 
 Correspondent to the protocol entry property
_returns: _
#### GetProtocolCategory
This method is usually using for generates a object.
 Correspondent to the protocol class property
_returns: _


### Properties

#### DeclaringType
这个属性对于方法而言为空，但是对于类型入口点而言则不为空
#### EntryPoint
Entry point for the data protocols, this property usually correspondent to the request stream's 
 property: and

