import fs from "fs";
import Database from "better-sqlite3";

if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data", { recursive: true });
}

const db = new Database("./data/database.db");

db.prepare(
  `
CREATE TABLE IF NOT EXISTS fours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    a INTEGER NOT NULL,
    b INTEGER NOT NULL,
    c INTEGER NOT NULL,
    d INTEGER NOT NULL,
    UNIQUE (a, b, c, d)
)
`,
).run();

export default db;
