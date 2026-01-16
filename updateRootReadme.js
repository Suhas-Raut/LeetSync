export function updateRootReadme(problem) {
  // Read CSV into array
  const data = fs.readFileSync(TRACKER_FILE, "utf-8")
    .trim()
    .split("\n")
    .slice(1)
    .map(line => {
      const [id, title, difficulty, tags] = line.split(",");
      return { id, title, difficulty, tags: tags.split("|") };
    });

  // Add new problem if not already present
  if (!data.find(p => p.id === problem.id)) {
    fs.appendFileSync(
      TRACKER_FILE,
      `\n${problem.id},${problem.title},${problem.difficulty},${problem.tags.join("|")}`
    );
    data.push({
      id: problem.id,
      title: problem.title,
      difficulty: problem.difficulty,
      tags: problem.tags
    });
  }

  // Count totals
  const counts = data.reduce((acc, p) => {
    acc.difficulty[p.difficulty] = (acc.difficulty[p.difficulty] || 0) + 1;
    p.tags.forEach(t => (acc.tags[t] = (acc.tags[t] || 0) + 1));
    return acc;
  }, { difficulty: {}, tags: {} });

  // Generate README content
  let readmeContent = "# 📘 LeetCode Progress Tracker\n\n";

  // Difficulty table
  readmeContent += "## Difficulty\n\n";
  readmeContent += "| Level | Count |\n";
  readmeContent += "|-------|-------|\n";
  ["Easy", "Medium", "Hard"].forEach(level => {
    readmeContent += `| ${level} | ${counts.difficulty[level] || 0} |\n`;
  });

  // DSA Topics table
  readmeContent += "\n## DSA\n\n";
  readmeContent += "| Topic | Count |\n";
  readmeContent += "|-------|-------|\n";
  for (const [tag, count] of Object.entries(counts.tags)) {
    readmeContent += `| ${tag} | ${count} |\n`;
  }

  fs.writeFileSync(path.join(process.cwd(), "README.md"), readmeContent);
}
