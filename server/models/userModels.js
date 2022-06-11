const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
},
    {
        timestamps:true             //  Авто тарзда  created date  ва  updated date ларни кушиб беради  mongoose га
    }
)

module.exports = mongoose.model('User', userSchema)