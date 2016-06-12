
# ProgramPathSearchTool
_namespace: [Microsoft.VisualBasic](N-Microsoft.VisualBasic.md)_

Search the path from a specific keyword.(通过关键词来推测路径)

### Methods

#### BaseName
Gets the name of the target file or directory, if the target is a file, then the name without the extension name.
 (获取目标文件夹的名称或者文件的不包含拓展名的名称)
_returns: _
#### BranchRule
商标搜索规则
_returns: _
#### DirectoryExists
Determine that the target directory is exists on the file system or not?(判断文件夹是否存在)
_returns: _
#### FileExists
Check if the target file object is exists on your file system or not.(这个函数也会自动检查目标参数是否为空)
_returns: _
#### FileOpened
Check if the file is opened by other code?(检测文件是否已经被其他程序打开使用之中)
_returns: _
#### GetDirectoryFullPath
Gets the full path of the specific directory.
_returns: _
#### GetFile

_returns: _
#### GetFullPath
Gets the full path of the specific file.(为了兼容Linux，这个函数会自动替换路径之中的\为/符号)
_returns: _
#### GetJustFileName
只有文件名称，没有拓展名
_returns: _
#### LoadEntryList
允许有重复的数据
_returns: _
#### LoadSourceEntryList
可以使用本方法生成Entry列表；（在返回的结果之中，KEY为文件名，没有拓展名，VALUE为文件的路径）
 请注意，这个函数会搜索目标文件夹下面的所有的文件夹的
_returns: _
#### Long2Short
假设文件名过长发生在文件名和最后一个文件夹的路径之上
_returns: _
#### NormalizePathString
将目标字符串之中的非法的字符替换为"_"符号以成为正确的文件名字符串
_returns: _
#### ParentDirName
Gets the name of the file's parent directory, returns value is a name, not path.
 (获取目标文件的父文件夹的文件夹名称，是名称而非路径)
_returns: _
#### ParentPath
这个函数是返回文件夹的路径而非名称，这个函数不依赖于系统的底层API，因为系统的底层API对于过长的文件名会出错
_returns: _
#### PathIllegal
File path illegal?
_returns: _
#### RelativePath
Gets the relative path of file system object reference to the directory path .
 (请注意，所生成的相对路径之中的字符串最后是没有文件夹的分隔符\或者/的)
_returns: _
#### SafeCopyTo
进行安全的复制，出现错误不会导致应用程序崩溃，大文件不推荐使用这个函数进行复制
_returns: _
#### SearchDirectory

_returns: _
#### SearchProgram
Invoke the search session for the program file using a specific keyword string value.(使用某个关键词来搜索目标应用程序)
_returns: _
#### SearchScriptFile

_returns: _
#### SourceCopy
将不同来源的文件复制到目标文件夹之中
_returns: 返回失败的文件列表_
#### ToFileURL
Gets the URL type file path.(获取URL类型的文件路径)
_returns: _
#### TrimDIR
Removes the last \ and / character in a directory path string.
 (使用这个函数修剪文件夹路径之中的最后一个分隔符，以方便生成文件名)
_returns: _
#### TrimFileExt
Removes the file extension name from the file path.(去除掉文件的拓展名)
_returns: _



