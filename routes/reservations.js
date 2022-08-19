const { sequelize, Reservations } = require('../models');
const express = require('express');
const {reservationsSchema} = require('../validation_joi/validation.js');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/reservations', (req, res) => {

    Reservations.findAll({ where: { userid: globalid }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/reservations/:id', (req, res) => {

    Reservations.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/reservations', (req, res) => {
    
    // PrivateLessons.create({ day: req.body.day, time: req.body.time, coach: req.body.coach})
    //     .then( rows => res.json(rows) )
    //     .catch( err => res.status(500).json(err) );


         reservationsSchema.validateAsync(req.body).then(obj => {
            obj = req.body;
                Reservations.create(obj).then(row =>{
                    console.log("Lesson succesfully created!");
                    res.json(row);
                }).catch(err => res.status(500).json(err));
            }).catch(err => res.status(600).json(err));    



            // iceskatesSchema.validateAsync(req.body).then(obj => {
            //     obj = req.body;
            //         IceSkates.create(obj).then(row =>{
            //             console.log("Ice skates succesfully created!");
            //             res.json(row);
            //         }).catch(err => res.status(500).json(err));
            //     }).catch(err => res.status(600).json(err));    

});

route.put('/reservations/:id', (req, res) => {
    
    // PrivateLessons.findOne({ where: { id: req.params.id } })
    //     .then( privl => {
    //         privl.day = req.body.day;
    //         privl.time = req.body.time;
    //         privl.coach = req.body.coach;

    //         privl.save()
    //             .then( rows => res.json(rows) )
    //             .catch( err => res.status(500).json(err) );
    //     })
    //     .catch( err => res.status(500).json(err) );

    reservationsSchema.validateAsync(req.body).then(obj => {
        Reservations.findOne({ where: { id: req.params.id }}).then(privl =>{
            privl.day = req.body.day;
            privl.time = req.body.time;
            privl.coach = req.body.coach;
            privl.save();
            res.json(privl);
        }).catch(err => {
            res.status(500).json(err);
            console.log("error 500 tebrice");
        });
    }).catch(err => {
        res.status(600).json(err);
        console.log("error 600 tebrice");
    }); 

});

route.delete('/reservations/:id', (req, res) => {

    Reservations.findOne({ where: { id: req.params.id } })
        .then( privl => {
            privl.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;