const express = require('express')
const router = express.Router()
const Users = require('../Models/user.models')
const Events = require('../Models/events.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Middleware Imports
const {event_schema} = require('../Middlewear/User_validation')
const authenticate = require('../Middlewear/auth_jwt').authenticate;
const authorize = require('../Middlewear/auth_jwt').authorize;


// Admin routes for CRUD operations

// Create an event that can be done by the admin
router.post('/create', authenticate, authorize(['organizer']), async (req, res) => {
    try {
        const isValid = event_schema.validate(req.body)
        if (!isValid) {
            return res.status(400).json({
                message: "Check the admin request",
                details: error.details
            })
        }
        const { date, time, description, participants } = req.body
        const newEvent = new Events({
            date,
            time,
            description,
            participants: participants || []
        })
        await newEvent.save()
        res.status(201).json({
            message: "Event created successfully",
            event: newEvent
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
})
// 

// To get all the events // To read all the events 
router.get('/',authenticate, authorize(['organizer']),async (req, res) => {
    try {
        const events = await Events.find()
        const eventDetails = events.map(event => ({
            description: event.description,
            participants: event.participants
        }))
        res.status(200).json(eventDetails)
    } catch (error) {
        res.status(500).json({
            message: 'Internal server Error',
            error: error.message
        })
    }
})
// To read an specific event //:id -->  id of the specific event
router.get('/:id',authenticate, authorize(['organizer']),async(req,res)=>{
    try{
        const event = await Events.findOne({_id:req.params.id})
        if(!event){
            res.status(400).json({
                message:"Event Not Found",
                error : error.message
            })
        }
        const user_event = {
            description: event.description,
            participants: event.participants
        }
        return res.status(200).json({
            message:user_event
        })
    }catch(error){
        return res.status(500).json({
            message:"Server Error",
            error : error.message
        })
    }
})

// update an existing event details
router.post('/update/:id',authenticate, authorize(['organizer']),async(req,res)=>{
    try{
        const{date,time,description,participants} = req.body
        const updatedEvent = await Events.findOneAndUpdate(
            {_id:req.params.id},
            {date,time,description,participants},
            {new:true,runValidators:true}
        )
        if(!updatedEvent){
            res.status(400).json({
                message:"Event not Found"
            })
        }
        res.status(200).json({
            message:"Event Updated Succesfully",
            event: updatedEvent
        })
    }catch(error){
        res.status(500).json({
            message:"Server Error",
            error : error.message
        })
    }
})
// To delete an individual Event
router.delete('/delete/:id', authenticate, authorize(['organizer']), async (req, res) => {
    try {
        const event = await Events.findOneAndDelete({ _id: req.params.id })
        if (!event) {
            return res.status(404).json({
                message: "Event not Present"
            })
        }
        res.status(200).json({
            message: "Event Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
})

module.exports = router;