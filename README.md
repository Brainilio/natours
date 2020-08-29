# natours

NodeJS application for booking tours with MVC architecture

#### Contoller:

Application logic (Code that is concerned about application's implementation, not the underlying business problem, manages requests and responses, technical aspects, bridge between model and view layers)

### Model:

Business logic (Code that solves the business problem we set out to solve e.g. validating user input data, password validation, creating new tours etc))

### View:

Presentation logic

Request -> Router -> Controller -> Response
Controller <-> Interact with Model
Controller <-> Send presentation to View

I'll try to offload as much logic as possible into the models, and keep the controllers as simple and lean as possible!

Docs:

### /dev-data

- Contains data that will be used throughout the app

### /public

- templates and stylesheets

### ./server.js

- Starts the server

### ./app.js

- Add express config for port listening
- Routing
- basic middlewares: body parser, morgan for requests & server static files

### /routes/...

- contains routes for endpoints in app.js
- Added basic HTTP requests using filesystem to add to local files in /dev-data
- Http requests uses controllers

## /controllers/...

- Controllers to handle requests & middleware functions
