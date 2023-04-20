const uploadController = require('express').Router();
const fs = require('fs');
const { createImageName } = require('../services/imageServide');
const { parserError } = require('../util/parser');

uploadController.get('/upload', (req, res) => {
    res.render('upload', {
        title: 'Upload Form'
    });
});

uploadController.post('/upload', async (req, res) => {
    
    try {
        if(!req.files) {
            // return res.sendStatus(400);
            throw new Error('Not upload file')
        }
    
        if(!req.body) {
            // return res.sendStatus(400);
            throw new Error('Not current Name');
        } 
        const { image } = req.files;
        const { name } = req.body;

        const extention = image.mimetype.split('/')[1];
        const imageData = await createImageName({ nameImage: name }, extention);
    
        // const pathName = `${__dirname}/../static/${imageData}.${extention}`; // save in folder static
        const pathName = `${__dirname}/../../upload/${imageData}.${extention}`; // save out directory server
        image.mv(pathName);
    
        res.sendStatus(200);

    } catch(err) {
        res.render('upload', {
            title: 'Upload Form',
            errors: parserError(err),
        });
    }

});

module.exports = uploadController;