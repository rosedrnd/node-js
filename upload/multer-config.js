const multer = require('multer'); 

const MIME_TYPES ={
    'image/jpg' : 'jpg', 
    'image/jpeg': 'jpg', 
    'image/png' : 'png'
}; 
//manage the received files and change/stardandize the file name to avoid errors 
const storage = multer.diskStorage({
    destination: (req, file, callback) => {//call back to send to destination 
        callback(null, 'images') //second parameter: destination  
    }, 
    filename: (req, file, callback) => { //call back to recover original file name
        const name = file.originalname.split(' ').join('_'); //replace spaces with underscore using the function join 
        // const extension = MIME_TYPES[file.mimetype]; //replace extension name using MIME_TYPES
        callback(null, Date.now() + name); //define the new name of the file name plus the upload date
    } 
}); 

module.exports = multer({storage : storage}).single('image');  //upload a single image 