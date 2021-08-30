const express = require('express');
const controllers = require('../controllers/usuers_controllers');
const middleware = require('../middlewares/auth');

const route = express.Router();

route.post('/', controllers.createUser);
route.get('/', middleware, controllers.userList);
route.get('/:userId', controllers.userById);
route.put('/:userId', controllers.updateUser);
route.delete('/:userId', controllers.changeState);

module.exports = route;
