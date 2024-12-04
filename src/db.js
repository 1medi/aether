import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://1medi:Jairus123@aeresponsecluster.6xntt.mongodb.net/?retryWrites=true&w=majority&appName=aeResponseCluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw error;
  }
}

export { client }; // Use ES Modules export