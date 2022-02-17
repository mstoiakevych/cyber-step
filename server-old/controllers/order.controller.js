// Import the model
const Order = require('../models/order.model');

// Export request methods
module.exports = {
    create: (req, res) => {
        let order = new Order({
            userId: req.user.userId,
            nickname: req.body.nickname,
            game: req.body.game,
            price: req.body.price,
            date: new Date(),
            currentRank: {
                rank: req.body.currentRank.rank,
                rating: req.body.currentRank.rating,
                imageUrl: req.body.currentRank.imageUrl
            },
            desiredRank: {
                rank: req.body.desiredRank.rank,
                rating: req.body.desiredRank.rating,
                imageUrl: req.body.desiredRank.imageUrl
            },
            comment: req.body.comment,
            booster: req.body.booster,
            offers: req.body.offers,
            couponCode: req.body.couponCode
        });

        order.save()
            .then(result => {
                res.json({success: true, result: result})
            })
            .catch(err => {
                res.json({success: false, result: err})
            })
    },
    update: (req, res) => {
        Order.updateOne({_id: req.body._id}, req.body)
            .then(result => {
                if (!result) res.json({success: false, result: "Order does not exist"});

                res.json(result);
            })
            .catch(err => {
                res.json({success: false, result: err});
            });
    },
    getAll: (req, res) => {
        Order.find()
            .then(result => {
                if (!result) res.json({success: false, result: "Nothing was found"})

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    getOne: (req, res) => {

        Order.findOne({_id: req.params.id})
            .then(result => {
                if (!result) {
                    res.json({success: false, result: "Nothing was found"})
                    return
                }

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}))
    },
    delete: (req, res) => {
        Order.deleteOne({_id: req.params.id})
            .then(result => {
                res.json({success: true, result: result})
            })
            .catch(err => {
                res.json({success: false, result: err})
            });
    }
}
