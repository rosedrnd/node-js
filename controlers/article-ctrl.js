const Article = require('../models/article'); 
const fs = require('fs'); //filesystem:native in node that allows us to do CRUD operations on files 

//Method Post to add data 
exports.createArticle = (req, res, next) => {
    const article = new Article({
        title: req.body.title, 
        description: req.body.description, 
        imageUrl: `http://localhost:3000/images/${req.file.filename}`, 
        userId: req.body.userId,
        categories: req.body.categories
    });
    article.save().then(
        () => {
            //we use code 201 for data creation 
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    ); 
}; 

//Method GET to display all articles
exports.getAllArticles = (req, res, next) => {
    Article.find().then(
        (articles) => {
            res.status(200).json(articles); 
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error:error
            });
        }
    );
}; 
//Method GET to display all ONE article
exports.getOneArticle = (req, res, next) => {
    Article.findOne({
        _id:req.params.id
    }).populate('userId')
    .then(
        (article) => {
            res.status(200).json(article); 
        }).catch(
        (error) => {
            res.status(404).json({ //404 not found: URL not found error
                error:error
            });
        }
    );
}; 

//Method Put to modify article 
exports.modifyArticle = (req, res, next) => {
    const article = new Article({
        _id: req.params.id, 
        title:req.body.title, 
        description: req.body.description, 
        imageUrl:`http://localhost:3000/images/${req.file.filename}`, 
        userId: req.body.userId,
        categories: req.body.categories
    });
    Article.updateOne({_id: req.params.id}, article).then( //indicating the target id to update
        () => {
            res.status(201).json({ //201: created 
                message: 'Article updated successfully'
            }); 
        }
    ).catch(
        (error) => { 
            res.status(400).json({
                error:error
            });
        }
    );
};

exports.deleteArticle = (req, res, next) => {
    Article.findOne({_id: req.params.id})
    .then(article => {
        const filename = article.imageUrl.split('/images/')[1]; //recover the file
        fs.unlink(`images/${filename}`, () => { //with function unlink we delete the file in our local folder then delete the user id 
            Article.deleteOne({_id: req.params.id}).then(
                () => {
                    res.status(200).json({ //200: ok 
                        message: 'Deleted!'
                    }); 
                }
            ).catch(
                (error) => {
                    res.status(400).json({ //400: bad request
                     error:error
                    }); 
                }
            );
        })
    }).catch(error => {res.status(500).json({error:error})}) //send internal server error 
}; 