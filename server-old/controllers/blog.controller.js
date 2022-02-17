// Import the model
const Blog = require('../models/blog.model');

// Export request methods
module.exports = {
    create: (req, res) => {
        let game = new Blog({
            title: req.body.title,
            text: req.body.text,
            imgUrl: req.body.imgUrl,
            posted: new Date()
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
        Blog.updateOne({_id: req.body._id}, req.body)
            .then(result => {
                if (!result) res.json({success: false, result: "Blog does not exist"});

                res.json({success: true, result: "Blog successfully updated!"});
            })
            .catch(err => {
                res.json({success: false, result: err});
            });
    },
    getAll: (req, res) => {
        Blog.find()
            .then(result => {
                if (!result) res.json({success: false, result: "Nothing was found"})

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    getOne: (req, res) => {

        Blog.findOne({_id: req.params.id})
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
        Blog.deleteOne({_id: req.params.id})
            .then(result => {
                res.json({success: true, result: result})
            })
            .catch(err => {
                res.json({success: false, result: err})
            });
    }
}
