const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Restaurant = require('../models/restaurant')
const api = supertest(app)

beforeEach(async () => {
  await Restaurant.deleteMany({})
  for(let restaurant of helper.initialRestaurant){
    let restaurantObj = new Restaurant({
      ...restaurant,
    })
    await restaurantObj.save()
  }
})

describe('End point that lets users get all resraurants', () => {
  test('restaurants are returned as json', async () => {
    await api
      .get('/api/restaurants')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all restaurants are returned', async () => {
    const response = await api.get('/api/restaurants')
    expect(response.body).toHaveLength(helper.initialRestaurant.length)
  })
})

describe('End point that lets users create a new restaurant', () => {
  test('Add a restaurant post by POST and the total counts increase by one', async () => {
    const newRestaurant = {
      location: {
        lat: 11.3,
        lng: 33.3
      },
      opening_hours: [
        'Monday: 8:00 AM – 9:00 PM',
        'Tuesday: 8:00 AM – 9:00 PM',
        'Wednesday: 8:00 AM – 9:00 PM',
        'Thursday: 8:00 AM – 9:00 PM',
        'Friday: 8:00 AM – 9:00 PM',
        'Saturday: 9:00 AM – 9:00 PM',
        'Sunday: 9:00 AM – 9:00 PM'
      ],
      address: 'Dogatan 123',
      phone_number: '1233123-321',
      icon: 'http://www.googdog.icon',
      name: 'DogKing restaurant',
      price_level: 100,
      rating: 3.1,
      google_maps_url: null,
      website: 'http://www.ulewa.com',
      photo: 'http://www.adsa.jpg',
    }

    await api
      .post('/api/restaurants')
      .send(newRestaurant)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const endState = await helper.restaurantInDb()
    expect(endState).toHaveLength(helper.initialRestaurant.length+1)

  })

  test('Add a restaurant post by POST and the collections contains new restaurant name', async () => {
    const newRestaurant = {
      location: {
        lat: 11.3,
        lng: 33.3
      },
      opening_hours: [
        'Monday: 8:00 AM – 9:00 PM',
        'Tuesday: 8:00 AM – 9:00 PM',
        'Wednesday: 8:00 AM – 9:00 PM',
        'Thursday: 8:00 AM – 9:00 PM',
        'Friday: 8:00 AM – 9:00 PM',
        'Saturday: 9:00 AM – 9:00 PM',
        'Sunday: 9:00 AM – 9:00 PM'
      ],
      address: 'Dogatan 123',
      phone_number: '1233123-321',
      icon: 'http://www.googdog.icon',
      name: 'DogKing restaurant',
      price_level: 100,
      rating: 3.1,
      google_maps_url: null,
      website: 'http://www.ulewa.com',
      photo: 'http://www.adsa.jpg',
    }

    await api
      .post('/api/restaurants')
      .send(newRestaurant)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const endState = await helper.restaurantInDb()
    const names = endState.map(restaurant => restaurant.name)
    expect(names).toContain('DogKing restaurant')
  })

  test('new restaurant missing required field(name) return 400', async () => {
    const newRestaurant = {
      location: {
        lat: 11.3,
        lng: 33.3
      },
      opening_hours: [
        'Monday: 8:00 AM – 9:00 PM',
        'Tuesday: 8:00 AM – 9:00 PM',
        'Wednesday: 8:00 AM – 9:00 PM',
        'Thursday: 8:00 AM – 9:00 PM',
        'Friday: 8:00 AM – 9:00 PM',
        'Saturday: 9:00 AM – 9:00 PM',
        'Sunday: 9:00 AM – 9:00 PM'
      ],
      address: 'Dogatan 123',
      phone_number: '1233123-321',
      icon: 'http://www.googdog.icon',
      price_level: 100,
      rating: 3.1,
      google_maps_url: null,
      website: 'http://www.ulewa.com',
      photo: 'http://www.adsa.jpg',
    }

    await api
      .post('/api/restaurants')
      .send(newRestaurant)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const endState = await helper.restaurantInDb()
    expect(endState).toHaveLength(helper.initialRestaurant.length)
  })
})


describe('End point that lets users get more info of restaruant based on id', () => {
  test('The first restaurant(id=0). The name should be Tamarindo', async () => {
    const response =  await api
      .get('/api/restaurants/0')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toBe('Tamarindo')
  })

  test('id not exist will get 404 status code', async () => {
    await api
      .get('/api/restaurants/9999')
      .expect(404)
  })
})

describe('End point that lets users delete a restaruant based on id', () => {
  test('Successful deletion return status 204 and list length -1', async () => {
    await api
      .delete('/api/restaurants/1')
      .expect(204)

    const endState = await helper.restaurantInDb()
    expect(endState).toHaveLength(helper.initialRestaurant.length-1)
  })
})

describe('End point that lets users update a restaruant based on id', () => {
  test('Successful update return status 200 and list length remains', async () => {
    const newRestaurant = {
      location: {
        lat: 59.36073769999999,
        lng: 17.9548819
      },
      opening_hours: [
        'Monday: 11:00 AM – 8:00 PM',
        'Tuesday: 11:00 AM – 8:00 PM',
        'Wednesday: 11:00 AM – 8:00 PM',
        'Thursday: 11:00 AM – 8:00 PM',
        'Friday: 11:00 AM – 8:00 PM',
        'Saturday: 12:00 – 8:00 PM',
        'Sunday: 12:00 – 8:00 PM'
      ],
      address: 'Bällstavägen 36, 168 65 Bromma, Sweden',
      phone_number: '070-733 11 28',
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
      name: 'Bun Meat Bun',
      price_level: 2,
      rating: 3.8,
      google_maps_url: 'https://maps.google.com/?cid=106830997729029427',
      website: 'http://www.bunmeatbun.se/',
      photo: 'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg',
    }
    await api
      .put('/api/restaurants/2')
      .send(newRestaurant)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const endState = await helper.restaurantInDb()
    expect(endState).toHaveLength(helper.initialRestaurant.length)
  })

  test('Successful update return restaurant with updated field', async () => {
    const newRestaurant = {
      location: {
        lat: 59.36073769999999,
        lng: 17.9548819
      },
      opening_hours: [
        'Monday: 11:00 AM – 8:00 PM',
        'Tuesday: 11:00 AM – 8:00 PM',
        'Wednesday: 11:00 AM – 8:00 PM',
        'Thursday: 11:00 AM – 8:00 PM',
        'Friday: 11:00 AM – 8:00 PM',
        'Saturday: 12:00 – 8:00 PM',
        'Sunday: 12:00 – 8:00 PM'
      ],
      address: 'Bällstavägen 36, 168 65 Bromma, Sweden',
      phone_number: '070-733 11 28',
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
      name: 'Bun Meat Bun',
      price_level: 2,
      rating: 199199,
      google_maps_url: 'https://maps.google.com/?cid=106830997729029427',
      website: 'http://www.bunmeatbun.se/',
      photo: 'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg',
    }

    const response = await api
      .put('/api/restaurants/2')
      .send(newRestaurant)

    expect(response.body.rating).toBe(199199)
  })
})

describe('Sorting queries', () => {
  test('Sorting based on rating ASC => 3.8', async () => {
    const response = await api
      .get('/api/restaurants?sort=rating')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].rating).toBe(3.8)
  })

  test('Sorting based on rating DES => 4.7', async () => {
    const response = await api
      .get('/api/restaurants?sort=-rating')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].rating).toBe(4.7)
  })

  test('Sorting based on price_level ASC => undefined', async () => {
    const response = await api
      .get('/api/restaurants?sort=price_level')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].price_level).toBe(undefined)
  })

  test('Sorting based on price_level DES => 9', async () => {
    const response = await api
      .get('/api/restaurants?sort=-price_level')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].price_level).toBe(9)
  })
  test('Sorting based on both rating and price_level DES => (9, 4.7)', async () => {
    const response = await api
      .get('/api/restaurants?sort=-price_level+-rating')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].price_level).toBe(9)
    expect(response.body[0].rating).toBe(4.7)
  })
})

describe('Filtering queries', () => {
  test('Filtering based on rating eq 4.7', async () => {
    const response = await api
      .get('/api/restaurants?rating[eq]=4.7')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(1)
    expect(response.body[0].rating).toBe(4.7)
  })

  test('Filtering based on rating in a range 3-4', async () => {
    const response = await api
      .get('/api/restaurants?rating[gte]=3&rating[lte]=4')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(4)
  })

  test('Filtering based on price_level eq 2', async () => {
    const response = await api
      .get('/api/restaurants?price_level[eq]=2')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(6)
  })

  test('Filtering based on price_level in a range 2-9', async () => {
    const response = await api
      .get('/api/restaurants?price_level[gte]=2&price_level[lte]=9')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(8)
  })
})

afterAll(() => {
  mongoose.connection.close()
})