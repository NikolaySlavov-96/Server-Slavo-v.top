const express = require('express');
const handlebars = require('express-handlebars');
const fileUpload = require('express-fileupload');


module.exports = (app) => {

    const hbs = handlebars.create({
        extname: '.hbs',
    })

    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    app.use(express.urlencoded({ extended: false }));
    // app.use(fileUpload()); //not limit for image 
    app.use(fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true
    }));
    app.use('/static', express.static('static'));
    
}