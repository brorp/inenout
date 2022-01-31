const express = require('express');
const route = express();
const web_route = require('./web');
const cms_route = require('./cms')
// const errorHandler = require('../middlewares/errorHandler')
route.use('/cms', cms_route)
route.use('/', web_route);


// route.use(errorHandler)

module.exports = route; 