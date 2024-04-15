const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: String,
    phone_number: String,
    token: String,
    isactive: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    created_by: String,
    modified_at: Date,
    modified_by: String,
    deleted_at: Date,
    deleted_by: String
})

const User = mongoose.model('User', userSchema)

module.exports=User