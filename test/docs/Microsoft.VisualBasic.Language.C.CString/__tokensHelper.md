# __tokensHelper
_namespace: <a href="#" onClick="load('/docs/Microsoft.VisualBasic.Language.C.CString/index.md')">Microsoft.VisualBasic.Language.C.CString</a>_





### Methods

#### StrTok
```csharp
Microsoft.VisualBasic.Language.C.CString.__tokensHelper.StrTok(System.String,System.String)
```
This method simulates the classic C string function 'strtok' (and 'wcstok').
 Note that the .NET string 'Split' method cannot be used to simulate 'strtok' since
 it doesn't allow changing the delimiters between each token retrieval.

|Parameter Name|Remarks|
|--------------|-------|
|stringtotokenize|-|
|delimiters|-|



