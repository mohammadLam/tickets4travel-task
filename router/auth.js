const authRouter = require('express').Router()
const authController = require('../controller/auth')
const auth = require('../middleware/auth')

// auth routes

authRouter.post('/signup', authController.signup)
authRouter.post('/signin', authController.signin)
authRouter.get('/logout', authController.logout)
authRouter.post('/forgot-password', auth, authController.forgotPassword)

module.exports = authRouter
