require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = `mongodb://${process.env.MONGODB_HOST}:${process.MONGODB_PORT}/viaplay`

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = `mongodb://${process.env.TEST_MONGODB_HOST}:${process.TEST_MONGODB_PORT}/viaplay`
}


module.exports = {
  MONGODB_URI,
  PORT
}