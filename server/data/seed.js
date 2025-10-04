const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Mock data
const mockPets = [
  {
    name: "Bella",
    species: "Dog",
    breed: "Golden Retriever",
    birthday: "2020-06-10",
    photo: "https://example.com/bella.jpg",
  },
  {
    name: "Milo",
    species: "Cat",
    breed: "Siamese",
    birthday: "2021-04-12",
    photo: "https://example.com/milo.jpg",
  },
  {
    name: "Luna",
    species: "Cat",
    breed: "Persian",
    birthday: "2019-08-15",
    photo: "https://example.com/luna.jpg",
  },
  {
    name: "Max",
    species: "Dog",
    breed: "Labrador",
    birthday: "2022-03-20",
    photo: "https://example.com/max.jpg",
  },
];

const mockLogs = [
  {
    date: "2025-10-01",
    pet_id: 1,
    activity: "Walk",
    note: "Morning walk in park",
  },
  {
    date: "2025-10-02",
    pet_id: 2,
    activity: "Vet Visit",
    note: "Vaccination done",
  },
  {
    date: "2025-10-03",
    pet_id: 1,
    activity: "Meal",
    note: "Had chicken and rice",
  },
  {
    date: "2025-10-04",
    pet_id: 3,
    activity: "Grooming",
    note: "Brushed and cleaned",
  },
  {
    date: "2025-10-05",
    pet_id: 4,
    activity: "Playtime",
    note: "Played fetch in backyard",
  },
  {
    date: "2025-10-06",
    pet_id: 2,
    activity: "Meal",
    note: "Special diet food",
  },
  {
    date: "2025-10-07",
    pet_id: 1,
    activity: "Vet Visit",
    note: "Annual checkup",
  },
  { date: "2025-10-08", pet_id: 3, activity: "Walk", note: "Evening stroll" },
  {
    date: "2025-10-09",
    pet_id: 4,
    activity: "Training",
    note: "Basic commands practice",
  },
  {
    date: "2025-10-10",
    pet_id: 1,
    activity: "Meal",
    note: "Regular feeding time",
  },
];

// Function to seed the database
function seedDatabase(dbPath) {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Error opening database for seeding:", err.message);
      return;
    }
    console.log("Connected to database for seeding");
  });

  // Check if pets table is empty
  db.get("SELECT COUNT(*) as count FROM pets", (err, row) => {
    if (err) {
      console.error("Error checking pets count:", err.message);
      db.close();
      return;
    }

    if (row.count === 0) {
      console.log("Seeding database with mock data...");

      // Insert mock pets
      const insertPet = db.prepare(
        "INSERT INTO pets (name, species, breed, birthday, photo) VALUES (?, ?, ?, ?, ?)"
      );

      mockPets.forEach((pet) => {
        insertPet.run(
          [pet.name, pet.species, pet.breed, pet.birthday, pet.photo],
          function (err) {
            if (err) {
              console.error("Error inserting pet:", err.message);
            } else {
              console.log(`Inserted pet: ${pet.name} with ID: ${this.lastID}`);
            }
          }
        );
      });

      insertPet.finalize();

      // Insert mock activity logs
      const insertLog = db.prepare(
        "INSERT INTO activity_logs (date, pet_id, activity, note) VALUES (?, ?, ?, ?)"
      );

      mockLogs.forEach((log) => {
        insertLog.run(
          [log.date, log.pet_id, log.activity, log.note],
          function (err) {
            if (err) {
              console.error("Error inserting log:", err.message);
            } else {
              console.log(
                `Inserted log: ${log.activity} for pet ID: ${log.pet_id}`
              );
            }
          }
        );
      });

      insertLog.finalize();
      console.log("Database seeding completed!");
    } else {
      console.log("Database already contains data, skipping seed");
    }

    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Database connection closed");
      }
    });
  });
}

// Function to clear database (for testing)
function clearDatabase(dbPath) {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Error opening database for clearing:", err.message);
      return;
    }
    console.log("Connected to database for clearing");
  });

  db.serialize(() => {
    db.run("DELETE FROM activity_logs");
    db.run("DELETE FROM pets");
    console.log("Database cleared");
  });

  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database connection closed");
    }
  });
}

module.exports = {
  mockPets,
  mockLogs,
  seedDatabase,
  clearDatabase,
};

