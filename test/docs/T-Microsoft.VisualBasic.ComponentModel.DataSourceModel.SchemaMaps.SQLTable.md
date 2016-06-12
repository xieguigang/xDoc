
# SQLTable
_namespace: [Microsoft.VisualBasic.ComponentModel.DataSourceModel.SchemaMaps](N-Microsoft.VisualBasic.ComponentModel.DataSourceModel.SchemaMaps.md)_

SQL之中的一个数据表的抽象描述接口

### Methods

#### GetDeleteSQL
DELETE FROM table_name WHERE field = value;
_returns: _
#### GetInsertSQL
INSERT INTO table_name (field1, field2,...) VALUES (value1, value2,....)
_returns: _
#### GetUpdateSQL
UPDATE table_name SET field = <new value> WHERE field = <value>
_returns: _
#### ToString
Display the INSERT INTO sql from function .
_returns: _



