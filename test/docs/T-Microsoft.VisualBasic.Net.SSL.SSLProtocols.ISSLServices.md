
# ISSLServices
_namespace: [Microsoft.VisualBasic.Net.SSL.SSLProtocols](N-Microsoft.VisualBasic.Net.SSL.SSLProtocols.md)_

抽象SSL服务器

### Methods

#### Install



### Properties

#### CA
公共密匙
#### InstallCertificates
告诉SSL层如何安装数字证书
#### PrivateKeys
客户端的私有密匙
#### RaiseHandshakingEvent
有新的客户端请求进行连接
#### RefuseHandshake
对于某些应用出于安全性的考虑，会将这里设置为False，则服务器就会全部拒绝后面的所有的握手请求，只接受来自于从外部导入的用户证书的数据请求
#### ResponseHandler
处理私有密匙的数据请求

