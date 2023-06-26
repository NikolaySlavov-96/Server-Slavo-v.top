const https = require('https');
const express = require('express');
const fs = require('fs');
const router = require('./config/router');
const database = require('./config/database');
const exprConf = require('./config/exprConf');
const { transporter } = require('./controllers/sendEmailController');



const nodemailer = require('nodemailer');


const PORT = 8080;

/*
const options = {
    key: fs.readFileSync('../key-PRK.pem'),
    cert: fs.readFileSync('../cert-CRT.pem')
}
*/

start();

async function start() {

    const myOption = {
        from: 'info@shop-hop.store',
        to: 'gogle.bg.napster@gmail.com',
        subject: 'Test',
        html: "<h1 style='color:blue;font-size:45px'>Test</h1>"
    };

    transporter.sendMail(myOption, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Email send: ' + info.response)
        }
    });

    const app = express();
    // https.createServer(options, app).listen(PORT, () => console.log('Server listen'));

    exprConf(app);
    await database(app);
    router(app);

    app.listen(3001);
}