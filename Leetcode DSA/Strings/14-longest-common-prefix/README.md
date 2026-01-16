# 14. Longest Common Prefix

**Difficulty:** Easy  
**Tags:** Array, String, Trie

---

## 📘 Problem Description
Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string &quot;&quot;. &nbsp; Example 1: Input: strs = [&quot;flower&quot;,&quot;flow&quot;,&quot;flight&quot;] Output: &quot;fl&quot; Example 2: Input: strs = [&quot;dog&quot;,&quot;racecar&quot;,&quot;car&quot;] Output: &quot;&quot; Explanation: There is no common prefix among the input strings. &nbsp; Constraints: 1 &lt;= strs.length &lt;= 200 0 &lt;= strs[i].length &lt;= 200 strs[i] consists of only lowercase English letters if it is non-empty.

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
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";
        
        string box = strs[0];
        
        for (int i = 1; i < strs.size(); i++) {
            while (strs[i].find(box) != 0) { 
                box = box.substr(0, box.size() - 1);
                if (box.empty()) return "";
            }
        }
        
        return box;
    }
};
```
