import express from "express";
import cors from "cors";
import { generateAll } from "./index.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/push", async (req, res) => {
  try {
    const { input, lang, code } = req.body;

    if (!input || !lang || !code) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await generateAll(input, lang, code);

    // ✅ SEND LOGS DIRECTLY TO FRONTEND
    res.json({
  success: true,
  logs: result.logs,   // 👈 array of strings
});


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
