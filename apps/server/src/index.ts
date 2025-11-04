import 'dotenv/config';
import express from "express";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "server", ts: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
