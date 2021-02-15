const restaurantsRouter = require('express').Router()
const Restaurant = require('../models/restaurant')

// End points that displays all the data
// Also provides queries including: sorting and filtering
restaurantsRouter.get('/', async (request, response) => {
  const { sort, ...filters } = request.query
  if(!sort){
    request.query.sort=''
  }
  // Extract url filter query, format see documentation
  let formatFilters = JSON.stringify(filters)
    .replace(/\b(gt|gte|lt|lte|eq|ne)\b/g, match => `$${match}`)

  try{
    const restaruants = await Restaurant
      .find(JSON.parse(formatFilters))
      .sort(request.query.sort)
    if(restaruants){
      response.json(restaruants)
    }
    else{
      response.status(404).end()
    }
  } catch(error){
    response.status(500).json({ error: error })
  }
})

// End point that let users to get complete information about the restaurant
restaurantsRouter.get('/:id', async (request, response) => {
  try{
    const foundRestaurant = await Restaurant
      .findOne({ id: Number(request.params.id) })
    if(foundRestaurant){
      response.json(foundRestaurant)
    }
    else{
      response.status(404).end()
    }
  } catch(error){
    response.status(500).json({ error: error })
  }
})

// End point that lets users create a new restaurant
restaurantsRouter.post('/', async (request, response) => {
  const body = request.body
  // Due to the limitation, we have to stick to incremental id schema
  // This lower the efficiency of creating new restaurant
  const sortedList = await Restaurant.findOne().sort('-id')

  const restaurant = new Restaurant({
    location: body.location,
    opening_hours: body.opening_hours,
    address: body.address,
    phone_number: body.phone_number,
    icon: body.icon,
    name: body.name,
    rating: body.rating,
    price_level: body.price_level,
    google_maps_url:  body.google_maps_url,
    website: body.website,
    photo: body.photo,
    id: sortedList.id + 1
  })
  try{
    const savedRestaurant = await restaurant.save()
    response.json(savedRestaurant)
  } catch(error){
    response.status(400).json({ error : error })
  }
})

// End point that deletes restaruant from the DB
restaurantsRouter.delete('/:id', async (request, response) => {
  try{
    await Restaurant.findOneAndDelete({ id: Number(request.params.id) })
    response.status(204).end()
  } catch(error){
    response.status(403).json({ error : error })
  }
})

// End point that updates restaurant information
restaurantsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const newRestaurant = {
    location: body.location,
    opening_hours: body.opening_hours,
    address: body.address,
    phone_number: body.phone_number,
    icon: body.icon,
    name: body.name,
    rating: body.rating,
    price_level: body.price_level,
    google_maps_url:  body.google_maps_url,
    website: body.website,
    photo: body.photo,
    id: Number(request.params.id)
  }

  try{
    const updatedRestaurant = await Restaurant
      .findOneAndUpdate({ id: Number(request.params.id) },
        newRestaurant,
        { new: true, runValidators: true })
    response.json(updatedRestaurant)
  } catch(error){
    response.status(500).json({ error: error })
  }
})

module.exports = restaurantsRouter