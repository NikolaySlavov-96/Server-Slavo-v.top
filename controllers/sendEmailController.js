const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    host: 'buki.superhosting.bg',
    port: 465,
    auth: {
        user: process.env.EMAIL_Name ,
        pass: process.env.EMAIL_Password
    }
});


module.exports = {
    transporter
}