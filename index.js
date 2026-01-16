import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import { fetchProblemData } from "./scripts/fetchProblem.js";
import { generateReadme } from "./scripts/generateReadme.js";
import { pushProblemLocal } from "./scripts/githubPushHelper.js";
import { updateRootReadme } from "./scripts/updateRootReadme.js";
import { updateTopicReadme } from "./scripts/updateTopicReadme.js";
import { TAG_TO_DSA } from "./scripts/tagMapper.js";



dotenv.config();

export async function generateAll(input, lang, code) {
  try {
    const problem = await fetchProblemData(input);

    const problemFolder = `${problem.id}-${slugify(problem.title)}`;
    const dsaFolders = resolveDSAFolders(problem.tags);

    const ROOT_DSA_FOLDER = "Leetcode DSA";

    for (const dsa of dsaFolders) {
      const basePath = path.join(process.cwd(), ROOT_DSA_FOLDER, dsa);
      const finalPath = path.join(basePath, problemFolder);

      fs.mkdirSync(finalPath, { recursive: true });

      const readme = generateReadme(problem, code, lang);
      fs.writeFileSync(path.join(finalPath, "README.md"), readme);
        updateTopicReadme(basePath, problem);

      console.log(`✅ Added → ${ROOT_DSA_FOLDER}/${dsa}/${problemFolder}`);
    }

    updateRootReadme(problem);
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
