const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use('/static', express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
})

app.get('/.well-known/pki-validation/fileauth.txt', (req, res) => {
    res.sendFile(__dirname + '/static/fileauth.txt');
})

app.listen(3005);