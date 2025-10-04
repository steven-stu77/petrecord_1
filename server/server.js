const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Import routes
const petsRoutes = require("./routes/pets");
const logsRoutes = require("./routes/logs");
const { seedDatabase } = require("./data/seed");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, "db", "petrecord.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");
    initializeDatabase();
  }
});

// Initialize database with tables and seed data
function initializeDatabase() {
  // Create pets table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      species TEXT NOT NULL,
      breed TEXT,
      birthday TEXT,
      photo TEXT
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating pets table:", err.message);
      } else {
        console.log("Pets table created/verified");
      }
    }
  );

  // Create activity_logs table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS activity_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      pet_id INTEGER NOT NULL,
      activity TEXT NOT NULL,
      note TEXT,
      FOREIGN KEY (pet_id) REFERENCES pets (id) ON DELETE CASCADE
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating activity_logs table:", err.message);
      } else {
        console.log("Activity logs table created/verified");
        seedDatabaseIfEmpty();
      }
    }
  );
}

// Seed database with mock data if empty
function seedDatabaseIfEmpty() {
  // Check if pets table is empty
  db.get("SELECT COUNT(*) as count FROM pets", (err, row) => {
    if (err) {
      console.error("Error checking pets count:", err.message);
      return;
    }

    if (row.count === 0) {
      console.log("Database is empty, seeding with mock data...");
      seedDatabase(dbPath);
    } else {
      console.log("Database already contains data, skipping seed");
    }
  });
}

// Make database available to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use("/api/pets", petsRoutes);
app.use("/api/logs", logsRoutes);

// Stats endpoint
app.get("/api/stats", (req, res) => {
  const query = `
    SELECT p.name, l.activity, COUNT(*) as count
    FROM pets p
    LEFT JOIN activity_logs l ON p.id = l.pet_id
    GROUP BY p.name, l.activity
    ORDER BY p.name, l.activity
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error fetching stats:", err.message);
      return res.status(500).json({ error: "Failed to fetch statistics" });
    }

    // Transform data into the requested format
    const stats = {};
    rows.forEach((row) => {
      if (!stats[row.name]) {
        stats[row.name] = {};
      }
      if (row.activity) {
        stats[row.name][row.activity] = row.count;
      }
    });

    res.json(stats);
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "PetRecord API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`PetRecord server running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down server...");
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database connection closed");
    }
    process.exit(0);
  });
});

module.exports = app;
