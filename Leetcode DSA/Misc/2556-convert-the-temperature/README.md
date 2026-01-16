# 2556. Convert the Temperature

**Difficulty:** Easy  
**Tags:** Math

---

## 📘 Problem Description
You are given a non-negative floating point number rounded to two decimal places celsius, that denotes the temperature in Celsius. You should convert Celsius into Kelvin and Fahrenheit and return it as an array ans = [kelvin, fahrenheit]. Return the array ans. Answers within 10-5 of the actual answer will be accepted. Note that: Kelvin = Celsius + 273.15 Fahrenheit = Celsius * 1.80 + 32.00 &nbsp; Example 1: Input: celsius = 36.50 Output: [309.65000,97.70000] Explanation: Temperature at 36.50 Celsius converted in Kelvin is 309.65 and converted in Fahrenheit is 97.70. Example 2: Input: celsius = 122.11 Output: [395.26000,251.79800] Explanation: Temperature at 122.11 Celsius converted in Kelvin is 395.26 and converted in Fahrenheit is 251.798. &nbsp; Constraints: 0 &lt;= celsius &lt;= 1000

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
    vector<double> convertTemperature(double celsius) {
        double Kelvin = celsius + 273.15;
        double Fahrenheit = celsius * 1.80 + 32.00;
        return {Kelvin, Fahrenheit};

    }
};
```
