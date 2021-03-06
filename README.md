# NENT-Interview-task

## Backend task 

Your task is to create a REST API that can read and write into the provided db while providing endpoints to clients from which they will be able to perform basic CRUD (Create, Read, Update, Delete) operations on the database. Instructions on how to set up the mongoDB container provided and an example of the data included are briefly described in the next section. Feel free to modify the schema of the database if you think it is necessary.


### Project Structure

```
├─── database
│   ├── dev
│   └── testing
└─── app
    ├── index.js
    ├── app.js
    ├── controllers
    │   └── restaurants.js
    ├── models
    │   └── restaurant.js
    ├── package-lock.json
    ├── package.json
    ├── utils
    │   ├── config.js
    │   ├── logger.js
    │   └── middleware.js
    └── test
        ├── restaurant_api.test.js 
        └── test_helper.js
```

### Instructions 

#### Tools version

[![Generic badge](https://img.shields.io/badge/npm-7.5.3-<COLOR>.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/docker-20.10.2-<COLOR>.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/dockercompose-1.27.4-<COLOR>.svg)](https://shields.io/)
### Dockerized application

#### Production mode

```shell
docker-compose up --build
# then access localhost:3001/api/restaurants to comsume the APIs
# after finishing
docker-compose down
```

#### Testing mode

```shell
cd app/
vim Dockerfile
# Comment out the CMD ["npm", "start"] and activate the CMD ["npm", "test", "--", "/test/restaurant_api.test.js"] 
# save and quit
cd ..
docker-compose up --build
# Then the integrated tests will be run in the logs
# after finishing
docker-compose down
```

### Features Implemented

#### Basic functionalities

- [x] An endpoint that lets the client get a list of all restaurants
- [x] An endpoint that lets the client get more info on a single restaurant
- [x] An endpoint that accepts a POST request to add new restaurants to the DB
- [x] Function that deletes restaurants from the DB through the API
- [x] Function that fetch a sorted list of restaurant based on relevant attribute
- [x] Function that fetch a filtered list of restaurant based on relevant attribute

#### Extra functionalities

- [x] An endpoint that lets the client update restaurant info based on id
- [x] Backend test
- [x] Dockerized

#### Detail url queries for sorting and filtering

- Sorting: **GET** `http://localhost:3001/api/restaurants?sort={attribute}`
  - sorting can be stacked by using `+`. **Ex:** `http://localhost:3001/api/restaurants?sort=rating+price_level`
  - default sorting descendently, put `-` to activate ascendently sort. **Ex:** `-rating`
  - above two can be stacked together. **Ex:** `-rating+-price_level` (sorted by rating and price level ascendently)

- Filtering: **GET** `http://localhost:3001/api/restaurants?{attribute}[lt|lte|eq|ne|gt|gte]={value}`
  - lt: lower than, lte: lower than equal, eq: equal, ne: not equal, gt: greater than, gte: greater than equal
  - stacking, need character `&`. **Ex:** `http://localhost:3001/api/restaurants?price_level[lt]=2&rating[gt]=4` (filter with price level lower than 2 and rating greater than 4)


### Design decisions

The backend application is relatively simple since there is only one model, which is the restaurant itself. Therefore, the Schema that I defined for the endpoint APIs follows the original Schema. Notice here, I picked the `id` as an unique identifier since I stick to incremental id that provided by the original Schema. `_id` and `__v` are both discarded according to the instruction. 
Here, I also put `name`, `opening_hours`, and `address` as required field which is the three most important attributes for a new created restaurant.

```javascript
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
```

The architecture itself is also obvious. According to the structural diagram above and from the funtional point of view. Each component has its own purpose. This is a structure that keeps functionalities overlapping to the lowest and makes code clean and organized.


### Possible improvements, bugs, and thoughts 

- Sorting: The sorting functionalities now is only limited to rating, pricing, and location fields. Since these three are the numeric fields. Of course, the other String attributes can be sorted, but it doesn't really make sense in sorting address or web links in most use cases. Noted that, the funcitonalities can be expanded to field such as opening hours if the Schema is defined as Date. This might be useful when the endpoint wants to provide insight about how long the restaurant actually opens in a week.

- Filtering: The filtering function works for full-field comparison, which means it filters the whole body of the field by not partial. The existing bug is filtering queries on location can caused error. The reason is that it has two fields `lat`, and `lng`. And the current url query format does not support child field filtering.

- Incremental id: In the coding task instruction. It suggested us not to use the `_id`(the mongoDB unique id). This is questionable. Since the remaining id field follows incremental manner, this make the create function an overhead of the performance of the application. So basically, we will have to sort the whole collection according to their incremental id before we can assign a new unique id to the newly created object. The extra cost of sorting before creating is not ideal in my mind and hopefully it can be easily solved by going back to using `_id` field.

### Documentation

- [x] Instructions on how to run your application. (including toolset versions)
- [x] List of features completed/attempted
- [x] A short explanation of your design decisions if necessary
- [x] Possible improvements and bugs if any, idea and thoughts
