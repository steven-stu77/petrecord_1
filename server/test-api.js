const http = require("http");

const BASE_URL = "http://localhost:5000/api";

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 5000,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      const jsonData = JSON.stringify(data);
      options.headers["Content-Length"] = Buffer.byteLength(jsonData);
    }

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ status: res.statusCode, data: jsonBody });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test functions
async function testHealthCheck() {
  console.log("🏥 Testing health check...");
  const result = await makeRequest("GET", "/api/health");
  console.log(`Status: ${result.status}, Response:`, result.data);
  return result.status === 200;
}

async function testGetPets() {
  console.log("\n🐾 Testing GET /api/pets...");
  const result = await makeRequest("GET", "/api/pets");
  console.log(`Status: ${result.status}, Found ${result.data.length} pets`);
  return result.status === 200;
}

async function testGetLogs() {
  console.log("\n📝 Testing GET /api/logs...");
  const result = await makeRequest("GET", "/api/logs");
  console.log(`Status: ${result.status}, Found ${result.data.length} logs`);
  return result.status === 200;
}

async function testGetStats() {
  console.log("\n📊 Testing GET /api/stats...");
  const result = await makeRequest("GET", "/api/stats");
  console.log(`Status: ${result.status}, Stats:`, result.data);
  return result.status === 200;
}

async function testCreatePet() {
  console.log("\n➕ Testing POST /api/pets...");
  const newPet = {
    name: "Test Pet",
    species: "Cat",
    breed: "Maine Coon",
    birthday: "2022-05-20",
    photo: "https://example.com/test.jpg",
  };

  const result = await makeRequest("POST", "/api/pets", newPet);
  console.log(`Status: ${result.status}, Created pet:`, result.data);
  return result.status === 201;
}

async function testCreateLog() {
  console.log("\n📝 Testing POST /api/logs...");
  const newLog = {
    date: "2025-10-11",
    pet_id: 1,
    activity: "Test Activity",
    note: "This is a test log entry",
  };

  const result = await makeRequest("POST", "/api/logs", newLog);
  console.log(`Status: ${result.status}, Created log:`, result.data);
  return result.status === 201;
}

async function testGetSinglePet() {
  console.log("\n🔍 Testing GET /api/pets/1...");
  const result = await makeRequest("GET", "/api/pets/1");
  console.log(`Status: ${result.status}, Pet with logs:`, {
    name: result.data.name,
    species: result.data.species,
    logsCount: result.data.logs ? result.data.logs.length : 0,
  });
  return result.status === 200;
}

// Run all tests
async function runTests() {
  console.log("🧪 Starting PetRecord API Tests...\n");

  const tests = [
    testHealthCheck,
    testGetPets,
    testGetLogs,
    testGetStats,
    testCreatePet,
    testCreateLog,
    testGetSinglePet,
  ];

  let passed = 0;
  let total = tests.length;

  for (const test of tests) {
    try {
      const success = await test();
      if (success) {
        passed++;
        console.log("✅ PASSED");
      } else {
        console.log("❌ FAILED");
      }
    } catch (error) {
      console.log("❌ ERROR:", error.message);
    }
  }

  console.log(`\n📋 Test Results: ${passed}/${total} tests passed`);

  if (passed === total) {
    console.log("🎉 All tests passed! API is working correctly.");
  } else {
    console.log("⚠️  Some tests failed. Check the server logs.");
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };

