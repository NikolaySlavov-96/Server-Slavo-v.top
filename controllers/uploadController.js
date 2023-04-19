const uploadController = require('express').Router();
const fs = require('fs');
const { createImageName } = require('../services/imageServide');

uploadController.get('/upload', (req, res) => {
    res.render('upload', {
        title: 'Upload Form'
    });
});

uploadController.post('/upload', async (req, res) => {
    const { image } = req.files;
    const { name } = req.body;

    if (!name) {
        return res.sendStatus(400);
    }

    if (!image) {
        return res.sendStatus(400);
    }
    
    const extention = image.mimetype.split('/')[1];
    const imageData = await createImageName({ nameImage: name }, extention);

    // const pathName = `${__dirname}/../static/${imageData}.${extention}`; // save in folder static
    const pathName = `${__dirname}/../../upload/${imageData}.${extention}`; // save out directory server
    image.mv(pathName);

    res.sendStatus(200);
});

module.exports = uploadController;