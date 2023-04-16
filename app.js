const https = require('https');
const express = require('express');
const fs = require('fs');

const options = {
    key: fs.readFileSync('../key.pem'),
    cert: fs.readFileSync('../cert.pem')
}

const app = express();

https.createServer(options, app).listen(80, () => console.log('Server listen'));

app.use(express.urlencoded({extended: false}));
app.use('/static', express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
})

app.get('/.well-known/pki-validation/fileauth.txt', (req, res) => {
    res.sendFile(__dirname + '/static/fileauth.txt');
})

// app.listen(3000);