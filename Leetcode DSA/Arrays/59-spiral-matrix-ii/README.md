
# 59. Spiral Matrix II

**Difficulty:** Medium  
**Topics:** Array, Matrix, Simulation

---

## 🧠 Problem Description
Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order. &nbsp; Example 1: Input: n = 3 Output: [[1,2,3],[8,9,4],[7,6,5]] Example 2: Input: n = 1 Output: [[1]] &nbsp; Constraints: 1 &lt;= n &lt;= 20

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
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> m(n, vector<int>(n));
        int top=0, bot=n-1, l=0, r=n-1, val=1;
        while(top<=bot && l<=r){
            for(int i=l;i<=r;i++) m[top][i]=val++;
            top++;
            for(int i=top;i<=bot;i++) m[i][r]=val++;
            r--;
            for(int i=r;i>=l;i--) m[bot][i]=val++;
            bot--;
            for(int i=bot;i>=top;i--) m[i][l]=val++;
            l++;
        }
        return m;
    }
};

```
