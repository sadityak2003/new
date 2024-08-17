require("dotenv").config()

const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://sadityak2003:Hack9876$@cluster0.4oelt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

mongoose.connection.on('connected', ()=> {
    console.log("MonogoDB Connected")
})

mongoose.connection.on('error', (error)=> {
    console.error("Error : ", error)
})

module.exports = mongoose