require("dotenv").config()

const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL)

mongoose.connection.on('connected', ()=> {
    console.log("MonogoDB Connected")
})

mongoose.connection.on('error', (error)=> {
    console.error("Error : ", error)
})

module.exports = mongoose