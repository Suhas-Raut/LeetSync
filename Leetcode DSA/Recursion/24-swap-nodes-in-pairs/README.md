
# 24. Swap Nodes in Pairs

**Difficulty:** Medium  
**Topics:** Linked List, Recursion

---

## 🧠 Problem Description
Given a&nbsp;linked list, swap every two adjacent nodes and return its head. You must solve the problem without&nbsp;modifying the values in the list&#39;s nodes (i.e., only nodes themselves may be changed.) &nbsp; Example 1: Input: head = [1,2,3,4] Output: [2,1,4,3] Explanation: Example 2: Input: head = [] Output: [] Example 3: Input: head = [1] Output: [1] Example 4: Input: head = [1,2,3] Output: [2,1,3] &nbsp; Constraints: The number of nodes in the&nbsp;list&nbsp;is in the range [0, 100]. 0 &lt;= Node.val &lt;= 100

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
    ListNode* swapPairs(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode* next = head->next;
        head->next = swapPairs(next->next);
        next->next = head;
        return next;
    }
};

```
