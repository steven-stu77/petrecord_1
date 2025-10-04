const express = require("express");
const router = express.Router();

// GET /api/logs - Get all activity logs (join pets)
router.get("/", (req, res) => {
  const query = `
    SELECT 
      l.id,
      l.date,
      l.pet_id,
      l.activity,
      l.note,
      p.name as pet_name,
      p.species,
      p.breed
    FROM activity_logs l
    LEFT JOIN pets p ON l.pet_id = p.id
    ORDER BY l.date DESC, l.id DESC
  `;

  req.db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error fetching logs:", err.message);
      return res.status(500).json({ error: "Failed to fetch activity logs" });
    }
    res.json(rows);
  });
});

// GET /api/logs/:id - Get single log
router.get("/:id", (req, res) => {
  const logId = parseInt(req.params.id);

  if (isNaN(logId)) {
    return res.status(400).json({ error: "Invalid log ID" });
  }

  const query = `
    SELECT 
      l.id,
      l.date,
      l.pet_id,
      l.activity,
      l.note,
      p.name as pet_name,
      p.species,
      p.breed
    FROM activity_logs l
    LEFT JOIN pets p ON l.pet_id = p.id
    WHERE l.id = ?
  `;

  req.db.get(query, [logId], (err, row) => {
    if (err) {
      console.error("Error fetching log:", err.message);
      return res.status(500).json({ error: "Failed to fetch activity log" });
    }

    if (!row) {
      return res.status(404).json({ error: "Activity log not found" });
    }

    res.json(row);
  });
});

// POST /api/logs - Add new log
router.post("/", (req, res) => {
  const { date, pet_id, activity, note } = req.body;

  // Validate required fields
  if (!date || !pet_id || !activity) {
    return res
      .status(400)
      .json({ error: "Date, pet_id, and activity are required" });
  }

  // Validate pet_id exists
  const petCheckQuery = "SELECT id FROM pets WHERE id = ?";
  req.db.get(petCheckQuery, [pet_id], (err, pet) => {
    if (err) {
      console.error("Error checking pet:", err.message);
      return res.status(500).json({ error: "Failed to validate pet" });
    }

    if (!pet) {
      return res.status(400).json({ error: "Pet not found" });
    }

    // Insert new log
    const query =
      "INSERT INTO activity_logs (date, pet_id, activity, note) VALUES (?, ?, ?, ?)";

    req.db.run(query, [date, pet_id, activity, note || null], function (err) {
      if (err) {
        console.error("Error creating log:", err.message);
        return res.status(500).json({ error: "Failed to create activity log" });
      }

      res.status(201).json({
        id: this.lastID,
        date,
        pet_id,
        activity,
        note,
      });
    });
  });
});

// PUT /api/logs/:id - Update log
router.put("/:id", (req, res) => {
  const logId = parseInt(req.params.id);
  const { date, pet_id, activity, note } = req.body;

  if (isNaN(logId)) {
    return res.status(400).json({ error: "Invalid log ID" });
  }

  // Validate required fields
  if (!date || !pet_id || !activity) {
    return res
      .status(400)
      .json({ error: "Date, pet_id, and activity are required" });
  }

  // Validate pet_id exists
  const petCheckQuery = "SELECT id FROM pets WHERE id = ?";
  req.db.get(petCheckQuery, [pet_id], (err, pet) => {
    if (err) {
      console.error("Error checking pet:", err.message);
      return res.status(500).json({ error: "Failed to validate pet" });
    }

    if (!pet) {
      return res.status(400).json({ error: "Pet not found" });
    }

    // Update log
    const query =
      "UPDATE activity_logs SET date = ?, pet_id = ?, activity = ?, note = ? WHERE id = ?";

    req.db.run(
      query,
      [date, pet_id, activity, note || null, logId],
      function (err) {
        if (err) {
          console.error("Error updating log:", err.message);
          return res
            .status(500)
            .json({ error: "Failed to update activity log" });
        }

        if (this.changes === 0) {
          return res.status(404).json({ error: "Activity log not found" });
        }

        res.json({
          id: logId,
          date,
          pet_id,
          activity,
          note,
        });
      }
    );
  });
});

// DELETE /api/logs/:id - Delete log
router.delete("/:id", (req, res) => {
  const logId = parseInt(req.params.id);

  if (isNaN(logId)) {
    return res.status(400).json({ error: "Invalid log ID" });
  }

  // First check if log exists
  const checkQuery = "SELECT id FROM activity_logs WHERE id = ?";
  req.db.get(checkQuery, [logId], (err, log) => {
    if (err) {
      console.error("Error checking log:", err.message);
      return res.status(500).json({ error: "Failed to check log" });
    }

    if (!log) {
      return res.status(404).json({ error: "Activity log not found" });
    }

    // Delete log
    const deleteQuery = "DELETE FROM activity_logs WHERE id = ?";
    req.db.run(deleteQuery, [logId], function (err) {
      if (err) {
        console.error("Error deleting log:", err.message);
        return res.status(500).json({ error: "Failed to delete activity log" });
      }

      res.json({ message: "Activity log deleted successfully" });
    });
  });
});

// GET /api/logs/pet/:petId - Get all logs for a specific pet
router.get("/pet/:petId", (req, res) => {
  const petId = parseInt(req.params.petId);

  if (isNaN(petId)) {
    return res.status(400).json({ error: "Invalid pet ID" });
  }

  const query = `
    SELECT 
      l.id,
      l.date,
      l.pet_id,
      l.activity,
      l.note,
      p.name as pet_name,
      p.species,
      p.breed
    FROM activity_logs l
    LEFT JOIN pets p ON l.pet_id = p.id
    WHERE l.pet_id = ?
    ORDER BY l.date DESC, l.id DESC
  `;

  req.db.all(query, [petId], (err, rows) => {
    if (err) {
      console.error("Error fetching pet logs:", err.message);
      return res
        .status(500)
        .json({ error: "Failed to fetch pet activity logs" });
    }
    res.json(rows);
  });
});

module.exports = router;

