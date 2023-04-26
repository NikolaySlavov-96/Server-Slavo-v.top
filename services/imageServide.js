const fs = require('fs');
const uuid = require('uuid');

const Image = require("../models/Image");

const partPath = `${__dirname}/../upload/`;

async function createImageName(name, extension, owner) {

    const imageName = uuid.v4();
    const fileName = (`${imageName}.${extension}`)

    await Image.create({
        name,
        path: '/upload/' + fileName,
        imageName,
        extension,
        owner,
    })

    const pathName = partPath + fileName;
    return pathName;
}

async function getByOwnerId(idOwner) {
    return await Image.find({ owner: idOwner }).lean();
}

async function removeImageName(name) {
    const imageName = await Image.findOne({ name }).collation({ locale: 'en', strength: 2 });
    await unlinkFile(imageName)
    await Image.findByIdAndDelete(imageName._id);

    return;
}

async function removeImageByImageName(imageId) {
    const image = await Image.findOne({ imageName: imageId });
    await unlinkFile(image)
    await Image.findByIdAndDelete(image._id);
    return;
}


function unlinkFile(imageName) {
    const fileName = (`${imageName.imageName}.${imageName.extension}`);

    return fs.unlink(partPath + fileName, (err) => {
        if (err) throw err;
    });
}

module.exports = {
    createImageName,
    getByOwnerId,
    removeImageName,
    removeImageByImageName
}