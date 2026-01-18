import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { runLeetSync } from "./generateAll.js";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

// server.js (POST /run)
app.post("/run", async (req, res) => {
  const { url, lang, code } = req.body;

  if (!url || !lang || !code) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const result = await runLeetSync({ url, lang, code });
    // send logs to frontend
    res.json({ success: true, logs: result.logs || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, logs: [], error: err.message });
  }
});


app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🟢 Backend running at http://localhost:${PORT}`);
});
