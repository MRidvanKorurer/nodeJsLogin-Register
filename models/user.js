const mongoose = require("mongoose");
const Joi = require('joi');
const jwt = require("jsonwebtoken");



const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});


function validationRegister(user) {
    const schema = new Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(5).required()
    });

    return schema.validate(user);
}


function validationLogin(user) {
    const schema = new Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(5).required()
    });

    return schema.validate(user);
}

userSchema.methods.createAuthToken = () => {
    return jwt.sign({_id: this._id}, "jwtPrivateKey");
}


const User =  mongoose.model("user", userSchema);


module.exports = {User, validationRegister, validationLogin}