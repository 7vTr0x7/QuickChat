import express from "express";
import { config } from "dotenv";
import { initializeDatabase } from "./db/db.connection.js";

config();
const app = express();
app.use(express.json());

initializeDatabase();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
