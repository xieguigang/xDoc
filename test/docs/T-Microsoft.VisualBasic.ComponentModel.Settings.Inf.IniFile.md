
# IniFile
_namespace: [Microsoft.VisualBasic.ComponentModel.Settings.Inf](N-Microsoft.VisualBasic.ComponentModel.Settings.Inf.md)_

Ini file I/O handler

### Methods

#### #ctor
Open a ini file handle.
#### GetPrivateProfileString
为初始化文件中指定的条目取得字串

_returns: 
 Long，复制到lpReturnedString缓冲区的字节数量，其中不包括那些NULL中止字符。如lpReturnedString
 缓冲区不够大，不能容下全部信息，就返回nSize-1（若lpApplicationName或lpKeyName为NULL，则返回nSize-2）
 _
#### WritePrivateProfileString
Write a string value into a specific section in a specifc ini profile.(在初始化文件指定小节内设置一个字串)

_returns: Long，非零表示成功，零表示失败。会设置@"M:Microsoft.VisualBasic.Win32.GetLastErrorAPI.GetLastError"_



