export function generateReadme(problem, code, lang) {
  return `# ${problem.id}. ${problem.title}

**Difficulty:** ${problem.difficulty}  
**Tags:** ${problem.tags.join(", ")}

---

## 📘 Problem Description
${problem.description}

---

## 💡 Approach
<!-- Explain your approach here -->

---

## ⏱️ Complexity Analysis
- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

---

## ✅ Solution Code (${lang})

\`\`\`${lang}
${code}
\`\`\`
`;
}
