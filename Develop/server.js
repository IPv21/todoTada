const express = require('express');
const port = 3001;
const app = express();
const path = require('path');
const fs = require('fs');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

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















app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});
app.listen(port, () => {
    console.log(`You are being watched. Port ${port}`)
});
