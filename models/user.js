const mongoose = require('mongoose');
const Scheme   = mongoose.Schema;

const UserSchema = new Scheme({
    username : String,
    googleId : String
});

const User = mongoose.model('user',UserSchema);

module.exports = User;