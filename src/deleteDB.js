const dotenv = require('dotenv'); // Use require for dotenv
dotenv.config({ path: '../.env' });
const {MongoClient} = require("mongodb");

// Replace the URI string with your MongoDB deployment's connection string
const uri = process.env.MONGO;

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("ae_responses");
    const paraphrases = database.collection("paraphrases");

    // Use an empty query to delete all documents
    const query = {};
    const result = await paraphrases.deleteMany(query);

    // Print the number of deleted documents
    console.log("Deleted " + result.deletedCount + " documents");
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
}

// Run the program and print any thrown exceptions
run().catch(console.dir);