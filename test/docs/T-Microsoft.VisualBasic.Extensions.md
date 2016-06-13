
# Extensions
_namespace: [Microsoft.VisualBasic](N-Microsoft.VisualBasic.md)_

Common extension methods library for convenient the programming job.

### Methods

#### __reversedTakeSelected``1
反选，即将所有不出现在**indexs**之中的元素都选取出来

_returns: _
#### Add``1
Adds the elements of the specified collection to the end of the List`1.
 (会自动跳过空集合，这个方法是安全的)
#### AddHandle``1
为列表中的对象添加对象句柄值
#### AddRange``1
Add a linked list of a collection of specific type of data.

_returns: _
#### CheckDuplicated``2
函数只返回有重复的数据

_returns: _
#### CliPath
If the path string value is already wrappered by quot, then this function will returns the original string (DO_NOTHING).
 (假若命令行之中的文件名参数之中含有空格的话，则可能会造成错误，需要添加一个双引号来消除歧义)

_returns: _
#### CliToken
@"M:Microsoft.VisualBasic.Extensions.CliPath(System.String)"函数为了保持对Linux系统的兼容性会自动替换\为/符号，这个函数则不会执行这个替换

_returns: _
#### Constrain``2
基类集合与继承类的集合约束

_returns: _
#### CopyTo``1
Copy the value in **value** into target variable **target** and then return the target variable.

_returns: _
#### CopyTypeDef``1


_returns: _
#### CopyTypeDef``2


_returns: _
#### DateToString
Format the datetime value in the format of yy/mm/dd hh:min

_returns: _
#### Description
Get the description data from a enum type value, if the target have no @"T:System.ComponentModel.DescriptionAttribute" attribute data
 then function will return the string value from the ToString() function.

_returns: _
#### DriverRun
Run the driver in a new thread, NOTE: from this extension function calls, then run thread is already be started, 
 so that no needs of calling the method @"M:System.Threading.Thread.Start" again.
 (使用线程的方式启动，在函数调用之后，线程是已经启动了的，所以不需要再次调用@"M:System.Threading.Thread.Start"方法了)
#### Enums``1
Enumerate all of the enum values in the specific @"T:System.Enum" type data.(只允许枚举类型，其他的都返回空集合)

_returns: _
#### FillBlank
Fill the newly created image data with the specific color brush
#### FlushMemory
Rabbish collection to free the junk memory.(垃圾回收)
#### Free``1
Free this variable pointer in the memory.(销毁本对象类型在内存之中的指针)
#### FuzzyMatching
Fuzzy match two string, this is useful for the text query or searching.

_returns: _
#### Get``1
This is a safely method for gets the value in a array, if the index was outside of the boundary, then the default value will be return.
 (假若下标越界的话会返回默认值)

_returns: _
#### GetAnonymousTypeList``1
You can using this method to create a empty list for the specific type of anonymous type object.
 (使用这个方法获取得到匿名类型的列表数据集合对象)

_returns: _
#### getBoolean
Convert the string value into the boolean value, this is useful to the text format configuration file into data model.
 (请注意，空值字符串为False)

_returns: _
#### GetElementCounts``1
Gets the element counts in the target data collection, if the collection object is nothing or empty
 then this function will returns ZERO, others returns Collection.Count.(返回一个数据集合之中的元素的数目，
 假若这个集合是空值或者空的，则返回0，其他情况则返回Count拓展函数的结果)

_returns: _
#### GetItem``1
Get a specific item value from the target collction data using its UniqueID property，
 (请注意，请尽量不要使用本方法，因为这个方法的效率有些低，对于获取@"T:Microsoft.VisualBasic.ComponentModel.Collection.Generic.sIdEnumerable"[
 ]类型的集合之中的某一个对象，请尽量先转换为字典对象，在使用该字典对象进行查找以提高代码效率，使用本方法的优点是可以选择忽略**UniqueId"[
 **参数之中的大小写，以及对集合之中的存在相同的Key的这种情况的容忍)

_returns: _
#### GetLength``1
0 for null object

_returns: _
#### If``1
Function test the Boolean expression and then decided returns which part of the value.
 (这个函数主要是用于Delegate函数指针类型或者Lambda表达式的)

_returns: _
#### InsertOrUpdate``1
Insert data or update the exists data in the dictionary, if the target object with @"P:Microsoft.VisualBasic.ComponentModel.Collection.Generic.sIdEnumerable.Identifier" 
 is not exists in the dictionary, then will be insert, else the old value will be replaced with the parameter 
 value **item**.
 (向字典对象之中更新或者插入新的数据，假若目标字典对象之中已经存在了一个数据的话，则会将原有的数据覆盖，并返回原来的数据)

_returns: _
#### Invoke
本方法会执行外部命令并等待其执行完毕，函数返回状态值

_returns: _
#### InvokeSet``1
Value assignment to the target variable.(将**value**参数里面的值赋值给**var**参数然后返回**value**)

_returns: _
#### InvokeSet``2
Assigning the value to the specific named property to the target object.
 (将**value**参数之中的值赋值给目标对象**obj**之中的指定的**name**属性名称的属性，如果发生错误，则原有的对象**obj**不会被修改)

_returns: _
#### Is_NA_UHandle
The target parameter **n** value is NaN or not a real number or not?
 (判断目标实数是否为一个无穷数或者非计算的数字，产生的原因主要来自于除0运算结果或者达到了
 @"T:System.Double"的上限或者下限)

_returns: _
#### IsNullOrEmpty
The @"T:System.Text.StringBuilder" object its content is nothing?

_returns: _
#### IsNullOrEmpty``1
This object array is a null object or contains zero count items.(判断某一个对象数组是否为空)

_returns: _
#### Join``1
Merge two type specific collection.(函数会忽略掉空的集合，函数会构建一个新的集合，原有的集合不受影响)

_returns: _
#### JoinBy
@"T:System.String"，这是一个安全的函数，当数组为空的时候回返回空字符串

_returns: _
#### LoadTextDoc``1
默认是加载Xml文件的

_returns: _
#### MatrixToList``1
Empty list will be skip and ignored.(这是一个安全的方法，空集合会被自动跳过，并且这个函数总是返回一个集合不会返回空值)

_returns: _
#### MatrixToUltraLargeVector``1
Merge the target array collection into one collection.
 (将目标数组的集合合并为一个数组，这个方法是提供给超大的集合的，即元素的数目非常的多的，即超过了@"T:System.Int32"的上限值)

_returns: _
#### MatrixToVector``1
Merge the target array collection into one collection.(将目标数组的集合合并为一个数组)

_returns: _
#### MatrixTranspose``1
矩阵转置： 将矩阵之中的元素进行行列位置的互换

_returns: _
#### MatrixTransposeIgnoredDimensionAgreement``1
将矩阵之中的元素进行行列位置的互换，请注意，假若长度不一致的话，会按照最短的元素来转置，故而使用本函数可能会造成一些信息的丢失

_returns: _
#### ModifyValue``1
Modify target object property value using a **valueModifier[specific value provider]** and then return original instance object.
 (修改目标对象的属性之后返回目标对象)

_returns: _
#### Move
变量**p**移动距离**d**然后返回其移动之前的值

_returns: _
#### MoveNext
**p** plus one and then return its previous value. (p++)

_returns: _
#### NormalizeXMLString
对Xml文件之中的特殊字符进行转义处理

_returns: _
#### Offset
All of the number value in the target array offset a integer value.

_returns: _
#### ParseDateTime
Parsing the dat value from the expression text, if any exception happend, a null date value will returned.
 (空字符串会返回空的日期)

_returns: _
#### Pause
Pause the console program.
#### RandomDouble
Gets a random number in the region of [0,1]. (获取一个[0,1]区间之中的随机数，请注意：因为为了尽量做到随机化，这个函数会不断的初始化随机种子，
 故而性能较低，不可以在大量重复调用，或者在批量调用的时候请使用并行化拓展的LINQ)

_returns: _
#### Randomize``1
Return a collection with randomize element position in **source[the original collection]**.
 (从原有序序列中获取一个随机元素的序列)

_returns: _
#### RegexParseDouble
Parsing a real number from the expression text by using the regex expression @"F:Microsoft.VisualBasic.Extensions._DOUBLE".
 (使用正则表达式解析目标字符串对象之中的一个实数)

_returns: _
#### Remove``1
Remove target object from dictionary.

_returns: _
#### RemoveDuplicates``2
移除重复的对象，这个函数是根据对象所生成的标签来完成的

_returns: _
#### RemoveLast``1
Removes the last element in the List object.

_returns: _
#### Removes``1
Remove all of the element in the **collection** from target **List[list]**
#### RunDriver
非线程的方式启动，当前线程会被阻塞在这里直到运行完毕

_returns: _
#### Sequence``1
Gets the subscript index of a generic collection.(获取某一个集合的下标的集合)

_returns: A integer array of subscript index of the target generic collection._
#### ShadowCopy``1
Copy the source value directly to the target variable and then return the source value.

_returns: _
#### Shell
执行一个命令行语句，并返回一个IO重定向对象，以获取被执行的目标命令的标准输出

_returns: _
#### Split``1
Data partitioning function.
 (将目标集合之中的数据按照**parTokens**参数分配到子集合之中，
 这个函数之中不能够使用并行化Linq拓展，以保证元素之间的相互原有的顺序)

_returns: _
#### SplitIterator``1
Performance the partitioning operation on the input sequence.
 (请注意，这个函数只适用于数量较少的序列。对所输入的序列进行分区操作，**parTokens**函数参数是每一个分区里面的元素的数量)

_returns: _
#### SplitMV


_returns: _
#### StdError
求取该数据集的标准差

_returns: _
#### SwapItem``1
Swap the two item position in the target **List[list]**.
#### SwapWith``1
Swap the value in the two variables.
#### TakeRandomly``1
随机的在目标集合中选取指定数目的子集合

_returns: _
#### Takes``1


_returns: _
#### Time
性能测试工具，函数之中会自动输出整个任务所经历的处理时长

_returns: _
#### ToBoolean
0 -> False
 1 -> True

_returns: _
#### ToDictionary``2
将目标键值对对象的集合转换为一个字典对象

_returns: _
#### ToStringArray``1
Convert target object type collection into a string array using the Object.ToString() interface function.

_returns: _
#### TrimA
Replace the @"F:Microsoft.VisualBasic.Constants.vbCrLf" with the specific string.

_returns: _
#### TrimNull
Remove all of the null object in the target object collection

_returns: _
#### TrimNull``1
Remove all of the null object in the target object collection.
 (这个是一个安全的方法，假若目标集合是空值，则函数会返回一个空的集合)

_returns: _
#### TrimVBCrLf
Removes VbCr and VbLf

_returns: _
#### TryGetValue``2
假若不存在目标键名，则返回空值，默认值为空值

_returns: _
#### Union
Get a sub set of the string data which is contains in both collection **strArray1** and **strArray2**

_returns: _
#### Wait
假若条件判断**handle**不为真的话，函数会一直阻塞线程，直到条件判断**handle**为真
#### π
获取一个实数集合中所有元素的积

_returns: _


### Properties

#### BooleanValues
Convert the string value into the boolean value, this is useful to the text format configuration file into data model.

