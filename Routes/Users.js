const express = require('express')
const router = express.Router()
const Users = require('../Models/user.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//Middlewear Imports
const {user_schema,login_schema} = require('../Middlewear/User_validation')

// Register user 
router.post('/register',async(req,res)=>{
   try{
        const{error}=user_schema.validate(req.body,{abortEarly:true})
        if(!error){
            res.status(400).json({
                message:error.details
            })
        }
        const user = req.body
        user.password = await bcrypt.hash(user.password,12) // 12 salt-rounds
        const user_in_db = await Users.create(user)
        res.status(201).json({
            user : user.name,
            email : user.email,
            phone_no :user.phone_no,
            events_registed_for : user.event_names
        })
   }catch(err){
        return res.status(401).json({
            message:err.message
        })
   }
})
// User Login
router.post('/login',async(req,res)=>{
    try{
        const{error} = login_schema.validate(req.body,{abortEarly:true})
        if(error){
            res.status(400).json({
                message:error.message
            })
        }
        const{email,password} = req.body
        const user = await Users.findOne({email:email})
        if(!user){
            res.status(401).json({
                message:"User Not Found"
            })
        }
        const valid_pass = await bcrypt.compare(password,user.password)
        if(!valid_pass){
            res.status(401).json({
                message:"Invalid Credentials"
            })
        }
        //Generate an jwt token
        const token = jwt.sign({id:user.id,name:user.name,role:user.role},process.env.JWT_SECRET)
        res.status(200).json({
            message:"Login Succesful",
            Jwt_token: token
        })
    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
})



module.exports = router