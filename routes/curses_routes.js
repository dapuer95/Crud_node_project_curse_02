const express = require('express');
const controllers = require('../controllers/curses_controllers')
const middleware = require('../middlewares/auth');

const route = express.Router();

route.post('/', middleware, controllers.createCurse);
route.get('/', middleware, controllers.curseList);
route.get('/:curseId', controllers.curseById);
// route.put('/:userId', controllers.updateUser);
// route.delete('/:userId', controllers.changeState);

module.exports = route;