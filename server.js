const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE;
// DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

//connect mongoose
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Running mongoose...`);
  })
  .catch((err) => {
    console.log(err);
  });

//schema to enforce rules for model
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 2.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price.'],
  },
});

//create a model using the schema
const Tour = mongoose.model('Tour', tourSchema);

//new document for tour model
const testTour = new Tour({
  name: 'San Francisco',
  rating: 4.7,
  price: 500,
});

//save it
testTour
  .save()
  .then((doc) => {
    console.log(`You just saved: ${doc}`);
  })
  .catch((err) => {
    console.log('ERROR! ', +err);
  });

const app = require('./app');

// -------------------- LISTENING TO SERVER -------- //
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
