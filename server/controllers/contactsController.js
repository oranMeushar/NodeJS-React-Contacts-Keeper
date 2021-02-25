const AppError = require('../util/AppError');
const Contact = require('../models/Contact');
const catchAsync = require('../middleware/catchAsync');

const postContact = catchAsync(async(req, res, next) =>{
    req.body.userId = req.user._id; 
    const contact = await Contact.create(req.body);
    contact.userId = undefined;
    contact.__v = undefined;

    res.status(201).json({
        status:'Success',
        message:'Contact created successfully',
        data:{
            contact
        }
    })
});

const getContact = catchAsync(async(req, res, next) =>{
    const contacts = await Contact.find({userId:req.user._id}).select('-userId -__v -updatedAt');
    res.status(200).json({
        status:'Success',
        data:{
            contacts
        }    
    })
});

const deleteContact = catchAsync(async(req, res, next) =>{
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:'Success',
        message:'Contact deleted successfully'   
    })
});

const patchContact = catchAsync(async(req, res, next) =>{
    let contact = await Contact.findById(req.params.id);
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone.split('-').join('');
    contact.address = req.body.address;



    contact = await contact.save();
    res.status(200).json({
        status:'Success',
        message:'Contact updated successfully',
        data:{
            contact
        }  
    })
});


module.exports.getContact = getContact;
module.exports.postContact = postContact;
module.exports.deleteContact = deleteContact;
module.exports.patchContact = patchContact;