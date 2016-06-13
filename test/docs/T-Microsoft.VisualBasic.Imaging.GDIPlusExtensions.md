
# GDIPlusExtensions
_namespace: [Microsoft.VisualBasic.Imaging](N-Microsoft.VisualBasic.Imaging.md)_

GDI+

### Methods

#### CorpBlank
确定边界，然后进行剪裁

_returns: _
#### CreateGDIDevice
创建一个GDI+的绘图设备

_returns: _
#### GdiFromImage
无需处理图像数据，这个函数已经自动克隆了该对象，不会影响到原来的对象

_returns: _
#### GDIPlusDeviceHandleFromImageFile
从指定的文件之中加载GDI+设备的句柄

_returns: _
#### GetRawStream
将图片对象转换为原始的字节流

_returns: _
#### ImageAddFrame
Adding a frame box to the target image source.(为图像添加边框)

_returns: _
#### ImageCrop
图片剪裁小方块区域

_returns: _
#### LoadImage
Load image from a file and then close the file handle.
 (使用@"M:System.Drawing.Image.FromFile(System.String)"函数在加载完成图像到Dispose这段之间内都不会释放文件句柄，
 则使用这个函数则没有这个问题，在图片加载之后会立即释放掉文件句柄)

_returns: _
#### MeasureString
Measures the specified string when drawn with the specified System.Drawing.Font.

_returns: This method returns a System.Drawing.SizeF structure that represents the size,
 in the units specified by the System.Drawing.Graphics.PageUnit property, of the
 string specified by the text parameter as drawn with the font parameter.
 _
#### TrimRoundAvatar
图片剪裁为圆形的头像

_returns: _
#### Vignette
羽化

_returns: _



