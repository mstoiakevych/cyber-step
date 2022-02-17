// Import server app
const app = require('./app');

// Get environment variables
require('dotenv/config');

// Import database wrapper
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect(process.env.DB_CONNECTION_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('\x1b[36m[SERVER] Connected to the database!\033[0m'))
    .catch(err => console.warn(err));


// Run the server on **** port
app.listen(3000, () => {
    console.log('\x1b[36m[SERVER] Server has started!\033[0m')
})
