const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/constants')

//Login
const login = async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    const user = await UserModel.findOne({ username: username })
    if (!user)
        return res.status(400).json({ status: 'failed', message: 'Username Not Available' })

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
        return res.status(400).json({ status: 'failed', message: 'Password Wrong!' });

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1d' })

    res.json({
        status: 'success',
        message: 'Login Successful!',
        token,
        isLogged: true
    })
}

//GET All Users
const getAllUsers = async (req, res) => {
    const result = await UserModel.find();
    res.send(result);
}

//Register

const register = async (req, res) => {
    const { username, password, fullname, email, phone_number } = req.body
    const user = await UserModel.findOne({ username: username });

    if (user)
        return res.status(400).json({
            status: 'failed',
            message: 'Username Already Exists!'
        })

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 15);

    await UserModel.create({
        username: username,
        password: hashedPassword,
        fullname: fullname,
        email: email,
        phone_number: phone_number,
    });

    res.send('User Created Successfully!')
}

const isUsernameAvailable = async (req, res) => {
    const { username } = req.body

    const user = await UserModel.findOne({ username: username })

    if (user)
        return res.status(400).json({
            status: 'failed',
            message: 'Username Already Exists!'
        })

    res.status(200).json({
        status: 'Success',
        message: "Username is Available"
    })
}

//GET Userdetails

const getUserDetailsByUsername = async (req, res) => {
    const { username } = req.body
    const user = await UserModel.findOne({ username: username })
    if (!user)
        return res.status(400).json({
            status: 'failed',
            message: 'Username Not Exists!'
        })

    return res.status(200).json({
        status: 'Success',
        data: user
    })
}

module.exports = {
    getAllUsers, getUserDetailsByUsername, isUsernameAvailable, login, register
}