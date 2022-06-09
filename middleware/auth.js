const createHttpError = require('http-errors')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  // get token from cookie
  const token = req.cookies.token

  // if token is not exist that means user unauthorized
  if (!token) {
    return next(createHttpError(401, 'Unauthorized'))
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (error) {
    return next(createHttpError(401, 'Unauthorized'))
  }
}

module.exports = auth
