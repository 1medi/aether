const express = require('express'); // Use require for express
const dotenv = require('dotenv'); // Use require for dotenv
const { connectDB, client } = require('./db'); // Use require for local modules
const OpenAI = require('openai'); // Use require for OpenAI
const bodyParser = require('body-parser'); // Use require for body-parser

dotenv.config();

const app = express();

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: `${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
});

const dbName = 'ae_responses';
const collectionName = 'paraphrases';

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connection established');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


// Endpoint to get all paraphrases
app.get('/paraphrases', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const paraphrases = await collection.find({}).toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(paraphrases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Endpoint to update a paraphrase
app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { paraphrasedText } = req.body;

  if (!paraphrasedText) {
    return res.status(400).json({ error: 'paraphrasedText is required.' });
  }

  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { paraphrasedText, updatedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Paraphrase not found or no changes made.' });
    }

    res.status(200).json({ message: 'Paraphrase updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to delete a paraphrase
const { ObjectId } = require('mongodb');

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  // Validate the ID format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Endpoint to store a new paraphrase
app.post('/store', async (req, res) => {
  const { paraphrasedText } = req.body;

  if (!paraphrasedText) {
    return res.status(400).json({ error: 'paraphrasedText is required.' });
  }

  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne({
      paraphrasedText,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: 'Paraphrase saved successfully!',
      id: result.insertedId,
    });
  } catch (err) {
    console.error('Error saving paraphrase:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to generate and save a paraphrase
app.post('/generate-and-save', async (req, res) => {
  const { inputText } = req.body;

  if (!inputText) {
    return res.status(400).json({ error: 'Input text is required.' });
  }

  try {
    // Call OpenAI API
    const response = await openai.createCompletion({
      model: 'text-davinci-003', // Replace with the desired model
      prompt: `Paraphrase the following text in a simpler form:\n\n${inputText}`,
      max_tokens: 200,
    });

    const paraphrasedText = response.data.choices[0].text.trim();

    // Save the paraphrased text to MongoDB
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne({
      paraphrasedText,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: 'Paraphrase generated and saved successfully!',
      paraphrasedText,
      id: result.insertedId,
    });
  } catch (err) {
    console.error('Error with OpenAI API:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 8888;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
