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
|   |   ├── docker-composer.yml
|   |   └── provision
│   └── mongodb_test
|       ├── docker-composer.yml
|       └── provision
└── .env
```


### Instructions

#### Build database image

The database in the form of docker containers provides two clone versions of the original image. Always make sure you are running the correct docker image when either production or testing mode.

- Depending on which mode you are in, navigate to different folder `mongodb/mogodbtest`. The first is for produciton mode and the second is for testing mode.
- Simply run `docker-compose up --build` and the database instance will listen on port 27017.
- **Warning**: Always shut down the current one before launching the other one to avoid port conflicts.

#### Installation

Run `npm install` to install node packages that will be used in this application.

#### Production version

To set up the production version of the backend APIs. Please follow the steps after launching the db container.

- Run `npm start` to run the application, the endpoints can then be accessed through <a href="http://localhost:3001">http://localhost:3001</a>.
- <a href="https://www.postman.com/downloads/">POSTMAN</a> is recommended to try out the API endpoints.

#### Testing Mode

To run integrated tests of the backend APIs. Please follow the steps after launching the testing db container.

- Run `npm test -- /test/restaurant_api.test.js` to run the application.
- Tests will be executed in a log-based manner with success/error messages.

### Basic functionalities

- [x] An endpoint that lets the client get a list of all restaurants
- [x] An endpoint that lets the client get more info on a single restaurant
- [x] An endpoint that accepts a POST request to add new restaurants to the DB
- [x] Function that deletes restaurants from the DB through the API
- [x] Function that fetch a sorted list of restaurant based on relevant attribute
- [x] Function that fetch a filtered list of restaurant based on relevant attribute

### Extra functionalities

- [x] An endpoint that lets the client update restaurant info based on id
- [x] Backend test

### Documentation

- [x] Instructions on how to run your application. (including toolset versions)
- [ ] List of features completed/attempted
- [ ] A short explanation of your design decisions if necessary
- [ ] Possible improvements and bugs if any
- [ ] Other ideas and thoughts on the application you have written

