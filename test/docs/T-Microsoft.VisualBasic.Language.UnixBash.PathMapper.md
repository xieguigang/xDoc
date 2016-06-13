
# PathMapper
_namespace: [Microsoft.VisualBasic.Language.UnixBash](N-Microsoft.VisualBasic.Language.UnixBash.md)_

这个模块是将Linux路径映射为Windows路径的

### Methods

#### GetMapPath
Map linux path on Windows:
 [~ -> C:\User\<user_name>]
 [# -> @"P:Microsoft.VisualBasic.App.HOME"]
 [/ -> C:\]
 [/usr/bin -> C:\Program Files\]
 [/usr -> C:\User\]
 [- -> @"P:Microsoft.VisualBasic.App.PreviousDirectory"]

_returns: _
#### HOME
Get user home folder

_returns: _


### Properties

#### platform
Gets a System.PlatformID enumeration value that identifies the operating system
 platform.

