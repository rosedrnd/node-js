const express= require('express');

//import functions 
const auth = require('../security/auth');  
const articleCtrl = require('../controlers/article-ctrl'); 
const router =  express.Router(); 
const multer = require('../upload/multer-config');  // import image configuration 


//
router.get('/', auth.usersAuth, articleCtrl.getAllArticles); 
router.post('/', multer, articleCtrl.createArticle); 

router.get('/:id', articleCtrl.getOneArticle); 
//route for put containing the function created in articl-ctrl
router.put('/:id', articleCtrl.modifyArticle);

//route for delete containing the function created in articl-ctrl
router.delete('/:id', articleCtrl.deleteArticle);

module.exports = router; 