
# WebServiceUtils
_namespace: [Microsoft.VisualBasic](N-Microsoft.VisualBasic.md)_

The extension module for web services works.

### Methods

#### BuildArgvs


_returns: _
#### BuildReqparm
Build the request parameters for the HTTP POST

_returns: _
#### CopyStream
Download stream data from the http response.

_returns: _
#### DownloadFile
download the file from **strUrl** to **save[local file]**.

_returns: _
#### GenerateDictionary
Create a parameter dictionary from the request parameter tokens.
 (请注意，字典的key默认为转换为小写的形式)

_returns: _
#### GET
Get the html page content from a website request or a html file on the local filesystem.(同时支持http位置或者本地文件)

_returns: _
#### Get_href
Gets the link text in the html fragement text.

_returns: _
#### GetDownload
使用GET方法下载文件

_returns: _
#### GetMyIPAddress
获取我的公网IP地址，假若没有连接互联网的话则会返回局域网IP地址

_returns: _
#### GetRequest
GET http request

_returns: _
#### GetRequestRaw


_returns: _
#### GetValue
获取两个尖括号之间的内容

_returns: _
#### ImageSource
Parsing image source url from the img html tag.

_returns: _
#### IsSocketPortOccupied
Only one usage of each socket address (protocol/network address/port) Is normally permitted

_returns: _
#### isURL
Determine that is this uri string is a network location?
 (判断这个uri字符串是否是一个网络位置)

_returns: _
#### postRequestParser
假若你的数据之中包含有SHA256的加密数据，则非常不推荐使用这个函数进行解析。因为请注意，这个函数会替换掉一些转义字符的，所以会造成一些非常隐蔽的BUG

_returns: _
#### requestParser
不像@"M:Microsoft.VisualBasic.WebServiceUtils.postRequestParser(System.String,System.Boolean)"函数，这个函数不会替换掉转义字符，并且所有的Key都已经被默认转换为小写形式的了

_returns: _
#### TrimHTMLTag
Removes the html tags from the text string.

_returns: _
#### TrimResponseTail
有些时候后面可能会存在多余的vbCrLf，则使用这个函数去除

_returns: _
#### UrlPathEncode
编码整个URL

_returns: _


### Properties

#### Protocols
Web protocols enumeration

