const express = require('express');
const handlebars = require('express-handlebars');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const session = require('../middleware/session');


module.exports = (app) => {

    const hbs = handlebars.create({
        extname: '.hbs',
    })

    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    app.use(express.urlencoded({ extended: false }));
    app.use(fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true
    }));
    app.use('/static', express.static('static'));
    app.use('/upload', express.static('upload'));
    app.use(cookieParser());
    app.use(session());
}