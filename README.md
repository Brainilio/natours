# natours

NodeJS application for booking tours

Docs:

### /dev-data

- Contains data that will be used throughout the app

### /public

- templates and stylesheets

### ./app.js

- Add express config for port listening
- Routing
- Added basic HTTP requests using filesystem to add to local files in /dev-data
- basic middlewares

#### get '/api/v1/tours' gets all the tours

#### post '/api/v1/tours' allows you to post

#### get 'api/v1/tours/:id' gets specific id using req.params.id

#### patch 'api/v1/tours/:id updates specific field

### /routes/...

- contains routes for endpoints in app.js
