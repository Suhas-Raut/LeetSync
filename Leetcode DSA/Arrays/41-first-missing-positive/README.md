
# 41. First Missing Positive

**Difficulty:** Hard  
**Topics:** Array, Hash Table

---

## 🧠 Problem Description
Given an unsorted integer array nums. Return the smallest positive integer that is not present in nums. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space. &nbsp; Example 1: Input: nums = [1,2,0] Output: 3 Explanation: The numbers in the range [1,2] are all in the array. Example 2: Input: nums = [3,4,-1,1] Output: 2 Explanation: 1 is in the array but 2 is missing. Example 3: Input: nums = [7,8,9,11,12] Output: 1 Explanation: The smallest positive integer 1 is missing. &nbsp; Constraints: 1 &lt;= nums.length &lt;= 105 -231 &lt;= nums[i] &lt;= 231 - 1

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
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            while (nums[i] >= 1 && nums[i] <= n &&
                   nums[nums[i]-1] != nums[i]) {
                swap(nums[i], nums[nums[i]-1]);
            }
        }
        for (int i = 0; i < n; i++)
            if (nums[i] != i+1) return i+1;
        return n+1;
    }
};

```
