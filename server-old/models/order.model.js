const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Types = mongoose.Types;

const Order = new Schema({
    userId: {type: Types.ObjectId, ref: 'User'},
    nickname: {type: String, required: true},
    game: {type: String, required: true},
    price: {type: String, required: true},
    date: {type: Date, required: false},
    currentRank: {
        rank: {type: String, required: true},
        rating: {type: Number, required: false},
        imageUrl: {type: String, required: false}
    },
    desiredRank: {
        rank: {type: String, required: true},
        rating: {type: Number, required: false},
        imageUrl: {type: String, required: false}
    },
    comment: {type: String, required: false},
    booster: {type: String, required: false},
    offers: [{type: String, required: false}],
    couponCode: {type: String, required: false}

});

module.exports = mongoose.model('Order', Order);
