const express = require('express');
const router = express.Router();
const productData = require('../data/products')
const { getDB } = require('../db')

router.get('/', async function(req, res) {
  try {
    res.json(productData)

  } catch(error) {
    console.log(error)
    res.status(500).json({error: error})
  }
});

router.get('/characteristics', async function(req, res) {
  if(!req.query?.c1){
    res.status(400).json({error: "Query parameter missing"})
  }
  try {
    const db = getDB()
    const products = await db.raw(`
    SELECT p.name
    FROM products p
    JOIN product_characteristics pc ON p.id = pc.product_id
    JOIN characteristics c ON pc.characteristic_id = c.id
    WHERE c.name = ?
    `, req.query.c1)

    res.json(products.rows)

  } catch(error) {
    console.log(error)
    res.status(500).json({error: error})
  }
})

router.get('/scores', async function(req, res) {
  try {
    const db = getDB()
    const product_scores = await db.raw(`
      SELECT p.name, SUM(c.score) as total_score
      FROM products p
      JOIN product_characteristics pc on p.id = pc.product_id
      JOIN characteristics c ON pc.characteristic_id = c.id
      GROUP BY p.id
    `);
    res.json(product_scores.rows)

  } catch (error){
    console.log(error)
    res.status(500).json({error: error.mesage})
  }
})

module.exports = router;
