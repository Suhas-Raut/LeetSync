# 206. Reverse Linked List

**Difficulty:** Easy  
**Tags:** Linked List, Recursion

---

## 📘 Problem Description
Given the head of a singly linked list, reverse the list, and return the reversed list. &nbsp; Example 1: Input: head = [1,2,3,4,5] Output: [5,4,3,2,1] Example 2: Input: head = [1,2] Output: [2,1] Example 3: Input: head = [] Output: [] &nbsp; Constraints: The number of nodes in the list is the range [0, 5000]. -5000 &lt;= Node.val &lt;= 5000 &nbsp; Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?

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
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while(curr != null){
            ListNode nextNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }
}
```
