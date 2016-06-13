
# Extensions
_namespace: [Microsoft.VisualBasic.Linq](N-Microsoft.VisualBasic.Linq.md)_

Linq Helpers.(为了方便编写Linq代码而构建的一个拓展模块)

### Methods

#### CopyVector``1
Copy **source** **n** times to construct a new vector.

_returns: An array consist of source with n elements._
#### MatrixAsIterator``1
Iterates all of the elements in a two dimension collection as the data source for the linq expression or ForEach statement.
 (适用于二维的集合做为linq的数据源，不像@"M:Microsoft.VisualBasic.Extensions.MatrixToList``1(System.Collections.Generic.IEnumerable{System.Collections.Generic.IEnumerable{``0}})"是进行转换，这个是返回迭代器的，推荐使用这个函数)

_returns: _
#### MaxInd``1
Gets the max element its index in the collection

_returns: _
#### Read``1
Read source at element position **i** and returns its value, 
 and then this function makes position **i** offset +1

_returns: _
#### RemoveLeft``2
删除制定的键之后返回剩下的数据

_returns: _
#### Removes``1


_returns: _
#### SafeQuery``1
A query proxy function makes your linq not so easily crashed due to the unexpected null reference collection as linq source.

_returns: _
#### Sequence
产生指定数目的一个递增序列(所生成序列的数值就是生成的数组的元素的个数)

_returns: _
#### ToArray``1
(所生成序列的数值就是生成的数组的元素的个数)

_returns: _
#### ToArray``2


_returns: _



