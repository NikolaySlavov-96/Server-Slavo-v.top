const homeController = require("../controllers/homeController");
const uploadController = require("../controllers/uploadController");

module.exports = (app) => {

    app.use('/', homeController);
    app.use('/second', uploadController);
}