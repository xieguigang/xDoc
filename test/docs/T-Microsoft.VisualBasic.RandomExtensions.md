
# RandomExtensions
_namespace: [Microsoft.VisualBasic](N-Microsoft.VisualBasic.md)_

Some extension methods for @"T:System.Random" for creating a few more kinds of random stuff.

### Methods

#### NextBoolean
Equally likely to return true or false. Uses @"M:System.Random.Next".

_returns: _
#### NextGaussian
Generates normally distributed numbers. Each operation makes two Gaussians for the price of one, and apparently they can be cached or something for better performance, but who cares.

_returns: _
#### NextTriangular
Generates values from a triangular distribution.

_returns: _
#### Permutation
Returns n unique random numbers in the range [1, n], inclusive. 
 This is equivalent to getting the first n numbers of some random permutation of the sequential numbers from 1 to max. 
 Runs in O(k^2) time.

_returns: _
#### Shuffle
Shuffles a list in O(n) time by using the Fisher-Yates/Knuth algorithm.
#### Shuffle``1
Shuffles a list in O(n) time by using the Fisher-Yates/Knuth algorithm.



