# 33. Search in Rotated Sorted Array

**Difficulty:** Medium  
**Tags:** Array, Binary Search

---

## 📘 Problem Description
There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly left rotated at an unknown index k (1 &lt;= k &lt; nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be left rotated by&nbsp;3&nbsp;indices and become [4,5,6,7,0,1,2]. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity. &nbsp; Example 1: Input: nums = [4,5,6,7,0,1,2], target = 0 Output: 4 Example 2: Input: nums = [4,5,6,7,0,1,2], target = 3 Output: -1 Example 3: Input: nums = [1], target = 0 Output: -1 &nbsp; Constraints: 1 &lt;= nums.length &lt;= 5000 -104 &lt;= nums[i] &lt;= 104 All values of nums are unique. nums is an ascending array that is possibly rotated. -104 &lt;= target &lt;= 104

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
    int search(vector<int>& nums, int target) {
        int n = size(nums);
        int low = 0, high = n - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
    
            
            if (nums[mid] == target) return mid;
    
            
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target <= nums[mid]) {
                    
                    high = mid - 1;
                }
                else {
                    
                    low = mid + 1;
                }
            }
            else { 
                if (nums[mid] <= target && target <= nums[high]) {
                    
                    low = mid + 1;
                }
                else {
                    
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
};
```
