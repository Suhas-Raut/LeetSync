# 152. Maximum Product Subarray

**Difficulty:** Medium  
**Tags:** Array, Dynamic Programming

---

## 📘 Problem Description
Given an integer array nums, find a subarray that has the largest product, and return the product. The test cases are generated so that the answer will fit in a 32-bit integer. Note that the product of an array with a single element is the value of that element. &nbsp; Example 1: Input: nums = [2,3,-2,4] Output: 6 Explanation: [2,3] has the largest product 6. Example 2: Input: nums = [-2,0,-1] Output: 0 Explanation: The result cannot be 2, because [-2,-1] is not a subarray. &nbsp; Constraints: 1 &lt;= nums.length &lt;= 2 * 104 -10 &lt;= nums[i] &lt;= 10 The product of any subarray of nums is guaranteed to fit in a 32-bit integer.

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
    int maxProduct(vector<int>& nums) {
        int prod1 = nums[0],prod2 = nums[0],result = nums[0];
    
        for(int i=1;i<nums.size();i++) {
            int temp = max({nums[i],prod1*nums[i],prod2*nums[i]});
            prod2 = min({nums[i],prod1*nums[i],prod2*nums[i]});
            prod1 = temp;

            result = max(result,prod1);
        }
    
        return result;
    }
};
```
