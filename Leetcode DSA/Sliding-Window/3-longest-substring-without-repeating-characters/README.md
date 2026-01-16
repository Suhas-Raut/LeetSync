# 3. Longest Substring Without Repeating Characters

**Difficulty:** Medium  
**Tags:** Hash Table, String, Sliding Window

---

## 📘 Problem Description
Given a string s, find the length of the longest substring without duplicate characters. &nbsp; Example 1: Input: s = &quot;abcabcbb&quot; Output: 3 Explanation: The answer is &quot;abc&quot;, with the length of 3. Note that &quot;bca&quot; and &quot;cab&quot; are also correct answers. Example 2: Input: s = &quot;bbbbb&quot; Output: 1 Explanation: The answer is &quot;b&quot;, with the length of 1. Example 3: Input: s = &quot;pwwkew&quot; Output: 3 Explanation: The answer is &quot;wke&quot;, with the length of 3. Notice that the answer must be a substring, &quot;pwke&quot; is a subsequence and not a substring. &nbsp; Constraints: 0 &lt;= s.length &lt;= 5 * 104 s consists of English letters, digits, symbols and spaces.

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
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> st;
        int left = 0, ans = 0;

        for(int right= 0; right < s.size(); right++){
            while(st.count(s[right])){
                st.erase(s[left]);
                left++;
            }
            st.insert(s[right]);
            ans = max(ans, right-left+1);
        }
        return ans;
        
    }
};
```
