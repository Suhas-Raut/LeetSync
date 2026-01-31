
# 56. Merge Intervals

**Difficulty:** Medium  
**Topics:** Array, Sorting

---

## 🧠 Problem Description
Given an array&nbsp;of intervals&nbsp;where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input. &nbsp; Example 1: Input: intervals = [[1,3],[2,6],[8,10],[15,18]] Output: [[1,6],[8,10],[15,18]] Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6]. Example 2: Input: intervals = [[1,4],[4,5]] Output: [[1,5]] Explanation: Intervals [1,4] and [4,5] are considered overlapping. Example 3: Input: intervals = [[4,7],[1,4]] Output: [[1,7]] Explanation: Intervals [1,4] and [4,7] are considered overlapping. &nbsp; Constraints: 1 &lt;= intervals.length &lt;= 104 intervals[i].length == 2 0 &lt;= starti &lt;= endi &lt;= 104

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
    vector<vector<int>> merge(vector<vector<int>>& in) {
        sort(in.begin(),in.end());
        vector<vector<int>> res;
        for(auto &v:in){
            if(res.empty() || res.back()[1]<v[0])
                res.push_back(v);
            else
                res.back()[1]=max(res.back()[1],v[1]);
        }
        return res;
    }
};

```
