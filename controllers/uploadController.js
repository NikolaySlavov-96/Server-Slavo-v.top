const uploadController = require('express').Router();
const { createImageName, removeImageName, getByOwnerId, removeImageByImageName } = require('../services/imageServide');
const { parserError } = require('../util/parser');
const { hasUser, hasRole } = require('../middleware/guard');

uploadController.get('/upload', hasUser(), (req, res) => {
    res.render('upload', {
        title: 'Upload Form'
    });
});

uploadController.post('/upload', hasUser(), async (req, res) => {

    try {
        if (!req.files) {
            throw new Error('Not upload file')
        }

        if (!req.body) {
            throw new Error('Not current Name');
        }
        const { image } = req.files;
        const { name } = req.body;

        const extention = image.mimetype.split('/')[1];
        const imageData = await createImageName(name, extention, req.user._id);

        image.mv(imageData);

        res.sendStatus(200);
        // res.status(200).redirect('/second/upload');
    } catch (err) {
        res.render('upload', {
            title: 'Upload Form',
            errors: parserError(err),
        });
    }
});

uploadController.get('/remove', hasUser(), async (req, res) => {
    const images = await getByOwnerId(req.user._id);
    res.render('remove', {
        title: 'Remove Page',
        images,
    })
});

uploadController.post('/remove', hasUser(), hasRole('admin'), async (req, res) => {
    const body = req.body;
    try {
        if (body.name == '') {
            throw new Error('Field name is required');
        }

        await removeImageName(body.name);
        res.redirect('/second/upload');
    } catch (err) {
        const message = 'Not Found Image';
        res.render('remove', {
            title: 'Remove Page',
            body: {
                nameFile: body.name,
                errors: message,
            }
        })
    }
});

uploadController.get('/remove/:id', async (req, res) => {
    await removeImageByImageName(req.params.id);
    res.redirect('/second/upload');
})

module.exports = uploadController;