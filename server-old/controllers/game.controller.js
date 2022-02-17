// Import the model
const Game = require('../models/game.model');

// Export request methods
module.exports = {
    create: (req, res) => {
        let game = new Game({
            title: req.body.title,
            nameUrl: req.body.nameUrl,
            imageUrl: req.body.imageUrl,
            sliderImageUrl: req.body.sliderImageUrl,
            digital: req.body.digital,
            maxRating: req.body.maxRating,
            offers: req.body.offers,
            ranks: req.body.ranks
        });

        game.save()
            .then(result => {
                res.json({success: true, result: result})
            })
            .catch(err => {
                res.json({success: false, result: err})
            })
    },
    update: (req, res) => {
        Game.updateOne({_id: req.body._id}, req.body)
            .then(result => {
                if (!result) res.json({success: false, result: "Game does not exist"});

                res.json(result);
            })
            .catch(err => {
                res.json({success: false, result: err});
            });
    },
    getAll: (req, res) => {
        Game.find()
            .then(result => {
                if (!result) res.json({success: false, result: "Nothing was found"})

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    getOne: (req, res) => {

        Game.findOne({nameUrl: req.params.name})
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
        Game.deleteOne({_id: req.params.id})
            .then(result => {
                res.json({success: true, result: result})
            })
            .catch(err => {
                res.json({success: false, result: err})
            });
    }
}
