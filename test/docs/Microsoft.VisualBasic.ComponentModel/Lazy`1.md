# Lazy`1
_namespace: [Microsoft.VisualBasic.ComponentModel](<a href="#" onClick="load('/docs/Microsoft.VisualBasic.ComponentModel/index.md')"></a>)_

The layze loader.



### Methods

#### #ctor
```csharp
Microsoft.VisualBasic.ComponentModel.Lazy`1.#ctor(System.Func{`0})
```
Init this lazy loader with the data source handler.

|Parameter Name|Remarks|
|--------------|-------|
|Source|the data source handler.|



### Properties

#### _dataTask
the data source handler.
#### _outCache
The output result cache data.
#### Value
Get cache data if it exists, or the data will be loaded first.
