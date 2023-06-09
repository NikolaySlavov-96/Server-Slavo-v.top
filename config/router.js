const authController = require("../controllers/authController");
const defaultController = require("../controllers/defaultController");
const homeController = require("../controllers/homeController");
const { registerVerification } = require("../controllers/sendEmailController");
const uploadController = require("../controllers/uploadController");

module.exports = (app) => {

    app.use('/', homeController);
    app.use('/second', uploadController);
    app.use('/auth', authController);
    app.use('/send', registerVerification);
    app.use('*', defaultController);
}