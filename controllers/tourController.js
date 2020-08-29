const fs = require('fs');

// Global variable
const tours = JSON.parse(
     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// ----------- Middleware METHODS -------------- //
exports.checkID = (req, res, next, val) => {
     console.log(`Tour id is ${val}`);
     if (+req.params.id > tours.length) {
          return res.status(404).json({
               status: 'fail',
               message: 'invalid ID',
          });
     }
     next();
};

exports.checkBody = (req, res, next) => {
     if (!req.body.price || !req.body.name) {
          return res.status(400).json({
               status: 'fail',
               message: 'Post has no name or price!',
          });
     }
     next();
};

// ------------ HTTP METHODS --------------- //

exports.getAllTours = (req, res) => {
     console.log(req.requestTime);
     res.status(200).json({
          status: 'success',
          data: {
               tours,
          },
     });
};

exports.getTour = (req, res) => {
     const id = +req.params.id;
     const tour = tours.find((el) => el.id === id);
     res.status(200).json({
          status: 'success',
          tour: tour,
     });
};

exports.updateTour = (req, res) => {
     res.status(200).json({
          status: 'success',
          data: {
               tour: 'updated tour',
          },
     });
};

exports.createTour = (req, res) => {
     // create id
     const newId = tours[tours.length - 1].id + 1;
     // Merge objects together
     const newTour = Object.assign({
               id: newId,
          },
          req.body
     );
     // Push to end
     tours.push(newTour);
     //write to file
     fs.writeFile(
          `${__dirname}/dev-data/data/tours-simple.json`,
          JSON.stringify(tours),
          (err) => {
               res.status(201).json({
                    status: 'success',
                    data: {
                         tour: newTour,
                    },
               });
          }
     );
};

exports.deleteTour = (req, res) => {
     res.status(204).json({
          status: 'success',
          data: null,
     });
};