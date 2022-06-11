const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModels');
const User = require('../models/userModels');




exports.getGoals = asyncHandler( async(req, res) => {
    const goals = await Goal.find({user:req.user.id})
    res.status(200).send(goals)
})
  


exports.setGoal = asyncHandler( async(req, res) => {
    
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await new Goal({
        text: req.body.text,
        user: req.user.id
    })
    await goal.save()

    res.status(201).send(goal)
})




exports.updateGoal = asyncHandler( async(req, res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== user.id) {
        console.log('server-------------', goal.user.toString() , user.id) 
        res.status(401)
        throw new Error('User not authorized')
    }


    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).send(updatedGoal)
})




exports.deletGoal = asyncHandler( async(req, res) => {
    
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await goal.remove()
    res.status(200).send({id: req.params.id})
})




