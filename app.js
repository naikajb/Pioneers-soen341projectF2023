const express = require('express');
const app = express();
const path = require('path');
const dummyListings = require('./views/dummyData'); // Import dummy data

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));


// Routes
app.get('/listing/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const listing = dummyListings.find(listing => listing.id === id);

  if (!listing) {
    res.status(404).send('Listing not found.');
  } else {
    // Render the EJS template with dummy data
    res.render('listing', { listing });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
