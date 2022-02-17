const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Game = new Schema({
    title: {type: String, required: true},
    nameUrl: {type: String, required: true},
    imageUrl: {type: String, required: false},
    sliderImageUrl: {type: String, required: true},
    digital: {type: Boolean, required: true},
    maxRating: {type: Number, required: false},
    offers: [
        {
            _id: false,
            title: {type: String, required: false},
            pctCost: {type: Number, required: false}
        }
    ],
    ranks: [
        {
            _id: false,
            rank: {type: String, required: true},
            startsAt: {type: Number, required: false},
            imageUrl: {type: String, required: false},
            levels: [
                {
                    _id: false,
                    level: {type: String, required: false},
                    imageUrl: {type: String, required: false}
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Game', Game);
