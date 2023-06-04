const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const footballPlayerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    nationality: {
        type: String,
        required: true
    },
    club: {
        type: String,
        required: false,
    },
    playerNumber: {
        type: Number,
        required: false,
    },
    bio: {
        type: String,
        required: true,
    }

}, {
    timestamps: true,
});

const FootballPlayer = mongoose.model('FootballPlayer', footballPlayerSchema);

module.exports = FootballPlayer;