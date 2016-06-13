
# RawStream
_namespace: [Microsoft.VisualBasic.Net.Protocols](N-Microsoft.VisualBasic.Net.Protocols.md)_

原始串流的基本模型，这个流对象应该具备有两个基本的方法：
 1. 从原始的字节流之中反序列化构造出自身的构造函数
 2. 将自身序列化为字节流的@"M:Microsoft.VisualBasic.Net.Protocols.ISerializable.Serialize"序列化方法

### Methods

#### #ctor
You should overrides this constructor to generate a stream object.(必须要有一个这个构造函数来执行反序列化)
#### GetRawStream``1
按照类型的定义进行反序列化操作

_returns: _
#### op_LessThanOrEqual


_returns: _
#### Serialize
@"M:Microsoft.VisualBasic.Net.Protocols.ISerializable.Serialize"序列化方法

_returns: _



