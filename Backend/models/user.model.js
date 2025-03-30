const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstName:{
            type:String,
            required:true,
            minlength:[3, 'Minimum length of first name must be at least 3 characters long'],
            maxlength:[30, 'Maximum length of first name must be at most 30 characters long']
        },
        lastName:{
            type:String,
            minlength:[3, "Last name's minimum length must be at least 3 characters long"],
            maxlength:[30, "Last name's maximum length must be at most 30 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength:[5, "Email address must be at least 5 characters long"]
    },
    password: {
        type: String,
        required: true,
    },
    socketId: {
        type: String,
    }
});


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password){
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;