const express = require('express');
const router = express.Router();
const {body , validationResult} = require('express-validator');
const User = require('../Schema/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 const authenticate = require('../middlewares/authenticate');


router.post('/register', [
    body('name').notEmpty().withMessage('Name is Required'),
    body('email').notEmpty().withMessage('Email is Required'),
    body('password').notEmpty().withMessage('Password is Required')
] ,async (request , response) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors : errors.array()})
    }
    try {
        let {name , email , password} = request.body;

        // check if the user is exists
        let user = await User.findOne({email : email});
        if(user){
            return response.status(401).json({errors : [{msg : 'User is Already Exists'}]});
        }

        // encode the password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password , salt);

       

        // save user to db
        user = new User({name , email , password});
        user = await user.save();
        response.status(200).json({msg : 'Registration is Success',user:user});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});


router.post('/login', [
    body('name').notEmpty().withMessage('name is Required'),
    body('password').notEmpty().withMessage('Password is Required'),
], async (request , response) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors : errors.array()})
    }
    try {
        let {name , password} = request.body;
        let user = await User.findOne({name : name});
        if(!user){
            return response.status(401).json({errors : [{msg : 'Invalid Credentials'}]})
        }
        // check password
        let isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return response.status(401).json({errors : [{msg : 'Invalid Credentials'}]})
        }
          
        // create a token
        let payload = {
            user : {
                id : user.id,
                name : user.name
            }
        };
        jwt.sign(payload , "secretDude" , {expiresIn: 360000000} , (err , token) => {
            if(err) throw err;
            response.status(200).json({
                msg : 'Login is Success',
                token : token
            });
        })
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});


router.post("/logoout",async(request,response)=>{
    
    response.status(200).json({
        msg : 'Logout  Successfully'
    });
})



module.exports = router;