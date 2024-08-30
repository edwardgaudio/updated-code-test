const express = require('express');
const data = require('../data/products');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Gonna start here')
});

module.exports = router;
