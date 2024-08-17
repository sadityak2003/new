const Admin = require("../../models/Admin")
const AdminToken = require("../../models/AdminToken")
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const router = express.Router()

//http://localhost:5000/adminloginapi/createadmin
router.post('/createadmin', async (req, res) => {
    try {
        const newAdmin = new Admin({
            admin_name: req.body.admin_name,
            admin_email: req.body.admin_email,
            admin_password: await bcrypt.hash(req.body.admin_password, 12)
        })

        const saveAdmin = await newAdmin.save()
        res.status(200).json(saveAdmin)
    } catch (error) {
        res.status(500).json({'error' : error})
    }
})

//http://localhost:5000/adminloginapi/login
router.post('/login', async (req, res) => {
    const admin_email = req.body.admin_email
    const admin_password = req.body.admin_password

    try {
        const login = await Admin.findOne({ admin_email })

        if (!login) {
            return res.json({"sts": 1, "msg": "Don't Change Email!!"})
        } else {
            if (await bcrypt.compare(admin_password, login.admin_password)) {
                const token = jwt.sign({ adminId: login._id }, process.env.ADMIN_TOKEN_SECRET, { expiresIn: "5hr" })
                const expiresAt = new Date(Date.now() + (5 * 60 * 60 * 1000))

                const adminTokenSave = new AdminToken({
                    adminId: login._id,
                    token,
                    expiresAt,
                })

                const aid = login._id
                const aemail = login.admin_email
                const aname = login.admin_name

                await adminTokenSave.save()
                return res.json({"sts": 0, aid, aemail, aname, token})
            } else {
                return res.json({"sts": 2, "msg": "Incorrect Password !!"})
            }
        }
    } catch (error) {
        console.error("Error during login:", error); // Log detailed error information
        res.status(500).json({"error": "An internal server error occurred."})
    }
})

// http://localhost:5000/adminloginapi/checktoken
router.post('/checktoken', async (req, res) => {
    const token = req.body.token
    try {
        const tokenchk = await AdminToken.findOne({token})
        if (!tokenchk) {
            return res.json({'tokensts' : 1}) // no token found
        } else {
            return res.json({'tokensts' : 0}) // token found
        }
    } catch (error) {
        console.error(error)
    }
})


module.exports = router