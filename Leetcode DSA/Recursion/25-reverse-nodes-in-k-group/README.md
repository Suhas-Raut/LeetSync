
# 25. Reverse Nodes in k-Group

**Difficulty:** Hard  
**Topics:** Linked List, Recursion

---

## 🧠 Problem Description
Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is. You may not alter the values in the list&#39;s nodes, only nodes themselves may be changed. &nbsp; Example 1: Input: head = [1,2,3,4,5], k = 2 Output: [2,1,4,3,5] Example 2: Input: head = [1,2,3,4,5], k = 3 Output: [3,2,1,4,5] &nbsp; Constraints: The number of nodes in the list is n. 1 &lt;= k &lt;= n &lt;= 5000 0 &lt;= Node.val &lt;= 1000 &nbsp; Follow-up: Can you solve the problem in O(1) extra memory space?

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
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* cur = head;
        for (int i=0;i<k;i++) {
            if (!cur) return head;
            cur = cur->next;
        }
        ListNode* prev = reverseKGroup(cur, k);
        while (k--) {
            ListNode* tmp = head->next;
            head->next = prev;
            prev = head;
            head = tmp;
        }
        return prev;
    }
};

```
