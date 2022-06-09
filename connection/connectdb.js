const mongoose = require('mongoose')

// connect to mongodb
async function connect() {
  // get database url from .env
  const dbUri = process.env.DB_URL

  try {
    await mongoose.connect(dbUri)
    console.log('Database connected.')
  } catch (error) {
    console.log(error.message)
    console.error('Could not connect to the database')
    process.exit(1)
  }
}

module.exports = connect
