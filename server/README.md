# PetRecord SQLite Backend

A Node.js Express backend API for the PetRecord application, providing persistent data storage using SQLite.

## 🚀 Features

- **SQLite Database**: File-based persistent storage
- **RESTful API**: Full CRUD operations for pets and activity logs
- **CORS Enabled**: Ready for frontend integration
- **Data Seeding**: Automatic mock data population on first run
- **Error Handling**: Comprehensive error responses
- **Data Integrity**: Foreign key constraints with CASCADE DELETE

## 📊 Database Schema

### Pets Table

- `id` (INTEGER, Primary Key, Auto Increment)
- `name` (TEXT, Required)
- `species` (TEXT, Required)
- `breed` (TEXT, Optional)
- `birthday` (TEXT, ISO format, Optional)
- `photo` (TEXT, Optional)

### Activity Logs Table

- `id` (INTEGER, Primary Key, Auto Increment)
- `date` (TEXT, ISO format, Required)
- `pet_id` (INTEGER, Foreign Key, Required)
- `activity` (TEXT, Required)
- `note` (TEXT, Optional)

**Relationship**: One-to-many (pets → activity_logs) with CASCADE DELETE

## 🛠️ Installation

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   Or for development with auto-restart:

   ```bash
   npm run dev
   ```

## 🔌 API Endpoints

### Health Check

- `GET /api/health` - Server health status

### Pets

- `GET /api/pets` - Get all pets
- `GET /api/pets/:id` - Get single pet with logs
- `POST /api/pets` - Create new pet
- `PUT /api/pets/:id` - Update pet
- `DELETE /api/pets/:id` - Delete pet (and all logs)

### Activity Logs

- `GET /api/logs` - Get all activity logs (with pet info)
- `GET /api/logs/:id` - Get single activity log
- `POST /api/logs` - Create new activity log
- `PUT /api/logs/:id` - Update activity log
- `DELETE /api/logs/:id` - Delete activity log
- `GET /api/logs/pet/:petId` - Get all logs for specific pet

### Statistics

- `GET /api/stats` - Get activity statistics per pet

## 📝 Example Usage

### Create a Pet

```bash
curl -X POST http://localhost:5000/api/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Buddy",
    "species": "Dog",
    "breed": "Beagle",
    "birthday": "2023-01-15",
    "photo": "https://example.com/buddy.jpg"
  }'
```

### Add Activity Log

```bash
curl -X POST http://localhost:5000/api/logs \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-10-11",
    "pet_id": 1,
    "activity": "Walk",
    "note": "Evening walk around the neighborhood"
  }'
```

### Get Pet with Logs

```bash
curl http://localhost:5000/api/pets/1
```

## 🗄️ Database File

The SQLite database is stored at `db/petrecord.db` and is automatically created on first run.

## 🌱 Data Seeding

The server automatically seeds the database with mock data on first startup if the database is empty. This includes:

- 4 sample pets (Bella, Milo, Luna, Max)
- 10 sample activity logs

## 🔧 Configuration

- **Port**: 5000 (configurable via PORT environment variable)
- **Database**: SQLite file at `db/petrecord.db`
- **CORS**: Enabled for all origins

## 🚨 Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## 📁 Project Structure

```
server/
├── server.js          # Main server file
├── db/
│   └── petrecord.db   # SQLite database file
├── routes/
│   ├── pets.js        # Pet routes
│   └── logs.js        # Activity log routes
├── data/
│   └── seed.js        # Mock data and seeding functions
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## 🔄 Frontend Integration

This backend is designed to work seamlessly with the existing React frontend. Simply update your frontend API calls to point to `http://localhost:5000/api` instead of using mock data.

The API responses maintain the same structure as the original mock data, ensuring compatibility with your existing frontend components.

