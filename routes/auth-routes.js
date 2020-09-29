const passport = require('passport');

const router = require('express').Router();


// Auth-Login
router.get('/login',(req,res)=>{
    res.render('login');
});

// Auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// Auth Logout
router.get('/logout',(req,res)=>{
    res.send('logging out');
});

// callback for google
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{   
    res.send('you reached the callback URI');
});

module.exports = router;
