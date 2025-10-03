import { useState } from "react";
import { motion } from "framer-motion";
import { PetFormDialog } from "./PetFormDialog";

export function PetRecords({ onNavigate }) {
  const [pets, setPets] = useState([
    {
      id: "1",
      name: "Bella",
      species: "Dog",
      breed: "Golden Retriever",
      birthday: "2020-03-15",
      photo:
        "https://images.unsplash.com/photo-1687211818108-667d028f1ae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2d8ZW58MXx8fHwxNzU5Mzc4Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "2",
      name: "Whiskers",
      species: "Cat",
      breed: "Orange Tabby",
      birthday: "2019-07-22",
      photo:
        "https://images.unsplash.com/photo-1712592000997-ea7ccaeb9725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjB0YWJieSUyMGNhdHxlbnwxfHx8fDE3NTkzNzgzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "3",
      name: "Charlie",
      species: "Dog",
      breed: "Beagle",
      birthday: "2021-11-08",
      photo:
        "https://images.unsplash.com/photo-1606833694770-40a04762ac16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFnbGUlMjBwdXBweXxlbnwxfHx8fDE3NTk0MTI4MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  const handleAddPet = () => {
    setEditingPet(null);
    setDialogOpen(true);
  };

  const handleEditPet = (pet) => {
    setEditingPet(pet);
    setDialogOpen(true);
  };

  const handleDeletePet = (id) => {
    setPets(pets.filter((p) => p.id !== id));
  };

  const handleSavePet = (petData) => {
    if (petData.id) {
      setPets(pets.map((p) => (p.id === petData.id ? petData : p)));
    } else {
      const newPet = {
        ...petData,
        id: Date.now().toString(),
      };
      setPets([...pets, newPet]);
    }
  };

  const handlePetClick = (pet) => {
    onNavigate("logs");
  };

  return (
    <div
      style={{ minHeight: "100vh", background: "#FEF9F5", padding: "2rem 0" }}
    >
      <div style={{ margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>
              Your Pets
            </h1>
            <p style={{ color: "#6b7280" }}>
              Manage your furry friends and their records
            </p>
          </div>
          <button
            onClick={handleAddPet}
            style={{
              background: "linear-gradient(to right, #bbf7d0, #bfdbfe)",
              color: "#065f46",
              borderRadius: "30px",
              padding: "0.5rem 1.5rem",
              display: "flex",
              alignItems: "center",
              transition: "all 0.3s ease",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "1.25rem", marginRight: "0.5rem" }}>
              +
            </span>
            Add Pet
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {pets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                y: -4,
              }}
            >
              <div
                onClick={() => handlePetClick(pet)}
                style={{
                  background: "white",
                  borderRadius: "0.5rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  padding: "1.5rem",
                  cursor: "pointer",
                  border: "1px solid #f3f4f6",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <motion.div
                  style={{
                    overflow: "hidden",
                    borderRadius: "0.5rem",
                    marginBottom: "1rem",
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={pet.photo}
                    alt={pet.name}
                    style={{
                      width: "100%",
                      height: "12rem",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=Pet+Photo";
                    }}
                  />
                </motion.div>
                <div style={{ marginBottom: "1rem" }}>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#1f2937",
                    }}
                  >
                    {pet.name}
                  </h3>
                  <p style={{ color: "#4b5563" }}>
                    {pet.species} • {pet.breed}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    Born: {new Date(pet.birthday).toLocaleDateString()}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid #f3f4f6",
                  }}
                >
                  {/* Edit Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPet(pet);
                    }}
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      background: "#FEF9F5",
                      color: "black",
                      border: "none",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f7eda8ff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#FEF9F5")
                    }
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          `Are you sure you want to delete ${pet.name}?`
                        )
                      ) {
                        handleDeletePet(pet.id);
                      }
                    }}
                    style={{
                      width: "2rem",
                      height: "2rem",
                      background: "#FCA5A5",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      fontSize: "1rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f55c5cff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#FCA5A5")
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <PetFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSavePet}
        editingPet={editingPet}
      />
    </div>
  );
}
