import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import { fetchProblemData } from "../scripts/fetchProblem.js";
import { generateReadme } from "../scripts/generateReadme.js";
import { pushProblemLocal } from "../scripts/githubPushHelper.js";
import { updateRootReadme } from "../scripts/updateRootReadme.js";
import { updateTopicReadme } from "../scripts/updateTopicReadme.js";
import { TAG_TO_DSA } from "../scripts/tagMapper.js";

dotenv.config();

export async function generateAll(input, lang, code, log) {
  try {
    log(`📩 Fetching problem data...`);

    const problem = await fetchProblemData(input);

    log(`📘 Problem: ${problem.id} - ${problem.title}`);

    const ROOT = "Leetcode DSA";
    const problemFolder = `${problem.id}-${slugify(problem.title)}`;
    const folders = resolveDSAFolders(problem.tags);

    for (const dsa of folders) {
      const base = path.join(process.cwd(), ROOT, dsa);
      const finalPath = path.join(base, problemFolder);

      fs.mkdirSync(finalPath, { recursive: true });

      const readme = generateReadme(problem, code, lang);
      fs.writeFileSync(path.join(finalPath, "README.md"), readme);

      log(`✅ Added → ${ROOT}/${dsa}/${problemFolder}`);
    }

    updateRootReadme(problem);
    updateTopicReadme(problem);

    log(`🚀 Pushing to GitHub...`);
    pushProblemLocal(problem.id, problem.title);

    log(`🤖 Git commit & push completed`);
    log(`🎉 DONE`);

  } catch (err) {
    log(`❌ ERROR: ${err.message}`);
    process.exit(1);
  }
}

/* ---------------- HELPERS ---------------- */

function resolveDSAFolders(tags = []) {
  const set = new Set();
  for (const tag of tags) {
    if (TAG_TO_DSA[tag]) set.add(TAG_TO_DSA[tag]);
  }
  return set.size ? [...set] : ["Misc"];
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
