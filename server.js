const express = require('express')
const { config } = require('dotenv')
const cookieParser = require('cookie-parser')
const connect = require('./connection/connectdb')
const createHttpError = require('http-errors')

const app = express()

// router
const authRouter = require('./router/auth')
const userRouter = require('./router/user')

config({
  path: './.env'
})

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

// this is test api
app.get('/api/test', (req, res, next) => {
  return res.json({
    message: 'Hello World'
  })
})

app.use((req, res, next) => {
  const error = new createHttpError.NotFound('Route not found')
  next(error)
})

app.use((err, req, res, next) => {
  if (err instanceof createHttpError.HttpError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  } else {
    return res.status(500).json({
      message: err.message
    })
  }
})

app.listen(3000, async () => {
  console.log('Server started on port 3000')
  try {
    await connect()
  } catch (err) {
    console.log(err)
  }
})
