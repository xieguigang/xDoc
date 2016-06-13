
# Protocol
_namespace: [Microsoft.VisualBasic.Net.Protocols.Reflection](N-Microsoft.VisualBasic.Net.Protocols.Reflection.md)_

This attribute indicates the entry point of the protocol processor definition location and the details of the protocol processor.

### Methods

#### #ctor
Generates the @"T:Microsoft.VisualBasic.Net.Protocols.Reflection.ProtocolHandler" on the server side, this is using for initialize a protocol API entry point.(客户端上面的类型)
#### GetEntryPoint
This method is usually using for generates a details protocol processor, example is calling the method interface: @"T:Microsoft.VisualBasic.Net.Abstract.DataRequestHandler"
 Correspondent to the protocol entry property @"P:Microsoft.VisualBasic.Net.Protocols.RequestStream.Protocol"

_returns: _
#### GetProtocolCategory
This method is usually using for generates a @"T:Microsoft.VisualBasic.Net.Protocols.Reflection.ProtocolHandler" object.
 Correspondent to the protocol class property @"P:Microsoft.VisualBasic.Net.Protocols.RequestStream.ProtocolCategory"

_returns: _


### Properties

#### DeclaringType
这个属性对于方法而言为空，但是对于类型入口点而言则不为空
#### EntryPoint
Entry point for the data protocols, this property usually correspondent to the request stream's 
 property: @"P:Microsoft.VisualBasic.Net.Protocols.RequestStream.Protocol" and @"P:Microsoft.VisualBasic.Net.Protocols.RequestStream.ProtocolCategory"

