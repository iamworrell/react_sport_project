const router = require('express').Router();
let FootballPlayer = require('../models/FootballPlayers');


//API - ENDPOINTS THAT HANDLE GET, POST, DELETE & PUT REQUESTS


//POST Endpoint
//post request made at 'http://localhost:5000/football/addfootballplayer' in AddPlayerForm.js
router.route('/addfootballplayer').post((req,res)=>{
    //Accessing Data from the URL
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const nationality = req.body.nationality;
    const club = req.body.club;
    const playerNumber = req.body.playerNumber;
    const bio = req.body.bio;

    //Create New Instance of Document
    const newFootballPlayer = new FootballPlayer({
        firstName,
        lastName,
        age,
        nationality,
        club,
        playerNumber,
        bio
    });

    //Save New Instance to the Database
    newFootballPlayer.save()
        //res - object saved in the database
        //.then((res) => console.log(res));
        //res.json - sends response Object to any endpoint that makes a post request to 
        //'http://localhost:5000/football/addfootballplayer'
        .then(() => res.json('Stored in the data property'))
        .catch((err) => console.log(err));
});


//GET ALL FOOTBALLPLAYER DOCUMENT
//get request made at 'http://localhost:5000/football/football' in Football.js
router.route('/football').get((req, res) => {
    
    //Returns all the documents in the footballplayers collection
    FootballPlayer.find()
        //documents stored in dataFromDatabase
        //res.json(dataFromdatabase) - sends response Object to any endpoint that makes a get request to
        //'http://localhost:5000/football/football'
        //stores dataFromDatabase in the data property of the response Object
        .then(dataFromDatabase => res.json(dataFromDatabase))
        .catch(err => res.status(400).json('Error: '+ err));
});


//GET A SINGLE DOCUMENT
//get request made at http://localhost:5000/football/singlefootballplayer/:id
router.route('/singlefootballplayer/:id').get((req, res) => {
    const id = req.params.id;

    //Returns document
    FootballPlayer.findById(id)

    //document is stored in result
    .then(result => {
        //res.json - stores result in the data property of a response Object and
        //send the response Object to the axios get request on PlayerDetails
        res.json(result)
    }).catch(err => {console.log(err);})
})

//DELETE A SINGLE DOCUMENT
//delete request made at 'http://localhost:5000/football/deletefootballplayer/:id'
router.route('/deletefootballplayer/:id').delete((req, res) => {
    //Access URL id parameter
    const id = req.params.id;

    //Search footballplayers collection by id, returns document and delete document with matching id
    FootballPlayer.findByIdAndDelete(id)
        //.then((res)=> console.log(res)) - logs document returned in terminal
        //.then(([stores document returned])=> res.json([send document to delete request url]))
        //res.json() - stores argument in the data property of a response Object and
        //send the response Object to the axios delete request on Football.js
        .then((result)=> res.json('Document with id: ' + result._id + 'was deleted'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

//UPDATE
//put request made at http://localhost:5000/football/updatefootballplayer/:id
router.route('/updatefootballplayer/:id').put(async (req, res) => {
    //Access url parameter ie. id
    const id = req.params.id;

    //Pull data from request body
    const newData = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const nationality = req.body.nationality;
    const club = req.body.club;
    const playerNumber = req.body.playerNumber;
    const bio = req.body.bio;

    //returns document found as an object
    //{new:true} - returns updated document
    await FootballPlayer.findByIdAndUpdate(id, 
        {firstName: newData, lastName: lastName, age: age, 
            nationality: nationality, club: club, playerNumber: playerNumber, bio: bio}, 
        {new: true})
    //then([document returned])
    //res.json([sends argument as data property of reponse Object to put request url])
    //.then(res => console.log(res))
    .then(result => res.json('Player with id: ' + id + ' Updated')).catch((err) => {console.log(err)});
})

//Allows sportServer.js to use this router
module.exports = router;