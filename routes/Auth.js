const express = require('express');
const router = express.Router();

const { 
    Login,
    SignIn
} = require('../controllers/Auth');

router.post('/login', Login)
router.post('/Signin', SignIn)

module.exports = router;