const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const db = require('../models');
const user = require('../models/user');

//passport is going to serialize the info and make it easier to login
passport.serializeUser((user, cb)=>{
    cb(null,user.id)
});

//passport "deserialize" is to take the id and look it up in db
passport.deserializeUser((id, cb)=>{
    db.user.findByPk(id)
    .then(user =>{
        if (user)(
            cb(null, user)
        )
    })
})
.catch(err =>{
    console.log(err);
})