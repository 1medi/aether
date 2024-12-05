const dotenv = require('dotenv'); // Use require for dotenv
dotenv.config({ path: '../.env' });
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO;
const dbName = 'ae_responses';
const collectionName = 'paraphrases';

async function createIndex() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Create the index
    const result = await collection.createIndex({ id: 1 }, { unique: true });
    console.log(`Index created: ${result}`);
  } catch (err) {
    console.error('Error creating index:', err);
  } finally {
    await client.close();
  }
}

createIndex();
