const passport          = require('passport');
const GoogleStrategy    = require('passport-google-oauth20');
const keys              = require('./keys');
const User              = require('../models/user');

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken,refreshToken,profile,done) => {
        // passport callback function
        //check if userexists 
        User.findOne({googleId:profile.id}).then((existingUser)=>{
            if(existingUser){
                //user exists in DB
                console.log(existingUser);
            }else{
                // create new user
                const newUser = new User({
                    username:profile.displayName,
                    googleId:profile.id
                });
                newUser.save().then((newuser)=>console.log(`New User added ${newUser}`)).catch(err=>console.log(err));
            }
        }).catch(err=>console.log(err));        
    })
);