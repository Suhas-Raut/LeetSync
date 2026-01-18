export function generateReadme(problem, code, language) {
  return `
# ${problem.id}. ${problem.title}

**Difficulty:** ${problem.difficulty}

## 🧠 Problem Description
${problem.description}  <!-- use description, already cleaned -->

## 💡 Solution (${language})

\`\`\`${language}
${code}
\`\`\`
`;
}
