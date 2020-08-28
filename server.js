const app = require('./app');

// -------------------- LISTENING TO SERVER -------- //
const port = 3000;
app.listen(port, () => {
     console.log(`App running on port ${port}`)
})