# NENT-Interview-task

## Backend task 

Your task is to create a REST API that can read and write into the provided db while providing endpoints to clients from which they will be able to perform basic CRUD (Create, Read, Update, Delete) operations on the database. Instructions on how to set up the mongoDB container provided and an example of the data included are briefly described in the next section. Feel free to modify the schema of the database if you think it is necessary.


### Project Structure

```
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
├── test
│   ├── restaurant_api.test.js 
│   └── test_helper.js
├── database
│   ├── mongodb
│   └── mongodb_test
└── .env
```

### Basic functionalities

- [x] An endpoint that lets the client get a list of all restaurants
- [x] An endpoint that lets the client get more info on a single restaurant
- [x] An endpoint that accepts a POST request to add new restaurants to the DB
- [x] Function that deletes restaurants from the DB through the API
- [x] Function that fetch a sorted list of restaurant based on relevant attribute
- [x] Function that fetch a filtered list of restaurant based on relevant attribute

### Extra functionalities

- [x] An endpoint that lets the client update restaurant info based on id
- [ ] Backend test

### Check list

- [x] Deal with incremental id problem

### Documentation

- [ ] Instructions on how to run your application. (including toolset versions)
- [ ] List of features completed/attempted
- [ ] A short explanation of your design decisions if necessary
- [ ] Possible improvements and bugs if any
- [ ] Other ideas and thoughts on the application you have written

