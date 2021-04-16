const User = require('../models/user'); 
const bcrypt = require('bcrypt'); 
const jwt = require ('jsonwebtoken'); 



//function to create a new user ; inscription/sign up 

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //encrypt 10 times the password 
        .then(hash => { //if successful recover the hashed/encrypted password
            const user = new User({
                email: req.body.email, 
                password: hash,
                friends: req.body.friends, //encrypted version here 
            }); 
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
                .catch(error => res.status(400).json({ error })); 
        })
        .catch(error => res.status(500).json({ error })); 
}; 
//function to sign in/login to account 

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouveé !'}); //401: unauthorized error
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect!'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign( //function sign utiliser pour encoder l'Id d'utilisateur
                            { userId: user._id},
                            'RANDOM_TOKEN_SECRET', //jwt:utiliser pour l'autorisation et une connexion unique par utilisateur, le token doit être rendu lors de sign out
                            { expiresIn: '24h'} 
                        )
                    });
                })
                .catch(error => res.status(500).json({ error })); //500: internal server error
        })
        .catch(error => res.status(500).json({ error })); 
}; 

//function to display all users 
exports.getAllUsers = (req, res, next) => {
    User.find().then(
        (users) => {
            res.status(200).json(users); 
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error:error
            });
        }
    );
}; 

//get one user with friends
exports.getUser = (req, res, next) => {
    User.findOne({_id: req.params.id}).populate('friends').then( //populate method: récupère les données en entier à travers de leur userId réferencié dans le fichier user.js (models)
        (user) => {
            res.status(200).json(user); 
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}; 

//function pour ajouter un ami

exports.addFriend = (req, res, next) => {
    User.findOneAndUpdate({_id: req.body.userId}, { $push: {friends: req.body.friendId}})//$push est propre à mongoose pour ajouter un element dans un tableau
    .then(
        () => 
        res.status(200).json({ message: 'friend added'})
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}//function to delete a friend 
exports.removeFriend = (req, res, next) => {
    User.findOneAndUpdate({_id: req.body.userId}, {$pull: { friends: req.body.friendId}})
    .then(
        () => {
            res.status(200).json({ message: 'friend deleted'})
        }  
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}