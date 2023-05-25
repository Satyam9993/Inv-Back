const express = require('express');
const router = express.Router();

const {createInv} = require('../controllers/Book');
const fetchuser = require('../middleware/fetchuser')

router.post('/',fetchuser,createInv);

module.exports = router;