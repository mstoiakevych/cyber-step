// Import Express module
const express = require('express');

// Import product controller methods
const controller = require('../controllers/blog.controller');

// Get the router
const router = express.Router();

// Init GET-Request urls
router.get('/get', controller.getAll)
router.get('/get/:id', controller.getOne)

// Init POST-Request urls
router.post('/create', controller.create);

// Init PUT-Request urls
router.put('/update', controller.update);

// Init Delete-Request urls
router.delete('/delete/:id', controller.delete);

// Export current router
module.exports = router
