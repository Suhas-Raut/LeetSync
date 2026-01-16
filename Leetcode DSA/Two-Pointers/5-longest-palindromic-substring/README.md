# 5. Longest Palindromic Substring

**Difficulty:** Medium  
**Tags:** Two Pointers, String, Dynamic Programming

---

## 📘 Problem Description
Given a string s, return the longest palindromic substring in s. &nbsp; Example 1: Input: s = &quot;babad&quot; Output: &quot;bab&quot; Explanation: &quot;aba&quot; is also a valid answer. Example 2: Input: s = &quot;cbbd&quot; Output: &quot;bb&quot; &nbsp; Constraints: 1 &lt;= s.length &lt;= 1000 s consist of only digits and English letters.

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
public:
    std::string longestPalindrome(std::string s) {
        if (s.length() <= 1) {
            return s;
        }
        
        int max_len = 1;
        std::string max_str = s.substr(0, 1);
        
        for (int i = 0; i < s.length(); ++i) {
            for (int j = i + max_len; j <= s.length(); ++j) {
                if (j - i > max_len && isPalindrome(s.substr(i, j - i))) {
                    max_len = j - i;
                    max_str = s.substr(i, j - i);
                }
            }
        }

        return max_str;
    }

private:
    bool isPalindrome(const std::string& str) {
        int left = 0;
        int right = str.length() - 1;
        
        while (left < right) {
            if (str[left] != str[right]) {
                return false;
            }
            ++left;
            --right;
        }
        
        return true;
    }
};
```
