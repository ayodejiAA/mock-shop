[![Build Status](https://travis-ci.com/ayodejiAA/mock-shop.svg?branch=master)](https://travis-ci.com/ayodejiAA/mock-shop)

[![Coverage Status](https://coveralls.io/repos/github/ayodejiAA/mock-shop/badge.svg?branch=master)](https://coveralls.io/github/ayodejiAA/mock-shop?branch=master)

# Mock Shop

**Mock Shop** is a simple shopping server.


## Tools
- Server side Framework: ***Nodejs/Express***
- Linting: ***ESLint***
- Style Guide: ***Airbnb***
- Testing: ***Mocha Chai***
- DB: ***Postgres***
- Sequelize ORM
- Documentation: ***Swagger***
- Hosting: ***Heroku***
- Validation: **Joi**
- Compiler - **Babel**


## Documentation

The API is well documented  with Swagger at http://this-mock-shop.herokuapp.com/api/v1/docs

## Hosting
This API is hosted on heroku server http://this-mock-shop.herokuapp.com/api/v1

# Installation 
To run this application in development mode, you'll need Node.js (which comes with npm) installed on your computer. From your command line:


* Enters the project directory
* Use the .env.sample file as a guide to the add necessary environment variables to .env file. 
* Run `npm install` to install all dependencies.
* Run `npm run db:migrate` to setup your database.
* You can as well run `npm run db:rollback` to migrate and automatically seed the database with data.
* Run `npm start:dev` to start the development server and points your API testing tool to localhost:5000.



## Features and endpoints

1. User can Sign Up. 
```
POST /api/v1/auth/signup
```
2. User can Sign in.
```
POST /api/v1/auth/login
```
3. Admin can add a Product.
```
POST /api/v1/products/
```
4. Admin can delete a Product.
```
DELETE /api/v1/products/<productId>
```
5. Admin can edit a Product.
```
PATCH /api/v1/products/<productId>
```
6. Users/Admin can see all products.
```
GET /api/v1/products
```
7. Users can add product to a Cart.
```
POST /api/v1/products/<productId>/cart
```
8. A user can see product in his/her cart.
```
GET /api/v1/cart
```
9. User can delete a product from his/her cart.
```
DELETE /api/v1/products/<productId>/cart
```

# Testing
Automated tests are available for a few endpoints. You can run the test script after you are through with the project installation. 

- Run `npm test` to run the script and see the test coverage.




# Guide
### API Specifications
The API endpoints should respond with a JSON object specifying the HTTP ***status*** code, and either a ***data*** property (on success) or an ***error*** property (on failure).

```javascript
// Sucess
{
  "status": 'success',
  "data": {...}
}

// Failure
{
  "status": 'error',
  "error": 'endpoint-error-message'
}
```

### Data Specifications
These specifications are only a guide to aid in developing the application. You have the freedom to come up with your own specifications, as long as the API functions properly and returns appropriate responses. 

```javascript
// user
{
  "id": INTEGER,
  "firstName": STRING,
  "lastName": STRING,
  "email": STRING,
  "password": STRING,
  "isAdmin": BOOLEAN,
}

// product
{
  "id": INTEGER,
  "name": STRING,
  "description": STRING,
  "category": STRING, // clothes, electronics, book
  "price": FLOAT,
  "imageUrl": STRING,
  "inStock": BOOLEAN,
}

// cart
{
  "id": INTEGER,
  "productId": INTEGER, //association with product.id
  "userId": INTEGER, //association with user.id
}
```
