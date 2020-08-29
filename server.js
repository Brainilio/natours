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

const app = require('./app');

// -------------------- LISTENING TO SERVER -------- //
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
