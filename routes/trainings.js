const { sequelize, Trainings } = require('../models');
const express = require('express');
const {trainingsSchema} = require('../validation_joi/validation.js');

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
    
    // Trainings.create({ day: req.body.day, time: req.body.time, coach1: req.body.coach1,  coach2: req.body.coach2})
    //     .then( rows => res.json(rows) )
    //     .catch( err => res.status(500).json(err) );


        trainingsSchema.validateAsync(req.body).then(obj => {
            obj = req.body;
                Trainings.create(obj).then(row =>{
                    console.log("Trainings succesfully created!");
                    res.json(row);
                }).catch(err => res.status(500).json(err));
            }).catch(err => res.status(600).json(err));    

});

route.put('/trainings/:id', (req, res) => {
    
    // Trainings.findOne({ where: { id: req.params.id } })
    //     .then( train => {
    //         train.day = req.body.day;
    //         train.time = req.body.time;
    //         train.coach1 = req.body.coach1;
    //         train.coach2 = req.body.coach2;
           
    //         train.save()
    //             .then( rows => res.json(rows) )
    //             .catch( err => res.status(500).json(err) );
    //     })
    //     .catch( err => res.status(500).json(err) );

    trainingsSchema.validateAsync(req.body).then(obj => {
        Trainings.findOne({ where: { id: req.params.id }}).then(train =>{
            train.day = req.body.day;
            train.time = req.body.time;
            train.coach1 = req.body.coach1;
            train.coach2 = req.body.coach2;
            train.save();
            res.json(train);
        }).catch(err => {
            res.status(500).json(err);
            console.log("error 500 tebrice");
        });
    }).catch(err => {
        res.status(600).json(err);
        console.log("error 600 tebrice");
    }); 

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