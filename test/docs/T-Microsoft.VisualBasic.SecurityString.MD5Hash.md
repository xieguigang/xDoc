
# MD5Hash
_namespace: [Microsoft.VisualBasic.SecurityString](N-Microsoft.VisualBasic.SecurityString.md)_



### Methods

#### GetFileHashString
Get the md5 hash calculation value for a specific file.(获取文件对象的哈希值，请注意，当文件不存在或者文件的长度为零的时候，会返回空字符串)
_returns: _
#### GetHashCode
Gets the hashcode of the input string.
_returns: _
#### SaltValue
SHA256 8 bits salt value for the private key.
_returns: _
#### StringToByteArray
由于md5是大小写无关的，故而在这里都会自动的被转换为小写形式，所以调用这个函数的时候不需要在额外的转换了
_returns: _
#### ToLong
CityHash algorithm for convert the md5 hash value as a value.
_returns: _
#### VerifyFile
校验两个文件的哈希值是否一致
_returns: _
#### VerifyMd5Hash
Verify a hash against a string.
_returns: _



