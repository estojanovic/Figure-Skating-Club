const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string().min(1).required(),
    lastname: Joi.string().min(1).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).max(20).required(),
    role: Joi.string().min(1).required()
});

const trainingsSchema = Joi.object({
    id: Joi.number().integer(),
    day: Joi.string().min(1).required(),
    time: Joi.string().min(1).required(),
    coach1: Joi.string().min(1).required(),
    coach2: Joi.string().min(1).required()
});

const privatelessonsSchema = Joi.object({
    id: Joi.number().integer(),
    day: Joi.string().min(1).required(),
    time: Joi.string().min(1).required(),
    coach: Joi.string().min(1).required()
});

const reservationsSchema = Joi.object({
    id: Joi.number().integer(),
    userid: Joi.number().integer(),
    day: Joi.string().min(1).required(),
    time: Joi.string().min(1).required(),
    coach: Joi.string().min(1).required()
});

const iceskatesSchema = Joi.object({
    id: Joi.number().integer(),
    model: Joi.string().min(1).required(),
    size: Joi.number().integer().required().min(1)
});

module.exports = {
    userSchema,
    trainingsSchema,
    privatelessonsSchema,
    iceskatesSchema
}