
# SHA256
_namespace: [Microsoft.VisualBasic.SecurityString](N-Microsoft.VisualBasic.SecurityString.md)_

Derives a SHA256 key from a password using an extension of the PBKDF1 algorithm.

### Methods

#### #ctor

#### DecryptString
字符串的解密方法
_returns: _
#### EncryptData
Encrypt the plain text string.
_returns: _
#### GetDynamicsCertification
双重动态数据签名
_returns: _
#### GetDynamicsCertification``1
双重动态数据签名
_returns: _


### Properties

#### CertificateSigned
The previous key of the sha256 encryption will be expired after the rebuild of this module,
 so that this method is not working on the statics data storage job.
 (在本模块进行重新编译之后，原有的密匙将会失效，故这个属性不适合于静态存储加密使用)

