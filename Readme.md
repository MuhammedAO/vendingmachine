Hello! 

To run this application, 

## Requirements

- Node.js and npm

## Getting started

Run the following command on your local environment:

```
$ cd vendingmachine

$ npm install
```

Then, you can run locally in development mode with live reload:

```
$ npm run dev
```


For authenticated requests, please, you need to specify an authorization header with the value of "Bearer token"

You will recieve this token as a response once you've logged in. Please copy this token and apply it as specified above.


# User Routes

<!-- authGuard = routes that require authentication -->
```
router.post("/api/users/register")
router.post("/api/users/login")

<!-- one route, 2 http methods -->
router
  .route("/api/users/profile")
  .get(authGuard)
  .put(authGuard)

router.delete("/api/users/profile/delete", authGuard)

<!-- Deposit -->
router.put("/api/users/deposit", authGuard)
router.put("/api/users/deposit/reset", authGuard)

```

# Product Routes
<!-- id = id of the product. This will be returned when a product has been created as an _id field -->
<!-- productAmount: quantity of the product you want to purchase -->
```
router.get('/')
router.post('/create', authGuard)
router.put('/update/:id', authGuard)
router.delete('/delete/:id', authGuard)


<!-- buy -->
router.post('/buy/:id/:productAmount', authGuard, buyProductService)

```

# Folder Structure


dao, Database Access Object
```
This contains the logic to handle database access
```

 Interface 

```
An interface is an abstract type that tells the compiler which property names a given object can have.
```

 Middleware 

```
Contains both the auth and error middleware which are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle
```

routes
```
This contains the api routes for the both the user and products
```
Controllers 
```
Specifies what work should be done and communicates it to the services
```

services
```
The services are responsible for getting the work done and returning it to the controller
```

 Utils
```
This contains the functions that generates a jwt that is shared across the api
```

 Validation 
```
Validating the data from the client
```
