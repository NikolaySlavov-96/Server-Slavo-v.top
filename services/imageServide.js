const Image = require("../models/Image");



async function createImageName(name, extention) {
    const createImage = await Image.create(name)
    const idImage = createImage._id.toString();
    createImage.pathImage = '/static/upload' + idImage + '.' + extention;

    await createImage.save();
    return idImage;
}

module.exports = {
    createImageName
}