const express = require('express')
const router = express.Router();
const multer = require('multer')
const upload = multer({
    dest: "uploads/", limits: {
        fileSize: 10 * 1024 * 1024 //10 MB
    }
})

//Middleware
const {auth}=require('../middlewares/auth')

const userController=require('../controllers/userController')
const projectController=require('../controllers/projectController')

//Auth /user ctrl/ register login

router.get('/users',userController.getAllUsers);
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/is_username_availabe',userController.isUsernameAvailable)
router.post('/get_user_details',auth,userController.getUserDetailsByUsername)

//Project

router.post('/projects/create',auth,projectController.createProject)
router.get('/projects/',auth,projectController.getAllProjects)

module.exports=router