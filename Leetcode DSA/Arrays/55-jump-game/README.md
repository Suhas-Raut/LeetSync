
# 55. Jump Game

**Difficulty:** Medium  
**Topics:** Array, Dynamic Programming, Greedy

---

## 🧠 Problem Description
You are given an integer array nums. You are initially positioned at the array&#39;s first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise. &nbsp; Example 1: Input: nums = [2,3,1,1,4] Output: true Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index. Example 2: Input: nums = [3,2,1,0,4] Output: false Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index. &nbsp; Constraints: 1 &lt;= nums.length &lt;= 104 0 &lt;= nums[i] &lt;= 105

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
    bool canJump(vector<int>& nums) {
        int far=0;
        for(int i=0;i<nums.size();i++){
            if(i>far) return false;
            far=max(far,i+nums[i]);
        }
        return true;
    }
};

```
