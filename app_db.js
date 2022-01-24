const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { sequelize } = require('./models');

const routeuser= require('./routes/users');
const routeices = require('./routes/iceskates');
const routepl = require('./routes/privatelessons');
const routetr = require('./routes/trainings');

const path = require('path');

var corsOptions = {
    origin: '*',
    credentials:true,
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use ('/admin', routeuser);
app.use('/admin',routeices);
app.use('/admin', routepl);
app.use('/admin', routetr);

app.use(express.static(path.join(__dirname,'static')));

app.listen({ port:7000}, async () => {
    await sequelize.authenticate();
    console.log("startovan db");
})
