const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');


//Create Server
const app = express();

//Cors
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
}));


//Give us Access to JSON Data
app.use(express.json());
//allows us to manipulate the cookies in a browser
app.use(cookieParser());

//Connect to MongoDB
const uri = "mongodb+srv://worrell:test123@sportclusterone.kcvkcgk.mongodb.net/sportDatasheet?retryWrites=true&w=majority";
mongoose.connect(uri)
.then(()=>console.log("Connection Made to MongoDB"))
.catch((err)=>console.log(err));

//Connecting the Server to the endpoints/Routers
const footballPlayerRouter = require('./routes/footballPlayers');
const userRouter = require('./routes/user');
const checkUser = require('./middleware/authMiddleware');

//Allows us to use the Routers
//This code preceds 'http://localhost:5000/football/' on all the endpoints created in footballPlayers.js
app.use('/football', footballPlayerRouter);
//
app.use('/user', userRouter);

//Middleware that gets user info from cookie
app.post('/', checkUser);


//Starting the Server
app.listen(5000, ()=>{
    console.log('The Server is Running...');
});