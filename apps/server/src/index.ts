import express from "express";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "server", ts: new Date().toISOString() });
});

const server = app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

// Graceful shutdown handling
process.on("SIGINT", () => {
  console.log("\nShutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("\nShutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
