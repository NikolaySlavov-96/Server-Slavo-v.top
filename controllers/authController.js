const { body, validationResult } = require('express-validator');
const { register, login } = require('../services/authService');
const { isGues } = require('../middleware/guard');

const authController = require('express').Router();

authController.get('/register', isGues(), (req, res) => {
    res.render('register', {
        title: 'Register Page'
    })
});

authController.post('/register',
    body('username').isEmpty(),
    body('password').isEmpty(),
    body('email').isEmpty(),
    async (req, res) => {
        const body = req.body;
        try {
            const { errors } = validationResult(req);
            if (errors.lenght > 0) {
                throw errors;
            }

            if (body.password !== body.repassword) {
                throw new Error('Password don\'t match')
            }

            await register(body.email, body.username, body.password);
            res.redirect('/auth/login');
        } catch (err) {
            const message = err;
            res.render('register', {
                title: 'Register Page',
                body: {
                    email: body.email,
                    username: body.username,
                },
                errors: message
            })
        }
    });

authController.get('/login', isGues(), (req, res) => {
    res.render('login', {
        title: 'Login Page'
    })
});

authController.post('/login', async (req, res) => {
    const body = req.body;
    try {
        if (body.username == '' || body.password == '') {
            throw new Error('All field is required');
        }

        const token = await login(body.username, body.password);
        res.cookie('token', token);
        res.redirect('/second/upload');
    } catch (err) {
        const message = err;
        res.render('login', {
            title: 'Login Page',
            body: {
                username: body.username
            },
            errors: message
        })
    }
});

module.exports = authController;