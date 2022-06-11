const express = require('express');
const router = express.Router()
const { getUsers, registerUser, loginUser } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');



router.get('/',protect, getUsers)

router.post('/register', registerUser)

router.post('/login', loginUser)







module.exports = router