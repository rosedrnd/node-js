const mongoose = require('mongoose'); 


//create an new collection for comments 
const commentSchema = mongoose.Schema(
    {
        message: { type: String, required: true},  
        userId: { type: String, required: true},
    },
    {timestamps: true},
); 

module.exports = mongoose.model('Comment', commentSchema); 