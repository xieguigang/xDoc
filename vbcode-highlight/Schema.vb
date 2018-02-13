Imports System.Drawing
Imports System.Xml.Serialization
Imports Microsoft.VisualBasic.Imaging
Imports Microsoft.VisualBasic.Language.Default
Imports Microsoft.VisualBasic.MIME.Markup.HTML.CSS

''' <summary>
''' The theme XML model of the code color schema
''' </summary>
Public Class Schema

    Public Property keyword As String
    Public Property identifier As String
    Public Property XmlComment As String
    Public Property comments As String
    Public Property typeName As String
    Public Property background As String
    Public Property [string] As String
    Public Property font As CSSFont

    <XmlAttribute("theme-name")>
    Public Property ThemeName As String

    ''' <summary>
    ''' 
    ''' </summary>
    ''' <returns></returns>
    Public Shared Function VisualStudioDefault() As DefaultValue(Of Schema)
        Return New Schema With {
            .background = "white",
            .comments = "#008000",
            .XmlComment = "#808080",
            .identifier = "black",
            .typeName = "#2b91af",
            .[string] = "#a31515",
            .keyword = "#0000ff",
            .font = New CSSFont With {
                .family = FontFace.Consolas,
                .size = 11,
                .style = FontStyle.Regular
            }
        }
    End Function
End Class
