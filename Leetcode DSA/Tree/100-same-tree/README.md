# 100. Same Tree

**Difficulty:** Easy  
**Tags:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

---

## 📘 Problem Description
Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value. &nbsp; Example 1: Input: p = [1,2,3], q = [1,2,3] Output: true Example 2: Input: p = [1,2], q = [1,null,2] Output: false Example 3: Input: p = [1,2,1], q = [1,1,2] Output: false &nbsp; Constraints: The number of nodes in both trees is in the range [0, 100]. -104 &lt;= Node.val &lt;= 104

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
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if(p == NULL && q == NULL){
            return true;
        }
        if(p == NULL || q == NULL)
        {
            return false;
        }
      if (p->val == q->val) {

                    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);

      } return false;  }
};
```
