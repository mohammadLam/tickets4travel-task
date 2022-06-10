const bcrypt = require('bcrypt')
const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')

const UserModel = require('../model/user')
const authValidation = require('../validation/auth')

const authController = {
  // signup route
  async signup(req, res, next) {
    const { name, email, password, repassword } = req.body

    // validation
    try {
      await authValidation.signup.validate({ name, email, password, repassword })
    } catch (error) {
      return next(error)
    }

    try {
      // check if user already exists
      const checkEmail = await UserModel.findOne({ email })
      if (checkEmail) {
        return next(createHttpError(400, 'Email already exists'))
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // create user
      const user = await UserModel.create({ name, email, password: hashedPassword })

      // finally response
      if (user) {
        return res.json({
          message: 'Signup success'
        })
      }
    } catch (error) {
      return next(error)
    }
  },

  // login route
  async signin(req, res, next) {
    const { email, password } = req.body

    // validation
    try {
      await authValidation.signin.validate({ email, password })
    } catch (error) {
      return next(error)
    }

    try {
      // check if user exists
      const user = await UserModel.findOne({ email })
      if (!user) {
        return next(createHttpError(404, 'User not found'))
      }

      // check if password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) {
        return next(createHttpError(400, 'Password is incorrect'))
      }

      // create token and send it to client
      return res
        .cookie('token', jwt.sign({ userId: user._id }, process.env.JWT_SECRET), {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7
        })
        .json({
          name: user.name,
          email: user.email
        })
    } catch (error) {
      return next(error)
    }
  },

  // logout route
  async logout(req, res, next) {
    // if cookie not found in request, then user are already logged out
    if (!req.cookies.token) {
      return res.json({
        message: 'You are already logged out'
      })
    }

    // return response
    return res.clearCookie('token').json({
      message: 'Logged out'
    })
  },

  // forgot password
  async forgotPassword(req, res, next) {
    const { email } = req.body

    // validation
    try {
      await authValidation.forgotPassword.validate({ email })
    } catch (error) {
      return next(error)
    }

    try {
      // check if user exists
      const user = await UserModel.findOne({ email })
      if (!user) {
        return next(createHttpError(404, 'User not found'))
      }

      return res.json(user)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = authController
