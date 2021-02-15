const mongoose = require('mongoose')

// Create Schema for restaurant data
const restaurantSchema = new mongoose.Schema({
  location:{
    lat: Number,
    lng: Number,
  },
  opening_hours: {
    type: [String],
    required: true
  },
  address:{
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  icon: String,
  name: {
    type: String,
    required: true,
  },
  price_level: Number,
  rating: Number,
  google_maps_url: String,
  website: String,
  photo: String,
  id: {
    type: Number,
    required: true,
    unique: true
  }
})

// To delete __v field and replace incremental id with __id
restaurantSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Restaurants', restaurantSchema)