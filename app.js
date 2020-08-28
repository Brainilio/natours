const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json())
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


// ------------------- ROUTING ---------------- // 



app.get('/api/v1/tours', (req, res) => {
     res.status(200).json({
          status: 'success',
          data: {
               tours
          }
     })
})

app.post('/api/v1/tours', (req, res) => {
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

})

app.get('/api/v1/tours/:id', (req, res) => {
     console.log(req.params);
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
})

app.patch('/api/v1/tours/:id', (req, res) => {
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
})


const port = 3000;
app.listen(port, () => {
     console.log(`App running on port ${port}`)
})