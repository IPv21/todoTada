const express = require('express');
const port = 3001;
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

// body parser 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// path to db.json
const dbFilePath = path.join(__dirname, './db/db.json');





app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});


app.get('/api/notes', (req,res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
        res.send(data);
})
});

// route to handle saving notes
app.post('/api/notes', (req,res) => {
    const { title, text } = req.body;
    // read existing notes from db.json
    let savedNotes = [];
    try {
        const dbContent = fs.readFileSync(dbFilePath, 'utf-8');
        savedNotes = JSON.parse(dbContent);
    } catch (error) {
        console.error('error reading db.json:', error);
    }
    // add new notes to saved notes array
    savedNotes.push({title, text});
    try {
        fs.writeFileSync(dbFilePath, JSON.stringify(savedNotes, null, 2));
        res.json({ message: 'Note saved successfully'});

    } catch (error) {
        console.error('Error writing to db.json:', error);
        res.status(500).json({ message: 'Error saving note'});
    }
});





















app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});
app.listen(port, () => {
    console.log(`You are being watched. Port ${port}`)
});
