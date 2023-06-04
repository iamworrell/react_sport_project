const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Create Server
const app = express();

//Cors
app.use(cors());

//Give us Access to JSON Data
app.use(express.json());

//Connect to MongoDB
const uri = "mongodb+srv://worrell:test123@sportclusterone.kcvkcgk.mongodb.net/sportDatasheet?retryWrites=true&w=majority";
mongoose.connect(uri)
.then(()=>console.log("Connection Made to MongoDB"))
.catch((err)=>console.log(err));

//Connecting the Server to the endpoints/Routers
const footballPlayerRouter = require('./routes/footballPlayers');

//Allows us to use the Routers
//This code preceds 'http://localhost:5000/football/' on all the endpoints created in footballPlayers.js
app.use('/football', footballPlayerRouter);


//Starting the Server
app.listen(5000, ()=>{
    console.log('The Server is Running...');
});