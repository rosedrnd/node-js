const express= require('express'); 
const router =  express.Router(); 
 const auth = require('../security/auth');
const userCtrl = require('../controlers/user-ctrl'); 

//create the new user
router.post('/signup', userCtrl.signup); 
//login to account
router.post('/login', userCtrl.login); 
//to add a friend
router.put('/addFriend', userCtrl.addFriend);

//to delete a friend
router.put('/deleteFriend', userCtrl.removeFriend)

//display all users
router.get('/', userCtrl.getAllUsers) 
//get one user with friends

router.get('/:id', auth.userAuth, userCtrl.getUser);

module.exports = router; 