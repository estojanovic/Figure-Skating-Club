const { sequelize, IceSkates } = require('../models');
const express = require('express');

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
    
    IceSkates.create({ model: req.body.model, size: req.body.size})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/iceskates/:id', (req, res) => {
    
    IceSkates.findOne({ where: { id: req.params.id } })
        .then( ice => {
            ice.model = req.body.model;
            ice.size = req.body.size;
           
            ice.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

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