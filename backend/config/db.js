import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = path.resolve("backend/data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const databaseFile = path.join(dataDir, "leetsync.db");

const db = new Database(databaseFile);

// Tables
db.prepare(`
  CREATE TABLE IF NOT EXISTS problems (
    id TEXT PRIMARY KEY,
    title TEXT,
    difficulty TEXT,
    tags TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS counters (
    difficulty TEXT PRIMARY KEY,
    count INTEGER DEFAULT 0
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS tag_counts (
    tag TEXT PRIMARY KEY,
    count INTEGER DEFAULT 0
  )
`).run();

export { db };
