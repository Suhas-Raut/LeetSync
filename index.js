import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import { fetchProblemData } from "./fetchProblem.js";
import { generateReadme } from "./generateReadme.js";
import { TAG_TO_DSA } from "./tagMapper.js";
import { updateRootReadme } from "./updateRootReadme.js";
import { pushProblemLocal } from "./githubPushHelper.js";

dotenv.config();

export async function generateAll(input, lang, code) {
  try {
    // Fetch problem data from LeetCode
    const problem = await fetchProblemData(input);

    // Prepare folder(s) for the problem
    const problemFolder = `${problem.id}-${slugify(problem.title)}`;
    const dsaFolders = resolveDSAFolders(problem.tags);

    for (const dsa of dsaFolders) {
      const basePath = path.join(process.cwd(), dsa);
      const finalPath = path.join(basePath, problemFolder);

      fs.mkdirSync(finalPath, { recursive: true });

      const readme = generateReadme(problem, code, lang);
      fs.writeFileSync(path.join(finalPath, "README.md"), readme);

      console.log(`✅ Added → ${dsa}/${problemFolder}`);
    }

    // ---- HERE is where we update the root README via tracker JSON ----
    updateRootReadme({
      id: problem.id,
      title: problem.title,
      difficulty: problem.difficulty,
      tags: problem.tags
    });

    // Push locally via Git
    pushProblemLocal(problem.id, problem.title);

    return {
      id: problem.id,
      title: problem.title,
      difficulty: problem.difficulty,
      tags: problem.tags
    };

  } catch (err) {
    console.error("❌ Error in generateAll:", err.message);
    throw err;
  }
}

/* ---------------- HELPERS ---------------- */

function resolveDSAFolders(tags = []) {
  const folders = new Set();
  for (const tag of tags) {
    if (TAG_TO_DSA[tag]) folders.add(TAG_TO_DSA[tag]);
  }
  return folders.size ? [...folders] : ["Misc"];
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
