// Import Express module
const express = require('express');

// Import product controller methods
const controller = require('../controllers/auth.controller');

// Get the router
const router = express.Router();

// Init POST-Request urls
router.post('/register', controller.register);
router.post('/login', controller.login);

// Init GET-Request urls
router.get('/getUserByToken', controller.getUserByToken)

// Init PUT-Request urls
router.put('/update', controller.update);

// Export current router
module.exports = router

