
# 40. Combination Sum II

**Difficulty:** Medium  
**Topics:** Array, Backtracking

---

## 🧠 Problem Description
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates&nbsp;where the candidate numbers sum to target. Each number in candidates&nbsp;may only be used once in the combination. Note:&nbsp;The solution set must not contain duplicate combinations. &nbsp; Example 1: Input: candidates = [10,1,2,7,6,1,5], target = 8 Output: [ [1,1,6], [1,2,5], [1,7], [2,6] ] Example 2: Input: candidates = [2,5,2,1,2], target = 5 Output: [ [1,2,2], [5] ] &nbsp; Constraints: 1 &lt;=&nbsp;candidates.length &lt;= 100 1 &lt;=&nbsp;candidates[i] &lt;= 50 1 &lt;= target &lt;= 30

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
    vector<vector<int>> res;
    void dfs(vector<int>& c,int t,int i,vector<int>& cur){
        if(!t){ res.push_back(cur); return; }
        for(int j=i;j<c.size() && c[j]<=t;j++){
            if(j>i && c[j]==c[j-1]) continue;
            cur.push_back(c[j]);
            dfs(c,t-c[j],j+1,cur);
            cur.pop_back();
        }
    }
    vector<vector<int>> combinationSum2(vector<int>& c, int t) {
        sort(c.begin(),c.end());
        vector<int> cur;
        dfs(c,t,0,cur);
        return res;
    }
};

```
