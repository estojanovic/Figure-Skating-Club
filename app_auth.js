const express = require('express');
const {userSchema} = require('./validation_joi/validation.js');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.options('*', cors());

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));




app.post('/register', (req, res) => {


    // userSchema.validateAsync(req.body).then(obj => {
        
        // // obj.password = bcrypt.hashSync(req.body.password, 10);
        //     Users.create(obj).then(row =>{
        //         console.log("User succesfully created!");
        //         res.json(row);
        //     }).catch(err => res.status(500).json(err));
    
        // }).catch(err => res.status(600).json(err));    

    // const obj = {
    //     name: req.body.name,
    //     lastname: req.body.lastname,
    //     email: req.body.email,
    //     password: bcrypt.hashSync(req.body.password, 10),
    //     role: req.body.role
    //     // moderator: req.body.moderator
    // };

    userSchema.validateAsync(req.body).then(obj => {
        
    obj = req.body;
    obj.password = bcrypt.hashSync(req.body.password, 10);
    // console.log(obj.password);
    Users.create(obj).then( rows => {
        
        const usr = {
            userId: rows.id,
            user: rows.name,
            user: rows.role
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);
        
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );

    }).catch(err => res.status(600).json(err));    


    // userSchema.validateAsync(obj).then(obj => {
    // Users.create(obj).then( rows => {
        
    //     const usr = {
    //         userId: rows.id,
    //         user: rows.name,
    //         user: rows.role
    //     };

    //     const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

    //     console.log(token);
        
    //     res.json({ token: token });

    // }).catch( err => res.status(500).json(err) );
    // // }).catch(err => res.status(600).json(err));   
});

app.post('/login', (req, res) => {

    Users.findOne({ where: { name: req.body.name } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.name,
                    user: usr.role
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
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