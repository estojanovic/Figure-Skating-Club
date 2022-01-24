const { sequelize, Users} = require('../models');
const express = require('express');
const {userSchema} = require('../validation_joi/validation.js');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.get('/users', (req, res) => {

    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});


route.post('/users', (req, res) => {
    
        // Users.create({ name: req.body.name, lastname: req.body.lastname, email: req.body.email, password: req.body.password, role: req.body.role})
        // .then( rows => res.json(rows) )
        // .catch( err => res.status(500).json(err) );

        userSchema.validateAsync(req.body).then(obj => {
            obj = req.body;
            obj.password = bcrypt.hashSync(req.body.password, 10);
                Users.create(obj).then(row =>{
                    res.json(row);
                }).catch(err => res.status(500).json(err));
        
            }).catch(err => res.status(600).json(err));
    


        // userSchema.validateAsync(req.body).then(obj => {
        // obj = req.body;
        // obj.password = bcrypt.hashSync(req.body.password, 10);
        //     Users.create(obj).then(row =>{
        //         console.log("User succesfully created!");
        //         res.json(row);
        //     }).catch(err => res.status(500).json(err));
    
        // }).catch(err => res.status(600).json(err));    


        // userSchema.validateAsync(req.body).then(obj => {
        
        //     obj = req.body;
        //     obj.password = bcrypt.hashSync(req.body.password, 10);
        //     obj.moderator = 0;
        //     // console.log(obj.password);
        //     Users.create(obj).then( row => {
                
        //         // const usr = {
        //         //     userId: rows.id,
        //         //     user: rows.name,
        //         //     user: rows.role
        //         // };
        
        //         // const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        
        //         // console.log(token);
            
        //         res.json(row);
        
        //     }).catch( err => res.status(500).json(err) );
        
        //     }).catch(err => res.status(600).json(err));    
        
    

});

route.put('/users/:id', (req, res) => {
    
    // Users.findOne({ where: { id: req.params.id } })
    //     .then( usr => {
    //         usr.name = req.body.name;
    //         usr.lastname = req.body.lastname;
    //         usr.email = req.body.email;
    //         usr.password = req.body.password;
    //         // usr.moderator = req.body.moderator;
    //         usr.role = req.body.role;

    //         usr.save()
    //             .then( rows => res.json(rows) )
    //             .catch( err => res.status(500).json(err) );
    //     })
    //     .catch( err => res.status(500).json(err) );


        userSchema.validateAsync(req.body).then(obj => {
            Users.findOne({ where: { id: req.params.id }})
            .then(usr =>{
                usr.name = req.body.name;
                usr.lastname = req.body.lastname;
                usr.email = req.body.email;
                usr.password = bcrypt.hashSync(req.body.password, 10);
                usr.role = req.body.role;
                usr.save();
                res.json(usr);
            }).catch(err => {
                res.status(500).json(err);
                console.log("error 500 tebrice");
            });
        }).catch(err => {
            res.status(600).json(err);
            console.log("error 600 tebrice");
        }); 
});

route.delete('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;