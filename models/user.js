//schema mongoose
 const mongoose = require('mongoose'); 
 //unique validator link
 const uniqueValidator = require('mongoose-unique-validator'); 

 const userSchema = mongoose.Schema({
     email: {type:String, required:true, unique:true},
     password: {type: String, required:true},
     friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],//on fait référence à un user déjà existant
 })

userSchema.plugin(uniqueValidator); 

//export a module 
 module.exports = mongoose.model('User', userSchema);