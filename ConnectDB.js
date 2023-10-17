const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path'); // Import the 'path' module

const app = express();
app.set('view engine', 'ejs');

//Allows server to use static files (mainly used for the .css and .js files in public folder)
app.use(express.static(path.join(__dirname, 'public')));

// Set MIME type for CSS files (Eliminates a MIME type error)
app.get('/public/styles.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(__dirname + '/public/styles.css');
});

// Set MIME type for JS files (Eliminates a MIME type error)
app.use('/public', express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// MongoDB connection
const uri = 'mongodb://127.0.0.1:27017/TestDB';

async function connectToMongoDB() {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

// Define a route to display listings
app.get('/listings', async (req, res) => {
  const client = await connectToMongoDB();
  const database = client.db('TestDB');
  const collection = database.collection('Properties');
  const listings = await collection.find({}).toArray();

  res.render('listing', { listings });
  client.close();
});

//Receiving information from the form
app.post('/submitForm', express.json(), async (req, res) => {
  const formData = req.body;

  // Connect to the MongoDB database
  const client = await connectToMongoDB();
  const database = client.db('TestDB');
  const collection = database.collection('Appointments');

  try {
    // Insert the form data into the collection
    const result = await collection.insertOne(formData);

    // Log the result to the console (for demonstration)
    console.log('Form data inserted:');

    res.json({ message: 'Form submitted and stored in the database' });
  } catch (error) {
    console.error('Error storing form data:', error);
    res.status(500).json({ message: 'Error storing form data' });
  } finally {
    // Close the MongoDB client
    client.close();
  }
});

app.listen(2890, () => {
  console.log('Server is running on http://localhost:2890');
});
