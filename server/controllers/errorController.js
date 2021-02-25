const AppError = require('../util/AppError');

const handleErrorDev = (error, res) => {
    res.status(error.statusCode).json({
        status:error.status,
        message:error.message,
        stack:error.stack,
        errors:error.errors
    })
}

const handleErrorProd = (error, res) => {
    let message = error.isOperational? error.message:
    'Something went wrong. please try again later';
    res.status(error.statusCode).json({
        status: error.status,
        message,
        errors:error.errors
    })
}

const handleCastError = (error)=>{
    const message = `Invalid value <${error.value}> for ${error.path}`;
    return message;
}

const handleValidationError = (error) =>{
    const messages = Object.values(error.errors).map((error) =>{
        return error.message
    })
    return messages.join('. ');
}

const handleDuplicateField = ()=>{
    const message = `Email Already Exists 11000`;
    let error = new AppError(message, 'Failed', 400);
    return error;
}

const errorController = (error, req, res, next) =>{
    error.statusCode = error.statusCode || 500;
    error.message = error.message || 'Server error';
    
    if (process.env.NODE_ENV === 'development') {
        handleErrorDev(error, res);
    }
    else if (process.env.NODE_ENV === 'production'){
        
        if (error.name == 'CastError') {
            error.message = handleCastError(error);
        }
        if (error.name == 'ValidationError') {
            
            error.message = handleValidationError(error);
        }
        if (error.code == '11000') {
            error = handleDuplicateField(error);
        }
        handleErrorProd(error, res);
    }
}

module.exports = errorController;