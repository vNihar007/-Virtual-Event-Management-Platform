const mongoose = require('mongoose')

const events_schema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    participants: {
        type: [String], // Array of user IDs or names
        default: []
    }
})

const events = mongoose.model('Events', events_schema)

module.exports = events