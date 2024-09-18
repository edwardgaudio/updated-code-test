const express = require('express');
const router = express.Router();
const { getProducts, getProductsByCharacteristic, getProductsByScore } = require('../services/products-service');

router.get('/', async function(req, res, next) {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});


router.get('/characteristic', async function(req, res, next) {
  const characteristic = req.query.characteristic;

  if (!characteristic) {
    return res.status(400).json({ error: 'Characteristic query parameter is required' });
  }

  try {
    const products = await getProductsByCharacteristic(characteristic);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

router.get('/score', async function(req, res, next) {
  try {
    const products = await getProductsByScore();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;

