const express = require('express');
const router = express.Router();

const Auth = require('./Auth');
const Book = require('./Book');

router.use('/', Auth);
router.use('/inv', Book);

module.exports = router;