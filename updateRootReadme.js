import db from './db.js';
import fs from 'fs';

export function updateRootReadme(problem) {
  // Insert or ignore problem
  const tagsString = problem.tags.join(',');
  const insert = db.prepare(`
    INSERT OR IGNORE INTO problems (id, title, difficulty, tags) 
    VALUES (?, ?, ?, ?)
  `);
  insert.run(problem.id, problem.title, problem.difficulty, tagsString);

  // Update difficulty counter
  const diffCounter = db.prepare('SELECT count FROM counters WHERE difficulty = ?').get(problem.difficulty);
  if (diffCounter) {
    db.prepare('UPDATE counters SET count = count + 1 WHERE difficulty = ?').run(problem.difficulty);
  } else {
    db.prepare('INSERT INTO counters (difficulty, count) VALUES (?, 1)').run(problem.difficulty);
  }

  // Update tag counters
  problem.tags.forEach(tag => {
    const tagCounter = db.prepare('SELECT count FROM tag_counts WHERE tag = ?').get(tag);
    if (tagCounter) {
      db.prepare('UPDATE tag_counts SET count = count + 1 WHERE tag = ?').run(tag);
    } else {
      db.prepare('INSERT INTO tag_counts (tag, count) VALUES (?, 1)').run(tag);
    }
  });

  // Build README.md dynamically
  const counters = db.prepare('SELECT * FROM counters').all();
  const tags = db.prepare('SELECT * FROM tag_counts').all();

  let content = `# 📘 LeetCode Progress Tracker\n\n## Difficulty\n\n| Level | Count |\n|-------|-------|\n`;
  counters.forEach(row => {
    content += `| ${row.difficulty} | ${row.count} |\n`;
  });

  content += `\n## DSA Topics\n\n| Topic | Count |\n|-------|-------|\n`;
  tags.forEach(row => {
    content += `| ${row.tag} | ${row.count} |\n`;
  });

  fs.writeFileSync('README.md', content);
}
