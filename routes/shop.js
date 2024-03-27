const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('<p>The Middleware that handles just /</p>');
});

module.exports = router;
