const express = require('express');
const controllers = require('../controllers/auth_controllers')

const route = express.Router();

route.post('/', controllers);


module.exports = route;