const { Schema, model, Types: { ObjectId } } = require('mongoose');

const imageSchema = new Schema({
    name: { type: String, require: true },
    path: { type: String, require: true },
    imageName: { type: String, require: true },
    extension: { type: String, require: true },
    owner: { type: ObjectId, ref: 'User', require: true }
});

const Image = model('Image', imageSchema);

module.exports = Image;