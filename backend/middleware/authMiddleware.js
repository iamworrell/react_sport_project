const jwt = require("jsonwebtoken");
const User = require('../models/Users');
const { model } = require('mongoose');

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'secret', async(err, decodedToken) => {
            if(err){
                console.log("Token is Not Valid" + err.message);
                next();
            }else{
                let doc = await User.findById(decodedToken.id);
                if(doc){
                    res.json({user: doc.firstName});
                }else{
                    console.log("User Not Found");
                    next();
                }
            }
        })
    }else{
        console.log("Token Not Present");
        next()
    }
}

module.exports = checkUser;