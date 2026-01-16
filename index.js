import fs from "fs";
import path from "path";
import readline from "readline";
import { execSync } from "child_process";
import dotenv from "dotenv";

import { fetchProblemData } from "./fetchProblem.js";
import { generateReadme } from "./generateReadme.js";
import { TAG_TO_DSA } from "./tagMapper.js";
import { updateRootReadme } from "./updateRootReadme.js";
import { pushProblemLocal } from "./githubPushHelper.js";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter LeetCode problem number OR URL: ", (input) => {
  rl.question("Enter language (js/cpp/python): ", (lang) => {
    console.log("\nPaste your code below.");
    console.log("Type END on a new line when finished:\n");

    let code = "";

    rl.on("line", async (line) => {
      if (line.trim() === "END") {
        await generateAll(input, lang, code);
        rl.close();
      } else {
        code += line + "\n";
      }
    });
  });
});

async function generateAll(input, lang, code) {
  try {
    const problem = await fetchProblemData(input);

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

    // Update root README/dashboard
    updateRootReadme(problem, dsaFolders);

    // Local git commit + push
    pushProblemLocal(problem.id, problem.title);

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

/* ------------------ HELPERS ------------------ */

function resolveDSAFolders(tags = []) {
  const folders = new Set();

  for (const tag of tags) {
    if (TAG_TO_DSA[tag]) {
      folders.add(TAG_TO_DSA[tag]);
    }
  }

  return folders.size ? [...folders] : ["Misc"];
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
