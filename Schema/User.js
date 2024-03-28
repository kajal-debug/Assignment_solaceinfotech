const mongoose = require('mongoose');
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

let UserSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true},
    password : {type : String , required : true},
    isAdmin : {type : Boolean , default : false},
}, {timestamps : true});

const User = mongoose.model('user' , UserSchema);
module.exports = User;