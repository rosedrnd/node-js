const express = require('express'); 
const mongoose = require('mongoose'); 
const articlesRoutes =  require('./routes/article-route'); 
const usersRoutes = require('./routes/user-route'); 
const commentsRoutes = require('./routes/comment-route'); 
const path = require('path'); //integrated in node no need to install in the terminal

const app = express();
//connect to cloud MongoDB account
mongoose.connect('mongodb+srv://rose:guillaume143@cluster0.fc59x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{useNewUrlParser: true, 
    useUnifiedTopology: true}) 
    .then(()=> console.log('Connexion à MongoDB réussie!'))
    .catch(()=>console.log ('Connexion à MongoDB échouée!')); 

app.use('/images', express.static(path.join(__dirname, 'images')));  //everytime we see /images as url we are referring to the images folder
app.use(express.json()); 

app.use(express.urlencoded({ extended: true})); 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use('/api/article', articlesRoutes); 
app.use('/api/user', usersRoutes); 
app.use('/api/comment', commentsRoutes); 
app.listen(3000, () => {
    console.log("Serveur à l'écoute")
});