const jwt = require('jsonwebtoken'); 
const User = require('../models/user')

//traitement des tokens qu'on recoit 
module.exports.usersAuth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]; //use split function to generate an array with a space separator
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //use verify to decode the encoded token; first parameter the decoded token then the string we used to encode defined in the middleware user-ctrl  
        //after decoding we store the decoded token in a constant to recover the userId
        
        const userId= decodedToken.userId; 
        //verify if the connected user is the same as the recovered id from the decodedToken
        if (req.body.userId && req.body.userId !== userId){ //&& : if user id exist equivalent to ISSET, userId is NOT EQUAL TO token user Id
            res.status(401).json({
                message: 'User Invalid '
            });
        }else{
            next(); //pour qu'on puisse passer à une function à l'autre dans notre cas dans le fichier route on passe de auth à article-ctrl
        }
    }catch{
        res.status(401).json({
            message: 'Invalid request'
        })
    }
}

//authorization for friends of account 
module.exports.userAuth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]; 
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
        const userId= decodedToken.userId; 
        if (req.body.userId && req.body.userId !==userId){
            res.status(401).json({
                message: 'User invalid'
            });
        }else{
            User.findOne({_id: userId})
            .then(user => {
                if(userId == req.params.id || user.friends.indexOf(req.params.id) != -1){
                    next();
                }else{
                    res.status(401).json({
                        message: 'it\'s not your friend'
                    });
                }    
            }).catch(
                (error) => {
                    res.status(400).json({
                        error:error
                    });
                }
            );
        }
    }catch{
        res.status(401).json({
            message: 'Invalid request'
        })
    }
};