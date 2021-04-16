const mongoose = require('mongoose'); 


//create an article model
const articleSchema = mongoose.Schema(
    {
        title: { type: String, required: true}, 
        description: { type: String, required: true}, 
        imageUrl: { type: String, required: true}, 
        userId: { type:mongoose.Schema.Types.ObjectId, required:true, ref: 'User'}, //faire référence à l'id d'user
        categories: [{type: String, required: false}] //an array 
    },
    {timestamps: true},
); 



module.exports = mongoose.model('Article', articleSchema);
