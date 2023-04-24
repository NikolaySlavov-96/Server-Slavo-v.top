const fs = require('fs');

const Image = require("../models/Image");

const partPath = `${__dirname}/../upload/`;

async function createImageName(name, extention) {
    const createImage = await Image.create(name)
    const fileName = (`${createImage._id.toString()}.${extention}`)
    createImage.pathImage = '/upload/' + fileName;
    createImage.extension = extention;

    const pathName = partPath + fileName;

    await createImage.save();
    return pathName;
}

async function removeImageName(name) {
    const imageName = await Image.findOne({ nameImage: name }).collation({ locale: 'en', strength: 2 });
    const fileName = (`${imageName._id.toString()}.${imageName.extension}`);

    await fs.unlink(partPath + fileName, (err) => {
        if(err) throw err;
    });
    await Image.findByIdAndDelete(imageName._id);
    return;
}

module.exports = {
    createImageName,
    removeImageName
}