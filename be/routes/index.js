const express = require('express');
const router = express.Router();
const { getDB } = require('../db/index');
const db = getDB();

/* GET healthcheck */
router.get('/', async (req, res, next) => {
  const health_checks = await db('health_check').select('*');
  return res.status(200).json(health_checks);
});

module.exports = router;
