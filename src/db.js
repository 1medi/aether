const dotenv = require('dotenv'); // Use require for dotenv
dotenv.config({ path: '../.env' });
console.log("All Environment Variables:", process.env);

const { MongoClient, ServerApiVersion } = require('mongodb'); // Use require for MongoDB
const uri = process.env.MONGO;
console.log("MONGO_TEST_URL:", uri);

if (!uri) {
  throw new Error("MONGO_URL is not defined in environment variables");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw error;
  }
}

// Use module.exports for CommonJS exports
module.exports = {
  connectDB,
  client,
};
