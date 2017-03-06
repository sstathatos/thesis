var passport= require('passport');
var LocalStrategy= require('passport-local').Strategy;
var DAOS= require('../models/model_entity').DAOS;
var users= DAOS[0];

//authentication strategy-passport
passport.use(new LocalStrategy (
    function(username, password, done) {
        users.read({username:username}, function (err,user){
            if(err) throw err;
            if(!user) {
                return done(null , false,'Unknown User');
            }
            else if(user.password==password) {
                return done(null,user);
            }
            else {
                return done(null,false,'Invalid password');
            }
        });
    }
));

passport.serializeUser(function(user,done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    users.read({_id:id}, function(err, user) {
        done(err, user);
    });
});

module.exports= {
    passport:passport
};
