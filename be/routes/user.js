const express = require('express');
const router = express.Router();
const authService = require('../services/auth');

router.post('/signup', async (req, res) => {
  try {
    const results = await authService.signup(req.body);
    if(results.status && results.status !== 200){
      return res.status(results.status).json(results);
    } else {
      return res.status(200).json({
        data: results.data,
      });
    }
  } catch(error) {
    console.error('Error in user/signup: POST', { meta: {
      error,
    }});
    return res.status(500).send();
  }
  
});

router.post('/login', async (req, res) => {
  try {
    const results = await authService.login(req.body);
    if(results.status && results.status !== 200){
      return res.status(results.status).json(results);
    } else {
      return res.status(200).json({
        data: results.data,
      });
    }
  } catch(error) {
    console.error('Error in user/login POST', error)
    return res.status(500).send();
  }
});

module.exports = router;
