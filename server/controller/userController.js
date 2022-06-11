const asyncHandler = require('express-async-handler');
const User = require('../models/userModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config()




exports.getUsers = asyncHandler( async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).send({
        id: _id,
        name,
        email
    })
})

exports.registerUser = asyncHandler( async(req, res) => {

    const {name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)																				
    hashPassword = await bcrypt.hash(password, salt)	

    const user = await new User({
        name,
        email,
        password: hashPassword
    })
    
    if(user) {
        user.save()
        res.status(201).send({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }


})

exports.loginUser = asyncHandler( async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.send({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'}) 
}