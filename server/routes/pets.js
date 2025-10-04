const express = require("express");
const router = express.Router();

// GET /api/pets - Get all pets
router.get("/", (req, res) => {
  const query = "SELECT * FROM pets ORDER BY name";

  req.db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error fetching pets:", err.message);
      return res.status(500).json({ error: "Failed to fetch pets" });
    }
    res.json(rows);
  });
});

// GET /api/pets/:id - Get single pet with logs
router.get("/:id", (req, res) => {
  const petId = parseInt(req.params.id);

  if (isNaN(petId)) {
    return res.status(400).json({ error: "Invalid pet ID" });
  }

  // Get pet details
  const petQuery = "SELECT * FROM pets WHERE id = ?";
  req.db.get(petQuery, [petId], (err, pet) => {
    if (err) {
      console.error("Error fetching pet:", err.message);
      return res.status(500).json({ error: "Failed to fetch pet" });
    }

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    // Get pet's activity logs
    const logsQuery =
      "SELECT * FROM activity_logs WHERE pet_id = ? ORDER BY date DESC";
    req.db.all(logsQuery, [petId], (err, logs) => {
      if (err) {
        console.error("Error fetching pet logs:", err.message);
        return res.status(500).json({ error: "Failed to fetch pet logs" });
      }

      res.json({
        ...pet,
        logs: logs,
      });
    });
  });
});

// POST /api/pets - Add new pet
router.post("/", (req, res) => {
  const { name, species, breed, birthday, photo } = req.body;

  // Validate required fields
  if (!name || !species) {
    return res.status(400).json({ error: "Name and species are required" });
  }

  const query =
    "INSERT INTO pets (name, species, breed, birthday, photo) VALUES (?, ?, ?, ?, ?)";

  req.db.run(
    query,
    [name, species, breed || null, birthday || null, photo || null],
    function (err) {
      if (err) {
        console.error("Error creating pet:", err.message);
        return res.status(500).json({ error: "Failed to create pet" });
      }

      res.status(201).json({
        id: this.lastID,
        name,
        species,
        breed,
        birthday,
        photo,
      });
    }
  );
});

// PUT /api/pets/:id - Update pet info
router.put("/:id", (req, res) => {
  const petId = parseInt(req.params.id);
  const { name, species, breed, birthday, photo } = req.body;

  if (isNaN(petId)) {
    return res.status(400).json({ error: "Invalid pet ID" });
  }

  // Validate required fields
  if (!name || !species) {
    return res.status(400).json({ error: "Name and species are required" });
  }

  const query =
    "UPDATE pets SET name = ?, species = ?, breed = ?, birthday = ?, photo = ? WHERE id = ?";

  req.db.run(
    query,
    [name, species, breed || null, birthday || null, photo || null, petId],
    function (err) {
      if (err) {
        console.error("Error updating pet:", err.message);
        return res.status(500).json({ error: "Failed to update pet" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Pet not found" });
      }

      res.json({
        id: petId,
        name,
        species,
        breed,
        birthday,
        photo,
      });
    }
  );
});

// DELETE /api/pets/:id - Delete pet (and its logs)
router.delete("/:id", (req, res) => {
  const petId = parseInt(req.params.id);

  if (isNaN(petId)) {
    return res.status(400).json({ error: "Invalid pet ID" });
  }

  // First check if pet exists
  const checkQuery = "SELECT id FROM pets WHERE id = ?";
  req.db.get(checkQuery, [petId], (err, pet) => {
    if (err) {
      console.error("Error checking pet:", err.message);
      return res.status(500).json({ error: "Failed to check pet" });
    }

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    // Delete pet (logs will be deleted automatically due to CASCADE)
    const deleteQuery = "DELETE FROM pets WHERE id = ?";
    req.db.run(deleteQuery, [petId], function (err) {
      if (err) {
        console.error("Error deleting pet:", err.message);
        return res.status(500).json({ error: "Failed to delete pet" });
      }

      res.json({ message: "Pet and all associated logs deleted successfully" });
    });
  });
});

module.exports = router;

