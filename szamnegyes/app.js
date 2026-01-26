import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/fours", (req, res) => {
  const data = req.body;

  if (!Array.isArray(data) || data.length !== 4) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const [a, b, c, d] = data;

  if ([a, b, c, d].some((n) => typeof n !== "number" || n < 0)) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    const result = db
      .prepare(
        `
      INSERT INTO fours (a, b, c, d)
      VALUES (?, ?, ?, ?)
    `,
      )
      .run(a, b, c, d);

    res.json({
      id: result.lastInsertRowid,
      values: [a, b, c, d],
    });
  } catch {
    res.status(400).json({ error: "Invalid data" });
  }
});

app.get("/fours", (req, res) => {
  const rows = db.prepare("SELECT id, a, b, c, d FROM fours").all();
  res.json(rows);
});

app.get("/fours/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  const row = db.prepare("SELECT a, b, c, d FROM fours WHERE id = ?").get(id);

  if (!row) return res.status(404).json({ error: "Not found" });

  res.json(row);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
