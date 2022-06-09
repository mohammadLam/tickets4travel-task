const userRouter = require('express').Router()
const auth = require('../middleware/auth')
const userController = require('../controller/user')

userRouter.get('/profile', auth, userController.profile)

module.exports = userRouter
