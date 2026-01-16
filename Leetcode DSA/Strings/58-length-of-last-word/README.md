# 58. Length of Last Word

**Difficulty:** Easy  
**Tags:** String

---

## 📘 Problem Description
Given a string s consisting of words and spaces, return the length of the last word in the string. A word is a maximal substring consisting of non-space characters only. &nbsp; Example 1: Input: s = &quot;Hello World&quot; Output: 5 Explanation: The last word is &quot;World&quot; with length 5. Example 2: Input: s = &quot; fly me to the moon &quot; Output: 4 Explanation: The last word is &quot;moon&quot; with length 4. Example 3: Input: s = &quot;luffy is still joyboy&quot; Output: 6 Explanation: The last word is &quot;joyboy&quot; with length 6. &nbsp; Constraints: 1 &lt;= s.length &lt;= 104 s consists of only English letters and spaces &#39; &#39;. There will be at least one word in s.

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
    int lengthOfLastWord(string s) {
        //Size of the String 
        int t = s.size();
        int count = 0;
        for(int i = t-1; i >= 0; i--){
            //If space is present before the word
            if(s[t-1] == ' ' && count == 0){
                t--;
                continue;
            }
            //Calculating Word's Length
            else if(s[t-1] != ' '){
                count++;
                t--;
                
            }
            else{
                break;
            }
        }
        // Returning The Word's Length
        return count;        
    }
};
```
