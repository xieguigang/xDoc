
# ColorCube
_namespace: [Microsoft.VisualBasic.Imaging](N-Microsoft.VisualBasic.Imaging.md)_

Describes the RGB color space as a 3D cube with the origin at Black.

### Methods

#### Compare
Compares two colors according to their distance from the origin of the cube (black).
_returns: _
#### GetBrightness
Returns an integer between 0 and 255 indicating the perceived brightness of the color.
_returns: An integer indicating the brightness with 0 being dark and 255 being bright._
#### GetColorFrom
Gets a color from within the cube starting at the specified location and moving a given distance in the specified direction.
_returns: The color within the cube at the given distance in the specified direction._
#### GetColorsAround
Creates an array of colors from a selection within a sphere around the specified color.
_returns: An array of colors located around the specified color within the cube._
#### GetColorSequence
Creates an array of colors in a gradient sequence between two specified colors.
_returns: A gradient array of colors._
#### GetColorSpectrum
Creates a rainbow array of colors by selecting from the edges of the cube in ROYGBIV order at the specified increment.
_returns: An array of colors in ROYGBIV order at the given increment._
#### GetDistance
Gets the distance between two colors within the cube.
_returns: The distance between the source and target colors._
#### GetHSL
Converts a RGB color into its Hue, Saturation, and Luminance (HSL) values.
_returns: The HSL representation of the color._



