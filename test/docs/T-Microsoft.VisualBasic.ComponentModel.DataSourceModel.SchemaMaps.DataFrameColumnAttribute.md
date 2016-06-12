
# DataFrameColumnAttribute
_namespace: [Microsoft.VisualBasic.ComponentModel.DataSourceModel.SchemaMaps](N-Microsoft.VisualBasic.ComponentModel.DataSourceModel.SchemaMaps.md)_

Represents a column of certain data frames. The mapping between to schema is also can be represent by this attribute. 
 (也可以使用这个对象来完成在两个数据源之间的属性的映射，由于对于一些列名称的属性值缺失的映射而言，
 其是使用属性名来作为列映射名称的，故而在修改这些没有预设的列名称的映射属性的属性名的时候，请注意
 要小心维护这种映射关系)

### Methods

#### #ctor

#### LoadMapping
Load the mapping property, if the custom attribute 
 have no name value, then the property name will be used as the mapping name.
 (这个函数会自动给空名称值进行属性名的赋值操作的)
_returns: _
#### LoadMapping``1
没有名称属性的映射使用属性名来表述
_returns: _


### Properties

#### Index
Gets the index.
#### Name
Gets the name.

