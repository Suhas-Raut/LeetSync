
# 9. Palindrome Number

**Difficulty:** Easy

## 🧠 Problem Description
Given an integer x, return true if x is a palindrome, and false otherwise. &nbsp; Example 1: Input: x = 121 Output: true Explanation: 121 reads as 121 from left to right and from right to left. Example 2: Input: x = -121 Output: false Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome. Example 3: Input: x = 10 Output: false Explanation: Reads 01 from right to left. Therefore it is not a palindrome. &nbsp; Constraints: -231&nbsp;&lt;= x &lt;= 231&nbsp;- 1 &nbsp; Follow up: Could you solve it without converting the integer to a string?  <!-- use description, already cleaned -->

## 💡 Solution (cpp)

```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        if(x<0) return false;
        long long rev=0, t=x;
        while(t){
            rev = rev*10 + t%10;
            t/=10;
        }
        return rev == x;
    }
};

```
