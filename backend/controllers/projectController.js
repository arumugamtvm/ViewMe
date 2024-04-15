const UserModel = require('../models/userModel')
const ProjectModel = require('../models/projectModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/constants')


//CREATE Project

 const createProject = async (req, res) => {
    const { username, project_name, image_urls, description, code_url, live_url } = req.body

    if (username == '' || username == undefined)
        return res.status(400).json({
            status: 'failed',
            message: "Username is required"
        })

    const user = await UserModel.findOne({ username: username })
    if (!user)
        return res.status(400).json({
            status: 'failed',
            message: 'Username is Invalid!'
        })

    await ProjectModel.create({
        username: username,
        project_name: project_name,
        image_urls: image_urls,
        description: description,
        code_url: code_url,
        live_url: live_url
    });

    res.send('Project Created Successfully')
}

 const getAllProjects = async (req, res) => {
    const result = await ProjectModel.find({ "username": req?.decoded?.username })
    res.send(result)
}

module.exports={createProject,getAllProjects}