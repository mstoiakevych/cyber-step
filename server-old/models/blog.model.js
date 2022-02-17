const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Blog = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    posted: {type: Date, required: false},
    imgUrl: {type: String, required: false}
});

module.exports = mongoose.model('Blog', Blog);
