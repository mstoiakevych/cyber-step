const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const User = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String
    },
    age: {
        type: Number
    },
    imageUrl: {
        type: String,
        default: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png'
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
})

module.exports = mongoose.model('User', User)


