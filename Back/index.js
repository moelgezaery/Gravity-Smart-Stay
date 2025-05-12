import './config/loadEnv.js';
// app1.server.js
import express from "express";
import cors from "cors";
import initApp from "./src/modules/app.router.js";
import { connectToMasterDB, masterDB } from "./DB/connection.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Master DB for App 1
connectToMasterDB()
  .then(() => {
    app.locals.db = masterDB; // Set the database connection

    // Initialize routes and middleware
    initApp(app, express);

    // Start server on port 3000
    app.listen(3000, () => {
      console.log("🚀 App 1 running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start App 1:", err.message);
  });


