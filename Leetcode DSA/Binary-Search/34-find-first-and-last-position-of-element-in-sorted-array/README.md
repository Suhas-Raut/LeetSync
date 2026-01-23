
# 34. Find First and Last Position of Element in Sorted Array

**Difficulty:** Medium  
**Topics:** Array, Binary Search

---

## 🧠 Problem Description
Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1]. You must&nbsp;write an algorithm with&nbsp;O(log n) runtime complexity. &nbsp; Example 1: Input: nums = [5,7,7,8,8,10], target = 8 Output: [3,4] Example 2: Input: nums = [5,7,7,8,8,10], target = 6 Output: [-1,-1] Example 3: Input: nums = [], target = 0 Output: [-1,-1] &nbsp; Constraints: 0 &lt;= nums.length &lt;= 105 -109&nbsp;&lt;= nums[i]&nbsp;&lt;= 109 nums is a non-decreasing array. -109&nbsp;&lt;= target&nbsp;&lt;= 109

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
    vector<int> searchRange(vector<int>& nums, int t) {
        auto l = lower_bound(nums.begin(),nums.end(),t);
        auto r = upper_bound(nums.begin(),nums.end(),t);
        if (l==nums.end() || *l!=t) return {-1,-1};
        return {int(l-nums.begin()), int(r-nums.begin()-1)};
    }
};

```
