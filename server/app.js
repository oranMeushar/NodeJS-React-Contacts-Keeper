const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('./middleware/cors');
const errorController = require('./controllers/errorController');
const authRoute = require('./routes/auth');
const contactsRoute = require('./routes/contacts');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

dotenv.config({
    path:'./config/config.env'
});

const app = express();

const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30   minutes window
    max: 600 
});

const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes window
    max: 50
});

const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 30, 
    message:"Too many accounts created from this IP, please try again after an hour"  
});

app.use(cors());
app.use(bodyParser.json({
    limit:'50kb',
}));

app.use(cookieParser());
app.use(limiter);
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/forgotPassword', authLimiter);
app.use('/api/v1/auth/signup', createAccountLimiter);

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(compression());


app.use('/api/v1/auth',authRoute);
app.use('/api/v1/contacts',contactsRoute);
app.use(errorController);



(async()=>{
    const options = {
        useUnifiedTopology:true,
         useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        poolSize:10,
        serverSelectionTimeoutMS:10000,
        socketTimeoutMS:45000
    }
    try{
        await mongoose.connect(process.env.CONNECT_MONGO_ATLAS,options)
        console.log('Successfuly connected to database');
    }
    catch(error){
        console.log(error);
    }
})()

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server starts Listening on port ${PORT}`);
})


