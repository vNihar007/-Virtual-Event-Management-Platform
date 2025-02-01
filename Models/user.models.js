const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone_no: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },
    event_names: {
        type:[String], // An user can register for multiple events 
        required: true
    },
    additional_info: {
        type: String,
        maxlength: 500,
        default: ''
    },
    role:{
        type:String,
        enum:['atendee','organizer'],
        default:'atendee'
    }
})

const Users = mongoose.model('Users', user_schema)

module.exports = Users