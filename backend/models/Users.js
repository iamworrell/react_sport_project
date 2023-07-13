const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "This Email is Already Registered"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Minimum Password Length is 6 Characters"]
    }

}, {
    timestamps: true,
});

//Login Function for User Model
userSchema.statics.login = async function(email, password) {
    const doc = await this.findOne({email: email})
        try{
            if(doc){
                try{
                    const auth = await bcrypt.compare(password, doc.password);
                    if(auth){
                        
                        return doc;
                    }
                }catch(err){
                    console.log(err);
                }
            }
        }catch(err){
            console.log(err);
        }
}

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;