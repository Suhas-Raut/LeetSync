# 125. Valid Palindrome

**Difficulty:** Easy  
**Tags:** Two Pointers, String

---

## 📘 Problem Description
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise. &nbsp; Example 1: Input: s = &quot;A man, a plan, a canal: Panama&quot; Output: true Explanation: &quot;amanaplanacanalpanama&quot; is a palindrome. Example 2: Input: s = &quot;race a car&quot; Output: false Explanation: &quot;raceacar&quot; is not a palindrome. Example 3: Input: s = &quot; &quot; Output: true Explanation: s is an empty string &quot;&quot; after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome. &nbsp; Constraints: 1 &lt;= s.length &lt;= 2 * 105 s consists only of printable ASCII characters.

---

## 💡 Approach
<!-- Explain your approach here -->

---

## ⏱️ Complexity Analysis
- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

---

## ✅ Solution Code (cpp)

```cpp
class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while(left < right){
            while(left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while(left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;

            if(Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right)))
            return false;

            left++;
            right--;
        }
        return true;

    }
}
```
