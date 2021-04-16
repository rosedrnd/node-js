const Comment = require('../models/comment'); 

//Function to create a comment

exports.createComment = (req, res, next) => {
    const comment = new Comment({
        message: req.body.message, 
        userId: req.body.userId
    }); 
    comment.save().then(
        () => {
            res.status(201).json({
                message: 'Comment saved succesfully'
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

//Function to display a comment

exports.getOneComment = (req, res, next) => {
    Comment.findOne({
        _id: req.params.id
    }).then(
        (comment) => {
            res.status(200).json(comment)
        }
    ).catch (
        (error) => {
            res.status(404).json({ 
                error: error 
            }); 
        }
    );
};

//function to display all comments 
exports.getAllComments = (req, res, next) => {
    Comment.find().then(
        (comments) => {
            res.status(200).json(comments);
        }
    ).catch(
        (error) => {
            res.status(400).json({ 
                error: error 
            }); 
        }
    );
};

//Function to modify a comment 

exports.modifyComment = (req, res, next) => {
    const comment = new Comment({
        _id: req.params.id, 
        message: req.body.message
    }); 
    Comment.updateOne({_id: req.params.id}, comment).then(
        () => {
            res.status(201).json({
                message: 'Comment successfully updated'
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

//function to delete a comment 
exports.deleteComment = (req, res, next) => {
    Comment.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Comment deleted!'
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