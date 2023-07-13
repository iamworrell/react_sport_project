const router = require('express').Router();
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

//variable used to set expiration time of jwt cookie
const jwtTime = 3 * 24 * 60 * 60;

//Function to Create JWT
const createToken = (id) => {
    return jwt.sign({id}, 'secret', {
        expiresIn: jwtTime
    });
}

//API - ENDPOINTS THAT HANDLE GET, POST, DELETE & PUT REQUESTS


//POST Endpoint
//post request made at 'http://localhost:5000/user/addUser'
router.route('/addUser').post( async(req,res)=>{
    //Accessing Data from the URL
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    try{
        //Create New Instance of Document
        const newUser = new User({
            firstName,
            lastName,
            email,
            password
        });

        //Create JWT
        const token = createToken(newUser._id);

        //Create Cookie on Server, Store jwt in cookie and Stores the cookie in the response object
        //res.cookie([name of cookie/key], [value], {})
        res.cookie('jwt', token, { withCrdentials: true,
            httpOnly: false, maxAge: jwtTime * 1000 });

        //Save New Instance to the Database
        newUser.save()
            //res - object saved in the database
            //.then((res) => console.log(res));
            //res.json - sends response Object to any endpoint that makes a post request to 
            //'http://localhost:5000/user/addUser'
            .then(() => res.json('Stored in the data property'))
            //.catch((err) => console.log(err));
    }catch(err){
    } 
});

router.route("/loginUser").post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try{
        
        const doc = await User.login(email, password);
        console.log(doc);

        //Create JWT
        const token = createToken(doc._id);

        //Create Cookie on Server, Store jwt in cookie and Stores the cookie in the response object
        //res.cookie([name of cookie/key], [value], {})
        res.cookie('jwt', token, { withCrdentials: true,
            httpOnly: false, maxAge: jwtTime * 1000 });

        res.status(200).json({doc: doc.email});
       
    }catch(err){
    }
})


//Allows sportServer.js to use this router
module.exports = router;