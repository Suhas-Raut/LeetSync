export function generateReadme(problem, code, language, complexity = {}) {
  const examplesSection = problem.examples?.length
    ? problem.examples
        .map(
          (ex, i) => `**Example ${i + 1}:**  
**Input:** ${ex.input}  
**Output:** ${ex.output}`
        )
        .join("\n\n")
    : "_No examples available._";

  return `
# ${problem.id}. ${problem.title}

**Difficulty:** ${problem.difficulty}  
**Topics:** ${problem.tags.join(", ")}

---

## 🧠 Problem Description
${problem.description}

---

## 📌 Examples
${examplesSection}

---

## 💡 Approach
> Explain the intuition and steps briefly here.

---

## ⏱️ Complexity Analysis
- **Time Complexity:** ${complexity.time || "O(?)"}
- **Space Complexity:** ${complexity.space || "O(?)"}

---

## 🧩 Solution (${language})

\`\`\`${language}
${code}
\`\`\`
`;
}
