const express = require('express');
const port = 3001;
const app = express();
const path = require('path');




app.listen(port, () => {
    console.log(`You are being watched. Port ${port}`)
});
