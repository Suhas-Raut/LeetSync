# 4. Median of Two Sorted Arrays

**Difficulty:** Hard  
**Tags:** Array, Binary Search, Divide and Conquer

---

## 📘 Problem Description
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)). &nbsp; Example 1: Input: nums1 = [1,3], nums2 = [2] Output: 2.00000 Explanation: merged array = [1,2,3] and median is 2. Example 2: Input: nums1 = [1,2], nums2 = [3,4] Output: 2.50000 Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5. &nbsp; Constraints: nums1.length == m nums2.length == n 0 &lt;= m &lt;= 1000 0 &lt;= n &lt;= 1000 1 &lt;= m + n &lt;= 2000 -106 &lt;= nums1[i], nums2[i] &lt;= 106

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
    double findMedianSortedArrays(vector<int>& A, vector<int>& B) {
        if(A.size() > B.size())
            return findMedianSortedArrays(B,A);

            int n = A.size(), m = B.size();
            int low = 0, high = n;

            while (low <= high){
                int value1 = (low +high)/2;
                int value2 = (n+m+1)/2 - value1;

                int l1 = value1 == 0 ? INT_MIN : A[value1 - 1];
                int l2 = value2 == 0 ? INT_MIN : B[value2 - 1];
                int r1 = value1 == n ? INT_MAX : A[value1];
                int r2 = value2 == m ? INT_MAX : B[value2];

                if(l1 <= r2 && l2 <= r1){
                    if((n+m) % 2 == 0)
                        return(max(l1, l2) + min(r1,r2)) / 2.0;
                    else
                        return max(l1, l2);
                }
                else if (l1 > l2) high = value1 - 1;
                else low = value1 + 1;
            }
            return 0.0;
    }
};
```
