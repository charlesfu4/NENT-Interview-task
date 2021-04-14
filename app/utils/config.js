require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = `mongodb://${process.env.MONGODB_HOST}/viaplay`
console.log('dogdogdogdogdogdog', process.env.MONGODB_HOST)

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = `mongodb://${process.env.TEST_MONGODB_HOST}/viaplay`
}


module.exports = {
  MONGODB_URI,
  PORT
}