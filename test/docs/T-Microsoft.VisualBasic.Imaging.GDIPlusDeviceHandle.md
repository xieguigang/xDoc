
# GDIPlusDeviceHandle
_namespace: [Microsoft.VisualBasic.Imaging](N-Microsoft.VisualBasic.Imaging.md)_

GDI+ device handle for encapsulates a GDI+ drawing surface.(GDI+绘图设备句柄)

### Methods

#### CreateDevice


_returns: _
#### Dispose
Releases all resources used by this System.Drawing.Graphics.
#### DrawBézier
Draws a Bézier spline defined by four System.Drawing.Point structures.
#### DrawLine
Draws a line connecting two System.Drawing.Point structures.
#### DrawString
Draws the specified text string at the specified location with the specified
 System.Drawing.Brush and System.Drawing.Font objects.
#### MeasureString
Measures the specified string when drawn with the specified System.Drawing.Font.

_returns: This method returns a System.Drawing.SizeF structure that represents the size,
 in the units specified by the System.Drawing.Graphics.PageUnit property, of the
 string specified by the text parameter as drawn with the font parameter._
#### Save
将GDI+设备之中的图像数据保存到指定的文件路径之中，默认的图像文件的格式为PNG格式

_returns: _


### Properties

#### Center
在图象上面的中心的位置点
#### CompositingMode
Gets a value that specifies how composited images are drawn to this System.Drawing.Graphics.
#### CompositingQuality
Gets or sets the rendering quality of composited images drawn to this System.Drawing.Graphics.
#### DpiX
Gets the horizontal resolution of this System.Drawing.Graphics.
#### Graphics
GDI+ device handle.(GDI+绘图设备句柄)
#### ImageResource
GDI+ device handle memory.(GDI+设备之中的图像数据)
#### InterpolationMode
Gets or sets the interpolation mode associated with this System.Drawing.Graphics.
#### Size
Gets the width and height, in pixels, of this image.(图像的大小)

