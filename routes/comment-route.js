const express = require('express'); 
const router = express.Router(); 

const commentCtrl = require('../controlers/comment-ctrl'); 

//Method post to add comment
router.post('/', commentCtrl.createComment); 

//Method Get to display one comment
router.get('/:id', commentCtrl.getOneComment); 

//Method Get to display all comments
router.get('/', commentCtrl.getAllComments); 

//Method to modify a comment
router.put('/:id', commentCtrl.modifyComment); 


//Method to modify a comment
router.delete('/:id', commentCtrl.deleteComment); 



module.exports = router; 