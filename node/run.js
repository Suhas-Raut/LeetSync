import { generateAll } from "./generateAll.js";

const [, , input, lang, code] = process.argv;

if (!input || !lang || !code) {
  console.error("❌ Usage: node run.js <url> <lang> <code>");
  process.exit(1);
}

const log = (msg) => {
  console.log(msg);
};

(async () => {
  log("🟢 LeetSync Node Worker Started");
  log(`📌 CWD: ${process.cwd()}`);

  await generateAll(input, lang, code, log);

  log("🟢 Worker finished successfully");
})();
