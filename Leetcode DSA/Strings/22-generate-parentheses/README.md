
# 22. Generate Parentheses

**Difficulty:** Medium  
**Topics:** String, Dynamic Programming, Backtracking

---

## 🧠 Problem Description
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses. &nbsp; Example 1: Input: n = 3 Output: ["((()))","(()())","(())()","()(())","()()()"] Example 2: Input: n = 1 Output: ["()"] &nbsp; Constraints: 1 &lt;= n &lt;= 8

---

## 📌 Examples
_No examples available._

---

## 💡 Approach
> Explain the intuition and steps briefly here.

---

## ⏱️ Complexity Analysis
- **Time Complexity:** O(?)
- **Space Complexity:** O(?)

---

## 🧩 Solution (cpp)

```cpp
class Solution {
public:
    vector<string> res;
    void dfs(string s, int open, int close, int n) {
        if (s.size() == 2*n) {
            res.push_back(s); return;
        }
        if (open < n) dfs(s+"(", open+1, close, n);
        if (close < open) dfs(s+")", open, close+1, n);
    }
    vector<string> generateParenthesis(int n) {
        dfs("",0,0,n);
        return res;
    }
};

```
