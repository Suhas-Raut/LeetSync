export function generateReadme(problem, code, lang) {
  // Convert description into Markdown-friendly format
  const mdDescription = problem.description
    .split('\n')            // split by existing newlines
    .map(line => line.trim() + '  ') // add 2 spaces at end for Markdown line break
    .join('\n');

  return `# ${problem.id}. ${problem.title}

**Difficulty:** ${problem.difficulty}  
**Tags:** ${problem.tags.join(", ")}

---

## 📘 Problem Description
${mdDescription}

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
