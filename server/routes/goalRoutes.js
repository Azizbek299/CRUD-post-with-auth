const express = require('express');
const router = express.Router()
const {getGoals, setGoal, updateGoal, deletGoal} = require('../controller/goalController');
const { protect } = require('../middleware/authMiddleware');



router.get('/',protect, getGoals)

router.post('/',protect, setGoal)

router.put('/:id',protect, updateGoal)

router.delete('/:id',protect, deletGoal)






module.exports = router