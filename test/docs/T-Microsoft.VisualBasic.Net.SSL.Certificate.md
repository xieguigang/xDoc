
# Certificate
_namespace: [Microsoft.VisualBasic.Net.SSL](N-Microsoft.VisualBasic.Net.SSL.md)_

应用程序的完整性验证和用户身份的验证

### Methods

#### #ctor
这个构造函数不再计算哈希值而是直接初始化
#### Decrypt

_returns: _
#### Encrypt
函数会根据uid的值来设定协议为私有密匙还是公共密匙
_returns: _
#### Install

_returns: _
#### PublicEncrypt
强制将协议设定为公共密匙加密
_returns: _


### Properties

#### AppDomain
检查应用程序的完整性
#### hash
与属性所不同的是，这个属性是的哈希值，
 通常这个哈希值在请求resultful WebAPI的时候用来作为用户的唯一标识
#### PrivateKey
私有密匙
#### uid
计算出来的哈希值只能为负数，现在约定，当这个属性为0的时候就认为这个证书是公共密匙，
 这个一般是使用用户的账号所计算出来的哈希值

