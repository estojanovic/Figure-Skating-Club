const express = require('express');
const { sequelize, Users } = require('./models');

// const routeuser= require('./routes/users');
// const routeices = require('./routes/iceskates');
// const routepl = require('./routes/privatelessons');
// const routetr = require('./routes/trainings');

const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// app.use ('/admin', routeuser);
// app.use('/admin', routeices);
// app.use('/admin', routepl);
// app.use('/admin', routetr);


function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}


app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static' });
});


app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
    console.log("Startovao app");
});
