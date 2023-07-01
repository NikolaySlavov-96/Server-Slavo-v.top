const nodemailer = require('nodemailer');
require('dotenv').config();

const typesEmailContent = {
    'hello': "<h1 style='color:blue;font-size:45px'>Hello</h1>",
    'register': "<h1 style='color:blue;font-size:45px'>Register</h1>",
    'information': "<h1 style='color:blue;font-size:45px'>information</h1>",
    'successfull': "<h1 style='color:blue;font-size:45px'>successfull</h1>",
}

const sendMail = (from, to, subject, content) => {

    const emailHead = {
        from: from,
        to: to,
        subject: subject,
        html: typesEmailContent[content]
    };

    transporter.sendMail(emailHead, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email send: ' + info.response, to);
        }
    });
}

const transporter = nodemailer.createTransport({
    host: 'buki.superhosting.bg',
    port: 465,
    auth: {
        user: process.env.EMAIL_Name ,
        pass: process.env.EMAIL_Password
    }
});

const sendFromInfoEmail = sendMail.bind(null, 'info@shop-hop.store');
const sendFromNoReplyEmail = sendMail.bind(null, 'info@shop-hop.store');


module.exports = {
    sendFromInfoEmail,
    sendFromNoReplyEmail
}