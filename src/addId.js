const { v4: uuidv4 } = require('uuid'); // Ensure you import uuid if using Node.js

db.paraphrases.find({}).forEach((doc) => {
  const updatedParaphrasedText = doc.paraphrasedText.map((item) => {
    if (!item.id) {
      // Add a unique ID if it doesn't exist
      return { ...item, id: uuidv4() };
    }
    return item;
  });

  // Update the document with the new array
  db.paraphrases.updateOne(
    { _id: doc._id },
    { $set: { paraphrasedText: updatedParaphrasedText } }
  );
});
