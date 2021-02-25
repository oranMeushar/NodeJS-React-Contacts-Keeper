const mongoose = require('mongoose')
const validator = require('validator');


const options = {
    optimisticConcurrency:true,
    timestamps:true,
    selectPopulatedPaths:false,
}

const contactsSchema = new mongoose.Schema({
    name:{
        type: 'string',
    },
    email:{
        type: 'string',
        validate:[validateEmail, 'Please provide a valid email']
    },
    phone:{
        type: 'string',
        validate:[validatePhone, 'Invalid phone number']
    },
    address:{
        type: 'string',
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},options);

function validateEmail(email){
    return (validator.isEmail(validator.trim(email)) ||email.length === 0);
}

function validatePhone(phone){
    return (validator.isInt(validator.trim(phone)) && phone.length === 10 ||phone.length === 0);
}

contactsSchema.pre('save', function (next) {
    if (this.isModified('phone')&& this.phone.length !== 0) {
        let phone = this.phone;
        phone = phone.split('');
        for (let i = 0; i < 7; i++) {
            if (i % 3 === 0 && i !=0) {
                phone[i] = phone[i].replace(phone[i], `-${phone[i]}`);
            }
        }
        this.phone = phone.join('');
        return next();
    }
    next();
})


const Contact = mongoose.model('Contact', contactsSchema);
module.exports = Contact;