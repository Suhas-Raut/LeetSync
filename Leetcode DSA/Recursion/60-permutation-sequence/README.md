
# 60. Permutation Sequence

**Difficulty:** Hard  
**Topics:** Math, Recursion

---

## 🧠 Problem Description
The set [1, 2, 3, ...,&nbsp;n] contains a total of n! unique permutations. By listing and labeling all of the permutations in order, we get the following sequence for n = 3: &quot;123&quot; &quot;132&quot; &quot;213&quot; &quot;231&quot; &quot;312&quot; &quot;321&quot; Given n and k, return the kth permutation sequence. &nbsp; Example 1: Input: n = 3, k = 3 Output: "213" Example 2: Input: n = 4, k = 9 Output: "2314" Example 3: Input: n = 3, k = 1 Output: "123" &nbsp; Constraints: 1 &lt;= n &lt;= 9 1 &lt;= k &lt;= n!

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
    string getPermutation(int n, int k) {
        string s="";
        vector<int> nums;
        int fact=1;
        for(int i=1;i<=n;i++){
            fact*=i;
            nums.push_back(i);
        }
        k--;
        for(int i=n;i>=1;i--){
            fact/=i;
            int idx=k/fact;
            s+=to_string(nums[idx]);
            nums.erase(nums.begin()+idx);
            k%=fact;
        }
        return s;
    }
};

```
