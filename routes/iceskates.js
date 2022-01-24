const { sequelize, IceSkates } = require('../models');
const express = require('express');
const {iceskatesSchema} = require('../validation_joi/validation.js');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/iceskates', (req, res) => {

    IceSkates.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/iceskates/:id', (req, res) => {

    IceSkates.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/iceskates', (req, res) => {
    
        iceskatesSchema.validateAsync(req.body).then(obj => {
            obj = req.body;
                IceSkates.create(obj).then(row =>{
                    console.log("Ice skates succesfully created!");
                    res.json(row);
                }).catch(err => res.status(500).json(err));
            }).catch(err => res.status(600).json(err));    

});

route.put('/iceskates/:id', (req, res) => {

        iceskatesSchema.validateAsync(req.body).then(obj => {
            IceSkates.findOne({ where: { id: req.params.id }}).then(ice =>{
                ice.model = req.body.model;
                ice.size = req.body.size;
                ice.save();
                res.json(ice);
            }).catch(err => {
                res.status(500).json(err);
                console.log("error 500 tebrice");
            });
        }).catch(err => {
            res.status(600).json(err);
            console.log("error 600 tebrice");
        }); 
      
});

route.delete('/iceskates/:id', (req, res) => {

    IceSkates.findOne({ where: { id: req.params.id } })
        .then( ice => {
            ice.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;