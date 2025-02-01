const Joi = require('joi')

const user_schema = Joi.object({
    name:Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    phone_no:Joi.string().pattern(/^[0-9]{10}$/).required(),
    event_name:Joi.string().required(),
    additional_info:Joi.string().max(500).optional()
})
const login_schema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})
const event_schema = Joi.object({
    date: Joi.date().required(),
    time: Joi.string().required(),
    description: Joi.string().max(500).required(),
    participants: Joi.array().items(Joi.string()).default([])
})

module.exports = {
    user_schema,
    login_schema,
    event_schema
}