const express         = require('express');
const app             = express();
const PORT            = 3000;
const authRoutes      = require('./routes/auth-routes');
const passportSetup   = require('./config/passport-setup');
const mongoose        = require('mongoose');
const keys            = require('./config/keys');
const cookieSession = require('cookie-session');
const passport      = require('passport');

//connect to mongodb
mongoose.connect(keys.mongodb.MongoURI,{ useNewUrlParser: true, useUnifiedTopology: true  })
.then(()=>console.log('connected to DB!'))
.catch(err=>console.log(err));

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// set up view engine 
app.set('view engine','ejs');

// set up routes
app.use('/auth',authRoutes);

//Home route
app.get('/',(req,res)=>{
    res.render('home'); 
});

// config
app.listen(PORT,()=>console.log(`app started on port ${PORT}`));