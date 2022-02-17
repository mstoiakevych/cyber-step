// Import Express module
const express = require('express');

// Get Express instance
const app = express();

// Import Cors policy headers
const cors = require('cors')

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

// Register routes
app.use('/api/games', require('./routes/game.router'))
app.use('/api/auth', require('./routes/auth.router'))
app.use('/api/blogs', require('./routes/blog.router'))
app.use('/api/orders', require('./routes/order.router'))

// Export our module
module.exports = app;
