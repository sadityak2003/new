const mongoose = require("mongoose")

const adminTokenSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'eshop_admin',
    },
    token: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
})

adminTokenSchema.index({expireAt: 1}, {expireAfterSeconds: 0})

module.exports = mongoose.model('btp_admin_token', adminTokenSchema)