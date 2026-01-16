export function generateReadme(problem, code, lang) {
  // Convert description into Markdown-friendly format
const mdDescription = problem.description
  .replace(/<br\s*\/?>/gi, '\n')       // convert <br> to newline
  .replace(/<\/p>/gi, '\n\n')          // end of paragraph = double newline
  .replace(/<[^>]+>/g, '')             // remove all other HTML tags
  .trim();
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
