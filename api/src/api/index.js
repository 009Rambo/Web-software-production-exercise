const express = require('express');

const emojis = require('./emojis');
const books = require('./books');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/books', books);

module.exports = router;
