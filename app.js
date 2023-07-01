const https = require('https');
const express = require('express');
const fs = require('fs');
const router = require('./config/router');
const database = require('./config/database');
const exprConf = require('./config/exprConf');

const PORT = 8080;

/*
const options = {
    key: fs.readFileSync('../key-PRK.pem'),
    cert: fs.readFileSync('../cert-CRT.pem')
}
*/

start();

async function start() {

    const app = express();
    // https.createServer(options, app).listen(PORT, () => console.log('Server listen'));

    exprConf(app);
    await database(app);
    router(app);

    app.listen(3001);
}