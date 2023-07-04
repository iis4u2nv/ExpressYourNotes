// Import Express.js

const express = require('express');
const {writeFile} = require('fs').promises;

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Helper method for generating unique ids
const { v4: uuidv4 } = require('uuid');
const notes = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencodded from data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
  res.status(200).json(notes);
});

// POST request to add notes
// NOTE: Data persistence isn't set up yet, so this will only exist in memory until we implement it
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
console.info(`${req.method} request received to add a note`);
// http://localhost:3001// Destructuring assignment for the items in req.body
const { title, text } = req.body;
// http://localhost:3001
// If all the required properties are present
if (title && text) {
  // Variable for the object we will save
  const newNote = { 
    title,
    text,
    id: uuidv4(),
  };

  notes.push(req.body)
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);