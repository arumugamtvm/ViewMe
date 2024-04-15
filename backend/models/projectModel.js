const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    project_name: { type: String, required: true },
    username: { type: String, required: true },
    image_urls: [String],
    description: String,
    code_url: String,
    live_url: String,
    isactive: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    created_by: String,
    modified_at: Date,
    modified_by: String,
    deleted_at: Date,
    deleted_by: String
})

const Project = mongoose.model('Project', projectSchema)

module.exports=Project