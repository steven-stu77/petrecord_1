import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Simple UI Components
const Button = ({ children, onClick, style: customStyle, size, variant }) => {
  const baseStyle = {
    padding: "8px 16px",
    borderRadius: "6px",
    fontWeight: "500",
    transition:
      "background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, transform 0.15s ease-in-out", // For common transitions
    cursor: "pointer",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
  };

  const variantStyle =
    variant === "ghost"
      ? {
          backgroundColor: "transparent",
          color:
            "initial" /* hover bg would be set by JS event listeners for pure inline */,
        }
      : { backgroundColor: "rgb(59, 130, 246)", color: "white" };

  const sizeStyle =
    size === "sm" ? { padding: "4px 8px", fontSize: "0.875rem" } : {};

  const combinedStyle = {
    ...baseStyle,
    ...variantStyle,
    ...sizeStyle,
    ...customStyle,
  };

  return (
    <button onClick={onClick} style={combinedStyle}>
      {children}
    </button>
  );
};

const Input = ({
  placeholder,
  value,
  onChange,
  style: customStyle,
  type = "text",
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={{
      padding: "8px 12px",
      border: "1px solid rgb(209, 213, 219)",
      borderRadius: "6px",
      outline: "none",
      boxShadow: "0 0 0 0 transparent", // Placeholder for focus ring
      width: "100%", // added for consistency if not specified
      ...customStyle,
    }}
  />
);

const Select = ({ value, onValueChange, children, style: customStyle }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      style={{
        padding: "8px 12px",
        border: "1px solid rgb(209, 213, 219)",
        borderRadius: "6px",
        outline: "none",
        boxShadow: "0 0 0 0 transparent",
        backgroundColor: "white",
        appearance: "none", // To remove default select arrow in some browsers
        width: "100%", // added for consistency if not specified
        ...customStyle,
      }}
    >
      {children}
    </select>
  );
};

const SelectTrigger = ({ children, style: customStyle }) => (
  <div style={customStyle}>{children}</div>
);
const SelectValue = ({ placeholder }) => (
  <span style={{ color: "rgb(107, 114, 128)" }}>{placeholder}</span>
);
const SelectContent = ({ children }) => <>{children}</>;
const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const Table = ({ children }) => (
  <div style={{ overflowX: "auto" }}>
    <table
      style={{
        minWidth: "100%",
        borderCollapse: "collapse",
        borderSpacing: "0",
      }}
    >
      {children}
    </table>
  </div>
);
const TableHeader = ({ children }) => (
  <thead style={{ backgroundColor: "rgb(249, 250, 251)" }}>{children}</thead>
);
const TableBody = ({ children }) => (
  <tbody style={{ backgroundColor: "white" }}>{children}</tbody>
);
const TableRow = ({ children }) => (
  <tr
    style={
      {
        /* hover:bg-gray-50 not directly inline */
      }
    }
  >
    {children}
  </tr>
);
const TableHead = ({ children, style: customStyle }) => (
  <th
    style={{
      padding: "12px 24px",
      textAlign: "left",
      fontSize: "0.75rem",
      fontWeight: "500",
      color: "rgb(107, 114, 128)",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      ...customStyle,
    }}
  >
    {children}
  </th>
);
const TableCell = ({ children, style: customStyle }) => (
  <td
    style={{
      padding: "16px 24px",
      whiteSpace: "nowrap",
      fontSize: "0.875rem",
      color: "rgb(17, 24, 39)",
      borderBottom: "1px solid rgb(229, 231, 235)", // For divide-y
      ...customStyle,
    }}
  >
    {children}
  </td>
);

const Badge = ({ children, style: customStyle }) => (
  <span
    style={{
      display: "inline-flex",
      padding: "4px 8px",
      fontSize: "0.75rem",
      fontWeight: "600",
      borderRadius: "9999px",
      ...customStyle,
    }}
  >
    {children}
  </span>
);

// Simple icon components (simplified, using text emojis)
const Plus = ({ style: customStyle }) => <span style={customStyle}>+</span>;
const Search = ({ style: customStyle }) => <span style={customStyle}>🔍</span>;
const Edit = ({ style: customStyle }) => <span style={customStyle}>✏️</span>;
const Trash2 = ({ style: customStyle }) => <span style={customStyle}>🗑️</span>;
const Filter = ({ style: customStyle }) => <span style={customStyle}>🔧</span>;

// Simple Dialog Component
const LogFormDialog = ({ open, onClose, onSave, editingLog, pets }) => {
  const [formData, setFormData] = useState({
    petId: "",
    petName: "",
    activity: "Walk",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (editingLog) {
      setFormData({
        petId: editingLog.petId,
        petName: editingLog.petName,
        activity: editingLog.activity,
        note: editingLog.note,
        date: editingLog.date,
      });
    } else {
      setFormData({
        petId: "",
        petName: "",
        activity: "Walk",
        note: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [editingLog, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: editingLog?.id });
    onClose();
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "448px",
          width: "100%",
          margin: "0 16px",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            marginBottom: "16px",
          }}
        >
          {editingLog ? "Edit Log" : "Add New Log"}
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <Select
            value={formData.petId}
            onValueChange={(value) => {
              const pet = pets.find((p) => p.id === value);
              setFormData({
                ...formData,
                petId: value,
                petName: pet?.name || "",
              });
            }}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid rgb(209, 213, 219)",
              borderRadius: "6px",
            }}
            required
          >
            <option value="">Select Pet</option>
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name}
              </option>
            ))}
          </Select>
          <Select
            value={formData.activity}
            onValueChange={(value) =>
              setFormData({ ...formData, activity: value })
            }
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid rgb(209, 213, 219)",
              borderRadius: "6px",
            }}
          >
            <option value="Walk">Walk</option>
            <option value="Feeding">Feeding</option>
            <option value="Playtime">Playtime</option>
            <option value="Grooming">Grooming</option>
            <option value="Vet Visit">Vet Visit</option>
            <option value="Training">Training</option>
            <option value="Medication">Medication</option>
          </Select>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid rgb(209, 213, 219)",
              borderRadius: "6px",
            }}
            required
          />
          <textarea
            placeholder="Add a note..."
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid rgb(209, 213, 219)",
              borderRadius: "6px",
              minHeight: "80px",
              resize: "vertical", // Allow vertical resizing of textarea
            }}
            rows={3}
            required
          />
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
          >
            <Button
              type="button"
              onClick={onClose}
              style={{
                padding: "8px 16px",
                color: "rgb(75, 85, 99)",
                backgroundColor: "rgb(229, 231, 235)",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              style={{
                padding: "8px 16px",
                backgroundColor: "rgb(59, 130, 246)",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export function BehaviorLogs() {
  const [logs, setLogs] = useState([
    {
      id: "1",
      date: "2025-10-01",
      activity: "Walk",
      note: "Morning walk in the park, very energetic",
      petName: "Bella",
      petId: "1",
    },
    {
      id: "2",
      date: "2025-10-01",
      activity: "Feeding",
      note: "Breakfast - ate all food",
      petName: "Bella",
      petId: "1",
    },
    {
      id: "3",
      date: "2025-10-01",
      activity: "Playtime",
      note: "Played with favorite toy for 30 minutes",
      petName: "Whiskers",
      petId: "2",
    },
    {
      id: "4",
      date: "2025-09-30",
      activity: "Vet Visit",
      note: "Annual checkup - all healthy!",
      petName: "Charlie",
      petId: "3",
    },
    {
      id: "5",
      date: "2025-09-30",
      activity: "Walk",
      note: "Evening walk, 20 minutes",
      petName: "Charlie",
      petId: "3",
    },
  ]);

  const pets = [
    { id: "1", name: "Bella" },
    { id: "2", name: "Whiskers" },
    { id: "3", name: "Charlie" },
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPet, setFilterPet] = useState("all");
  const [filterActivity, setFilterActivity] = useState("all");

  const handleAddLog = () => {
    setEditingLog(null); // Ensure no log is being edited for "add new"
    setDialogOpen(true);
  };

  const handleEditLog = (log) => {
    setEditingLog(log);
    setDialogOpen(true);
  };

  const handleDeleteLog = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  const handleSaveLog = (logData) => {
    if (logData.id) {
      setLogs(logs.map((log) => (log.id === logData.id ? logData : log)));
    } else {
      const newLog = {
        ...logData,
        id: Date.now().toString(),
      };
      setLogs([newLog, ...logs]);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.petName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPet = filterPet === "all" || log.petId === filterPet;
    const matchesActivity =
      filterActivity === "all" || log.activity === filterActivity;
    return matchesSearch && matchesPet && matchesActivity;
  });

  const activityColors = {
    Walk: { backgroundColor: "rgb(221, 240, 255)", color: "rgb(29, 78, 216)" }, // bg-blue-100 text-blue-900
    Feeding: {
      backgroundColor: "rgb(220, 255, 220)",
      color: "rgb(22, 101, 52)",
    }, // bg-green-100 text-green-900
    Playtime: {
      backgroundColor: "rgb(255, 250, 220)",
      color: "rgb(120, 53, 15)",
    }, // bg-yellow-100 text-yellow-900
    Grooming: {
      backgroundColor: "rgb(255, 220, 240)",
      color: "rgb(143, 0, 81)",
    }, // bg-pink-100 text-pink-900
    "Vet Visit": {
      backgroundColor: "rgb(240, 220, 255)",
      color: "rgb(88, 28, 135)",
    }, // bg-purple-100 text-purple-900
    Training: {
      backgroundColor: "rgb(255, 230, 200)",
      color: "rgb(140, 48, 0)",
    }, // bg-orange-100 text-orange-900
    Medication: {
      backgroundColor: "rgb(255, 220, 220)",
      color: "rgb(153, 27, 27)",
    }, // bg-red-100 text-red-900
    Other: { backgroundColor: "rgb(243, 244, 246)", color: "rgb(17, 24, 39)" }, // bg-gray-100 text-gray-900
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "rgb(249, 250, 251)",
        paddingBottom: "32px",
        paddingTop: "32px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2.25rem",
                marginBottom: "8px",
                fontWeight: "700",
                color: "rgb(17, 24, 39)",
              }}
            >
              Activity Logs
            </h1>
            <p style={{ color: "rgb(107, 114, 128)" }}>
              Track and manage daily activities for your pets
            </p>
          </div>
          {/* add button */}
          <Button
            onClick={handleAddLog}
            style={{
              background:
                "linear-gradient(to right, rgb(74, 222, 128), rgb(96, 165, 250))", // from-green-400 to-blue-400
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // hover:shadow-xl (initial state)
              color: "white",
              borderRadius: "9999px",
              padding: "8px 24px",
              // for hover:scale-105
            }}
          >
            <Plus
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            Add Log
          </Button>
        </motion.div>
        {/* bar */}
        <div
          style={{
            background:
              "linear-gradient(to bottom right, white, rgb(249, 250, 251))",
            borderRadius: "24px",
            padding: "24px",
            marginBottom: "24px",
            border: "1px solid rgb(229, 231, 235)",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <Filter
              style={{
                width: "20px",
                height: "20px",
                color: "rgb(107, 114, 128)",
              }}
            />
            <span style={{ color: "rgb(75, 85, 99)" }}>Filters</span>
          </div>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div
              style={{
                position: "relative",
                flex: "1 1 220px",
                minWidth: "180px",
              }}
            >
              <Search
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "16px",
                  height: "16px",
                  color: "rgb(107, 114, 128)",
                }}
              />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: "40px", borderRadius: "12px" }}
              />
            </div>
            <div
              style={{
                flex: "1 1 180px",
                minWidth: "140px",
              }}
            >
              <Select
                value={filterPet}
                onValueChange={setFilterPet}
                style={{ borderRadius: "12px" }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by pet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pets</SelectItem>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      {pet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div
              style={{
                flex: "1 1 180px",
                minWidth: "140px",
              }}
            >
              <Select
                value={filterActivity}
                onValueChange={setFilterActivity}
                style={{ borderRadius: "12px" }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="Walk">Walk</SelectItem>
                  <SelectItem value="Feeding">Feeding</SelectItem>
                  <SelectItem value="Playtime">Playtime</SelectItem>
                  <SelectItem value="Grooming">Grooming</SelectItem>
                  <SelectItem value="Vet Visit">Vet Visit</SelectItem>
                  <SelectItem value="Training">Training</SelectItem>
                  <SelectItem value="Medication">Medication</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            backgroundColor: "white",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgb(229, 231, 235)",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            transition: "box-shadow 0.3s ease-in-out", // For hover:shadow-lg
          }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Pet</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Note</TableHead>
                <TableHead style={{ textAlign: "right" }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {new Date(log.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{log.petName}</TableCell>
                  <TableCell>
                    <Badge
                      style={
                        activityColors[log.activity] || activityColors.Other
                      }
                    >
                      {log.activity}
                    </Badge>
                  </TableCell>
                  <TableCell
                    style={{
                      maxWidth: "448px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {log.note}
                  </TableCell>
                  <TableCell style={{ textAlign: "right" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "8px",
                      }}
                    >
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditLog(log)}
                        style={{
                          borderRadius: "9999px",
                          color: "rgb(75, 85, 99)",
                        }}
                      >
                        <Edit style={{ width: "16px", height: "16px" }} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteLog(log.id)}
                        style={{
                          borderRadius: "9999px",
                          color: "rgb(220, 38, 38)",
                        }}
                      >
                        <Trash2 style={{ width: "16px", height: "16px" }} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredLogs.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px" }}>
              <p style={{ color: "rgb(107, 114, 128)" }}>
                No logs found matching your filters
              </p>
            </div>
          )}
        </motion.div>
      </div>

      <LogFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveLog}
        editingLog={editingLog}
        pets={pets}
      />
    </div>
  );
}
