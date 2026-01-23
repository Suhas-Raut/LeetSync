
# 21. Merge Two Sorted Lists

**Difficulty:** Easy  
**Topics:** Linked List, Recursion

---

## 🧠 Problem Description
You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list. &nbsp; Example 1: Input: list1 = [1,2,4], list2 = [1,3,4] Output: [1,1,2,3,4,4] Example 2: Input: list1 = [], list2 = [] Output: [] Example 3: Input: list1 = [], list2 = [0] Output: [0] &nbsp; Constraints: The number of nodes in both lists is in the range [0, 50]. -100 &lt;= Node.val &lt;= 100 Both list1 and list2 are sorted in non-decreasing order.

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
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode dummy(0), *cur = &dummy;
        while (l1 && l2) {
            if (l1->val < l2->val) cur->next = l1, l1 = l1->next;
            else cur->next = l2, l2 = l2->next;
            cur = cur->next;
        }
        cur->next = l1 ? l1 : l2;
        return dummy.next;
    }
};

```
