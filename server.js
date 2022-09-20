// libs to import
const express = require('express');
const fs = require('fs');
const path = require('path');

// server ports
const PORT = process.env.PORT || 3001;
const app = express();

// app staging
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// GET Request functions
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'), err => {
        if (err) throw err;
    });
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'), err =>{
        if (err) throw err;
    });
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json'), err => {
        if (err) throw err;
    });
});

// POST request functions
app.post('/api/notes', (req, res) => {
    const newNoteData = req.body; 

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err; 
        const updatedNoteData = JSON.parse(data);
        updatedNoteData.push(newNoteData);

        fs.writeFile('./db/db.json', JSON.stringify(updatedNoteData), err => {
            if (err) throw err;
        });
    });

    res.sendStatus(200);

});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);