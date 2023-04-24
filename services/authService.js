const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const JWT_SECRET = '4egw2452';

async function register(email, username, password) {
    const exsistion = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (exsistion) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = User.create({
        email,
        username,
        password: hashedPassword,
    });
    const token = createSession(user);
    return token;
}

async function login(username, password) {
    const exsistion = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (!exsistion) {
        throw new Error('Incorrect Username or Password');
    }

    const hasMatch = await bcrypt.compare(password, exsistion.password);

    if (!hasMatch) {
        throw new Error('Incorrect Username or Password');
    }


    const token = createSession(exsistion);
    return token;
}

function createSession({ _id, username, email }) {
    const payload = {
        _id,
        username,
        email
    }

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

function veryToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    register,
    login,
    veryToken
}