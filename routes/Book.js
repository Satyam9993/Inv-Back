const express = require('express');
const router = express.Router();

const {
    createInv,
    fetchInv,
    updateInv,
    deleteInv,
    adjustInv
} = require('../controllers/Book');
const fetchuser = require('../middleware/fetchuser')

router.post('/',fetchuser,createInv);
router.get('/',fetchuser,fetchInv);
router.put('/:invId',fetchuser,updateInv);
router.delete('/',fetchuser,deleteInv);
router.put('/adjust/:invId',fetchuser, adjustInv);

module.exports = router;