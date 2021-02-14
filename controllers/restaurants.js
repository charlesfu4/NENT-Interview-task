const restaurantsRouter = require('express').Router()
const Restaurant = require('../models/restaurant')

// End points displays all the data
// Queries include sort and filter
restaurantsRouter.get('/', async (request, response) => {
  const { sort, ...filters } = request.query
  if(!request.query.sort){
    request.query.sort=''
  }
  let formatFilters = JSON.stringify(filters)
    .replace(/\b(gt|gte|lt|lte|eq|ne)\b/g, match => `$${match}`)
  console.log(JSON.parse(formatFilters))
  console.log(sort)
  try{
    const restaruants = await Restaurant
      .find(JSON.parse(formatFilters))
      .sort(request.query.sort)
    if(restaruants){
      restaruants.length === 0
        ? response.json({ status: 'empty' })
        : response.json({ status: 'success', restaruants })
    }
    else{
      response.status(404).end()
    }
  } catch(error){
    response.status(500).json({ error: error })
  }
})

// End points let users to get complete information about the restaurant
restaurantsRouter.get('/:id', async (request, response) => {
  try{
    const foundRestaurant = await Restaurant.findById(request.params.id)
    if(foundRestaurant){
      response.json({ status: 'success', foundRestaurant })
    }
    else{
      response.status(404).end()
    }
  } catch(error){
    response.status(500).json({ error: error })
  }
})

// End points let users get get complete information about the restaurant
restaurantsRouter.post('/', async (request, response) => {
  const body = request.body

  const restaurant = new Restaurant({
    location: body.location,
    opening_hours: body.opening_hours,
    address: body.address,
    phone_number: body.phobe_number,
    icon: body.icon,
    name: body.name,
    rating: body.rating,
    google_maps_url:  body.google_maps_url,
    website: body.website,
    photo: body.photo,
  })
  try{
    const savedRestaurant = await restaurant.save()
    response.json({ status: 'success', savedRestaurant })
  } catch(error){
    response.status(500).json({ error : error })
  }
})

// Delete restaruant from the DB
restaurantsRouter.delete('/:id', async (request, response) => {
  try{
    await Restaurant.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(error){
    response.status(403).json({ error : error })
  }
})

module.exports = restaurantsRouter