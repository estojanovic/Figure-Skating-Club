const express = require('express');
const {userSchema} = require('./validation_joi/validation.js');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
var globalid;

app.use(cors());
app.options('*', cors());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));




app.post('/register', (req, res) => {

    userSchema.validateAsync(req.body).then(obj => {
        
    obj = req.body;
    obj.password = bcrypt.hashSync(req.body.password, 10);
    console.log(obj.password);
    console.log(obj.name);
    Users.create(obj).then( rows => {
        
        const usr = {
            userId: rows.id,
            user: rows.name,
            role: rows.role
        };
        console.log(usr);

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        console.log("token");
        console.log(token);
        
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );

    }).catch(err => res.status(600).json(err));    
  
});

app.post('/login', (req, res) => {
  
    Users.findOne({ where: { name: req.body.name } })
        .then( usr => {
            console.log("Nasao usera ");
            console.log(usr.name);
            console.log(usr.email);
            console.log(usr.id);
            globalid = usr.id;
            console.log(globalid)
            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.name,
                    role: usr.role
                };  
                
                console.log("öbjekat"+ obj);
                console.log(process.env.ACCESS_TOKEN_SECRET);
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                console.log("token je " + token);
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
    console.log("Startovao auth");
});

exports.globalid = globalid;
