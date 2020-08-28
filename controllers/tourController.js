const fs = require('fs');

// Global variable
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

// ------------ HTTP METHODS --------------- //

exports.getAllTours = (req, res) => {
     console.log(req.requestTime)
     res.status(200).json({
          status: 'success',
          data: {
               tours
          }
     })
}

exports.getTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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