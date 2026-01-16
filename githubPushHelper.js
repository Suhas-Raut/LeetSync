import fs from "fs";
import path from "path";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

/**
 * Recursively push a folder to GitHub.
 * Converts Windows backslashes to forward slashes for API.
 * @param {string} localFolder - Local folder path
 * @param {string} repoPath - Path inside the repo
 */
export async function pushFolderRecursive(localFolder, repoPath) {
  const files = fs.readdirSync(localFolder);

  for (const file of files) {
    const fullPath = path.join(localFolder, file);
    const targetPath = path.posix.join(repoPath.split(path.sep).join("/"), file); // Always forward slash

    if (fs.statSync(fullPath).isDirectory()) {
      await pushFolderRecursive(fullPath, targetPath);
    } else {
      const content = fs.readFileSync(fullPath, "utf-8");
      try {
        await octokit.repos.createOrUpdateFileContents({
          owner: process.env.GITHUB_REPO.split("/")[0],
          repo: process.env.GITHUB_REPO.split("/")[1],
          path: targetPath,
          message: `📘 Add ${file}`,
          content: Buffer.from(content).toString("base64"),
          branch: "main",
        });
      } catch (err) {
        console.error(`❌ Failed to push ${targetPath}:`, err.message);
      }
    }
  }
} // <- Make sure this closing brace exists
