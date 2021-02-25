const mongoose = require('mongoose')
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const options = {
    optimisticConcurrency:true,
    timestamps:true,
    selectPopulatedPaths:false,
}

const userSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required:[true, 'Please provide a user name'],
        minLength:[2, 'Name must contain at least 2 characters'],
        maxLength:[30, 'Name must contain at most 30 characters'], 
    },
    email:{
        type: 'string',
        required:[true, 'Please provide an email'],
        unique:[true, 'A user with that email already exists'],
        validate:[validateEmail, 'Please provide a valid email']
    },
    password:{
        type: 'string',
        required:[true, 'Please provide a password'],
        minLength:[6,'password must contain at least 6 characters'],
        maxLength:[50,'password must contain at most 50 characters'],
        select:false
    },
    passwordConfirm:{
        type: 'string',
        required:[true, 'Please confirm password'],
        minLength:[6,'password must contain at least 6 characters'],
        maxLength:[50,'password must contain at most 50 characters'],
        validate:[isEqualsPasswords, 'Passwords don\'t match']
    },
    passwordResetToken:{
        type:'string'
    },
    passwordResetExpired:{
        type:Date
    }
},options);

function validateEmail(email){
    return validator.isEmail(validator.trim(email))
}

function isEqualsPasswords(passwordConfirm){
    return passwordConfirm === this.password;
}


userSchema.pre('save', async function(next){
    if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        this.passwordConfirm = undefined;
        return next();
    }
    next();
});

userSchema.methods.isEqualsPasswords = async function(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword);
}

userSchema.methods.generateResetToken = async function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpired = Date.now() + 15 * 60 * 1000 //15 minutes
    await this.save({validateBeforeSave:false});
    return resetToken;
}

const User = mongoose.model('User', userSchema);
module.exports = User;