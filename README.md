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

methods that uses fs module:

#### get '/api/v1/tours' gets all the tours from tours-simple.json

#### post '/api/v1/tours' allows you to post to tours-simple.json
