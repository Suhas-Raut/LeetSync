# 64. Minimum Path Sum

**Difficulty:** Medium  
**Tags:** Array, Dynamic Programming, Matrix

---

## 📘 Problem Description
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path. Note: You can only move either down or right at any point in time. &nbsp; Example 1: Input: grid = [[1,3,1],[1,5,1],[4,2,1]] Output: 7 Explanation: Because the path 1 &rarr; 3 &rarr; 1 &rarr; 1 &rarr; 1 minimizes the sum. Example 2: Input: grid = [[1,2,3],[4,5,6]] Output: 12 &nbsp; Constraints: m == grid.length n == grid[i].length 1 &lt;= m, n &lt;= 200 0 &lt;= grid[i][j] &lt;= 200

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
    int minPathSum(vector<vector<int>>& grid) {
        int x = grid.size();
        int y = grid[0].size();

        vector<int> dp(y, 0);

        dp[0] = grid[0][0];

        // Fill first row
        for(int j = 1; j < y; j++)
            dp[j] = dp[j-1] + grid[0][j];

      
        for(int i = 1; i < x; i++) {
            dp[0] += grid[i][0]; 
            for(int j = 1; j < y; j++) {
                dp[j] = min(dp[j], dp[j-1]) + grid[i][j];
            }
        }

        return dp[y-1];
    }
};
```
