import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Global error handling 
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION  Shutting down...");
  console.error(err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION Shutting down...");
  console.error(err);
  process.exit(1);
});
