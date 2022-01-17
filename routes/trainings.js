const { sequelize, Trainings } = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/trainings', (req, res) => {

    Trainings.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/trainings/:id', (req, res) => {

    Trainings.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/trainings', (req, res) => {
    
    Trainings.create({ day: req.body.day, time: req.body.time, coach1: req.body.coach1,  coach2: req.body.coach2})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/trainings/:id', (req, res) => {
    
    Trainings.findOne({ where: { id: req.params.id } })
        .then( train => {
            train.day = req.body.day;
            train.time = req.body.time;
            train.coach1 = req.body.coach1;
            train.coach2 = req.body.coach2;
           
            train.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/trainings/:id', (req, res) => {

    Trainings.findOne({ where: { id: req.params.id } })
        .then( train => {
            train.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;