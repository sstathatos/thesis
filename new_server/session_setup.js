const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let APIConstructor=require('../API/index');
let {readObjs}=APIConstructor;

//authentication strategy-passport
passport.use(new LocalStrategy (
    function(username, password, done) {
        readObjs('users',{username: username})((err, users) =>{
            if(err) throw err;
            if(!users[0]) {
                return done(null , false,'Unknown User');
            }
            else if (users[0].password === password) {
                return done(null,users[0]);
            }
            else {
                return done(null,false,'Invalid password');
            }
        });
    }
));

passport.serializeUser(function(user,done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    readObjs('users',{_id: id})((err, user) =>{
        done(err, user[0]);
    });
});

module.exports= {
    passport:passport
};
