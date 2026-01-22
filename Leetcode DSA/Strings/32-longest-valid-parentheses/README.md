
# 32. Longest Valid Parentheses

**Difficulty:** Hard  
**Topics:** String, Dynamic Programming, Stack

---

## 🧠 Problem Description
Given a string containing just the characters &#39;(&#39; and &#39;)&#39;, return the length of the longest valid (well-formed) parentheses substring. &nbsp; Example 1: Input: s = &quot;(()&quot; Output: 2 Explanation: The longest valid parentheses substring is &quot;()&quot;. Example 2: Input: s = &quot;)()())&quot; Output: 4 Explanation: The longest valid parentheses substring is &quot;()()&quot;. Example 3: Input: s = &quot;&quot; Output: 0 &nbsp; Constraints: 0 &lt;= s.length &lt;= 3 * 104 s[i] is &#39;(&#39;, or &#39;)&#39;.

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
    int longestValidParentheses(string s) {
        stack<int> st;
        st.push(-1);
        int res=0;
        for(int i=0;i<s.size();i++){
            if(s[i]=='(') st.push(i);
            else{
                st.pop();
                if(st.empty()) st.push(i);
                else res=max(res,i-st.top());
            }
        }
        return res;
    }
};

```
