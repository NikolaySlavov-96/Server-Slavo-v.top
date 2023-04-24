const { Schema, model, Types: { ObjectId } } = require('mongoose');

const imageSchema = new Schema({
    nameImage: { type: String, require: true },
    pathImage: { type: String },
    extension: { type: String },
    // owner: { type: ObjectId, ref: 'User', require: true }
});

const Image = model('Image', imageSchema);

module.exports = Image;