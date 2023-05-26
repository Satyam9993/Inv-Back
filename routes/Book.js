const express = require('express');
const router = express.Router();

const {
    createInv,
    fetchInv
} = require('../controllers/Book');
const fetchuser = require('../middleware/fetchuser')

router.post('/',fetchuser,createInv);
router.get('/',fetchuser,fetchInv);

module.exports = router;