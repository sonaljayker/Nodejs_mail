require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const notificationRoutes = require("./routes/notificationRoutes");
const pool = require("./config/db");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(express.json());
app.use(morgan("dev"));

/* ---------------- ROUTES ---------------- */

app.use("/api", notificationRoutes);

/* ---------------- DATABASE CHECK ---------------- */

const startServer = async () => {
  try {

    // test postgres connection
    await pool.query("SELECT 1");

    console.log("PostgreSQL connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });

  } catch (err) {

    console.error("Database connection failed:", err);
    process.exit(1);

  }
};

startServer();