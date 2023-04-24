const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
});

const User = model('User', userSchema);

module.exports = User;