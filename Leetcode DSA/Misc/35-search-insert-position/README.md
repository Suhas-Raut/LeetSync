# 35. Search Insert Position

**Difficulty:** Easy  
**Tags:** Array, Binary Search

---

## 📘 Problem Description
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. You must&nbsp;write an algorithm with&nbsp;O(log n) runtime complexity. &nbsp; Example 1: Input: nums = [1,3,5,6], target = 5 Output: 2 Example 2: Input: nums = [1,3,5,6], target = 2 Output: 1 Example 3: Input: nums = [1,3,5,6], target = 7 Output: 4 &nbsp; Constraints: 1 &lt;= nums.length &lt;= 104 -104 &lt;= nums[i] &lt;= 104 nums contains distinct values sorted in ascending order. -104 &lt;= target &lt;= 104

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
    int searchInsert(vector<int>& nums, int target) {
        int n = nums.size(); 
        int low = 0, high = n - 1;
        int ans = n;

        while (low <= high) {
            int mid = (low + high) / 2;
            
            if (nums[mid] >= target) {
                ans = mid;
                
                high = mid - 1;
            }
            else {
                low = mid + 1; 
            }
        }
        return ans;
    }
};
```
