const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

// -------------- GLOBAL VARIABLES ---------- // 

const app = express();

// ----------- MIDDLEWARES --------------- // 

app.use(morgan('dev'))
app.use(express.json())

// -------------------  ROUTING ---------------- // 

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// -------------------- LISTENING TO SERVER -------- // 

const port = 3000;
app.listen(port, () => {
     console.log(`App running on port ${port}`)
})