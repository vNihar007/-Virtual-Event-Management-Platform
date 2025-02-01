// user with drawing form an event 
// returning an events participants 

const express = require('express')
const router = express.Router()
const Users = require('../Models/user.models')
const Events = require('../Models/events.models')
// Middleware Imports
const {event_schema} = require('../Middlewear/User_validation')
const sendRegistrationEmail = require('../Middlewear/mail')

// an user registering for an event
//issue with the email --> sending
router.post('/register/:id',async(req,res)=>{
    try{
        const event = await Events.findOne({_id:req.params.id})
        if(!event){
            res.status(400).json("Event Not Found")
        }
        const {email} = req.body
        if(!email){
            res.status(400).json("Email Required")
        }
        if(event.participants.includes(email)){
            return res.status(400).json("User already registered for the event")
        }
        // Add the user-email to events
        event.participants.push(email)
        await event.save()
        // send Mail to user
        sendRegistrationEmail(email,event)
        console.log("email sent")
        return res.status(200).json({
            message:"User Registered Succesfully",
            event  : event
        })
    }catch(error){
        res.status(500).json({
            message:"Server Error",
            message: error.message
        })
    }
})
// Withdrawl  of an user from the event
router.post('/withdraw/:id', async (req, res) => {
    try {
        const event = await Events.findOne({ _id: req.params.id })
        if (!event) {
            return res.status(404).json({
                message: "Event not Found"
            })
        }
        const { email } = req.body
        if (!email) {
            return res.status(400).json("Email Required")
        }

        if (!event.participants.includes(email)) {
            return res.status(400).json("User not registered for Event")
        }
        event.participants = event.participants.filter(participant => participant !== email)
        await event.save()

        return res.status(200).json({
            message: "User withdrawn from the event",
            event: event
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
})


module.exports = router;
