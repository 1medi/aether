

const { connectDB, client } = require('./db'); // Ensure the db.js connection file is already set up

const dbName = "ae_responses"; // MongoDB database name
const collectionName = "paraphrases"; // MongoDB collection name

// Function to store a paraphrase
async function storeParaphrase(inputText, paraphrasedText) {
  const dbClient = await connectDB();
  try {
    const db = dbClient.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne({
      paraphrasedText,
      createdAt: new Date(),
    });

    return result.insertedId; // Return the MongoDB document ID
  } finally {
    await dbClient.close();
  }
}

// Function to retrieve all paraphrases
async function getParaphrases() {
  const dbClient = await connectDB();
  try {
    const db = dbClient.db(dbName);
    const collection = db.collection(collectionName);

    return await collection.find({}).toArray(); // Return all documents as an array
  } finally {
    await dbClient.close();
  }
}

module.exports = { storeParaphrase, getParaphrases };
