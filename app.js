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


const port = 3000;
app.listen(port, () => {
     console.log(`App running on port ${port}`)
})