const yup = require('yup')

const userValidation = {
  signup: yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    repassword: yup.string().required()
  }),

  signin: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
  }),

  forgotPassword: yup.object().shape({
    email: yup.string().email().required()
  })
}

module.exports = userValidation
