const express = require('express')
const app = express()
const port = process.env.PORT || 9000
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const mongo_db_uri = process.env.MONGO_DB_URI
// Routers
const user_router = require("../virtual-event-platform/Routes/Users")
const admin_router = require("../virtual-event-platform/Routes/admin")
const events_router = require('../virtual-event-platform/Routes/events')

//Middlewear to parse JSON req
app.use(express.json())
// Defining a route for the root URL
app.get('/', (req, res) => {
    res.send("Hello World")
})
// Starting the server
console.log("Starting Server")
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
// Mongo_db_connection
mongoose.connect(mongo_db_uri)
.then(()=>{
    console.log("Connected to DB")
})
.catch(err =>{
    console.log("Error while connecting to db",err.message)
});
//Using The Router with app
app.use('/users',user_router)
app.use('/admin',admin_router)
app.use('/events',events_router)
// Exporting the app module
module.exports = app