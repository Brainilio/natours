const fs = require('fs');
const express = require('express');
const morgan = require('morgan');


// -------------- GLOBAL VARIABLES ---------- // 
const app = express();
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))



// ----------- MIDDLEWARES --------------- // 
app.use(morgan('dev'))

app.use(express.json())

// ------------ HTTP METHODS ---------------

const getAllTours = (req, res) => {
     console.log(req.requestTime)
     res.status(200).json({
          status: 'success',
          data: {
               tours
          }
     })
}

const getTour = (req, res) => {
     const id = +req.params.id
     const tour = tours.find(el => el.id === id)


     if (!tour) {
          return res.status(404).json({
               status: '404',
               message: 'Not found, invalid ID'
          })
     }


     res.status(200).json({
          status: 'success',
          tour: tour
     })

}

const updateTour = (req, res) => {
     if (+req.params.id > tours.length) {
          return res.status(404).json({
               status: 'fail',
               message: 'invalid ID'
          })
     }

     res.status(200).json({
          status: 'success',
          data: {
               tour: 'updated tour'
          }
     })
}

const createTour = (req, res) => {
     // create id
     const newId = tours[tours.length - 1].id + 1;
     // Merge objects together
     const newTour = Object.assign({
          id: newId
     }, req.body);
     // Push to end
     tours.push(newTour);
     //write to file
     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
          res.status(201).json({
               status: 'success',
               data: {
                    tour: newTour
               }
          })
     })

}

const deleteTour = (req, res) => {
     if (+req.params.id > tours.length) {
          return res.status(404).json({
               status: 'fail',
               message: 'invalid ID'
          })
     }

     res.status(204).json({
          status: 'success',
          data: null
     })
}

// ------------------- HTTP ROUTING ---------------- // 

app.route('/api/v1/tours')
     .get(getAllTours)
     .post(createTour)



app.route('/api/v1/tours/:id')
     .get(getTour)
     .patch(updateTour)
     .delete(deleteTour)



// -------------------- LISTENING TO SERVER -------- // 

const port = 3000;
app.listen(port, () => {
     console.log(`App running on port ${port}`)
})