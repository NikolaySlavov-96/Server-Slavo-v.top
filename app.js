const express = require('express');
const hbr = require('express-handlebars');

const homeController = require('./controllers/homeController');

const handlebars = hbr.create({
    extname: '.hbs'
});

const app = express();

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({extended: false}));
app.use('/static', express.static('static'));

app.get('/', homeController)

app.listen(3005);