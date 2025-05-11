// app2.server.js
import express from "express";
import cors from "cors";
import initApp from "./src/modules/app2.router.js";
import { connectToItisalDB, itisalDB } from "./DB/connection.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Itisal DB for App 2
connectToItisalDB()
  .then(() => {
    app.locals.db = itisalDB; // Set the database connection

    // Initialize routes and middleware
    initApp(app, express);

    // Handle production build if needed
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "client/build")));
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
      });
    }

    // Start server on port 5000
    app.listen(5000, () => {
      console.log("🚀 App 2 running on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start App 2:", err.message);
  });
