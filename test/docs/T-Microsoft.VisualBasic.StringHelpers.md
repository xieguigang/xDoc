
# StringHelpers
_namespace: [Microsoft.VisualBasic](N-Microsoft.VisualBasic.md)_

The extensions module for facilities the string operations.

### Methods

#### Count
Counts the specific char that appeared in the input string.
 (计数在字符串之中所出现的指定的字符的出现的次数)
_returns: _
#### CountTokens
Count the string value numbers.(请注意，这个函数是倒序排序的)
_returns: _
#### EqualsAny
判断目标字符串是否与字符串参数数组之中的任意一个字符串相等，大小写不敏感，假若没有相等的字符串，则会返回空字符串，假若找到了相等的字符串，则会返回该字符串
_returns: _
#### GetString
获取""或者其他字符所包围的字符串的值
_returns: _
#### GetTagValue
tagName{}value
_returns: _
#### InStrAny
查找到任意一个既返回位置，大小写不敏感，假若查找不到，则返回-1值，判断是否查找成功，可以使用 <0 来完成，
 因为是通过InStr来完成的，所以查找成功的时候，最小的值是1，即字符串序列的第一个位置，也是元素0位置
_returns: _
#### Intersection
求交集
_returns: _
#### IsBlank
Is Nothing, ,
_returns: _
#### IsNullOrEmpty
判断这个字符串集合是否为空集合，函数会首先按照常规的集合为空进行判断，然后假若不为空的话，假若只含有一个元素并且该唯一的元素的值为空字符串，则也认为这个字符串集合为空集合
_returns: _
#### Located
String compares using , if the target value could not be located, then -1 will be return from this function.
_returns: _
#### Lookup
Search the string by keyword in a string collection. Unlike search function 
 using function function to search string, this function using 
 to search the keyword.
_returns: 返回第一个找到关键词的行数，没有找到则返回-1_
#### lTokens
Line tokens. ==> Parsing the text into lines by using , .
 (函数对文本进行分行操作，由于在Windows()和
 Linux(, )平台上面所生成的文本文件的换行符有差异，
 所以可以使用这个函数来进行统一的分行操作)
_returns: _
#### Match
Searches the specified input string for the first occurrence of the specified regular expression.
_returns: _
#### Parts

_returns: _
#### RemoveLast
Call ( - 1, 1) for removes the last character in the string sequence.
#### RepeatString
this is to emulate what's evailable in PHP
#### Reverse
Returns a reversed version of String s.
_returns: _
#### Split
String collection tokens by a certain delimiter string element.
_returns: _
#### StringSplit
This method is used to replace most calls to the Java String.split method.
_returns: _
#### TextEquals
Shortcuts for method (s1, s2, )
_returns: _
#### ZeroFill
Fill the number string with specific length of ZERO sequence to generates the fixed width string.
_returns: _


### Properties

#### NonStrictCompares
String compares with ignored chars' case.(忽略大小写为非严格的比较)

