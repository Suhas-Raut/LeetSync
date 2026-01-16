# 2820. Return Length of Arguments Passed

**Difficulty:** Easy  
**Tags:** 

---

## 📘 Problem Description
Write a function&nbsp;argumentsLength that returns the count of arguments passed to it. &nbsp; Example 1: Input: args = [5] Output: 1 Explanation: argumentsLength(5); // 1 One value was passed to the function so it should return 1. Example 2: Input: args = [{}, null, &quot;3&quot;] Output: 3 Explanation: argumentsLength({}, null, &quot;3&quot;); // 3 Three values were passed to the function so it should return 3. &nbsp; Constraints: args&nbsp;is a valid JSON array 0 &lt;= args.length &lt;= 100

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
 * @param {...(null|boolean|number|string|Array|Object)} args
 * @return {number}
 */
var argumentsLength = function(...args) {
	return args.length;
};
```
