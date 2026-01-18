import { generateAll } from "./scripts/index.js";

const [, , input, lang, code] = process.argv;

(async () => {
  if (!input || !lang || !code) {
    console.log("❌ Missing arguments");
    process.exit(1);
  }

  const result = await generateAll(input, lang, code);

  for (const log of result.logs) {
    console.log(log);
  }
})();
