require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const db = require("./db")

// All Routers
const adminLoginRoute = require('./routes/Admin/AdminLogin')

const app = express()
app.use(bodyParser.json())
app.use(cors())

// All Routes
app.use('/adminloginapi', adminLoginRoute)

const port = process.env.PORT

app.get('/', (req, res) => {
    res.send("hello")
})

app.listen(port, () => {
    console.log(`Server is running on : http://localhost:${port}`)
})

