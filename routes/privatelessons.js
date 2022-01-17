const { sequelize, PrivateLessons } = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/privatelessons', (req, res) => {

    PrivateLessons.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/privatelessons/:id', (req, res) => {

    PrivateLessons.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/privatelessons', (req, res) => {
    
    PrivateLessons.create({ day: req.body.day, time: req.body.time, coach: req.body.coach})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/privatelessons/:id', (req, res) => {
    
    PrivateLessons.findOne({ where: { id: req.params.id } })
        .then( privl => {
            privl.day = req.body.day;
            privl.time = req.body.time;
            privl.coach = req.body.coach;

            privl.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/privatelessons/:id', (req, res) => {

    PrivateLessons.findOne({ where: { id: req.params.id } })
        .then( privl => {
            privl.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;