var passport= require('passport');
var LocalStrategy= require('passport-local').Strategy;
var model_entity= require('../models/model_entity');

passport.use(new LocalStrategy (
    function(username, password, done) {
        model_entity.UserAPI.read({username:username}, function (err,user){
            if(err) throw err;
            if(!user) {
                return done(null , false,{message:'Unknown User'});
            }
            if(user[0].password==password) {
                return done(null,user);
            }
            else {
                return done(null,false,{message:'Invalid password'});
            }
        });
    }
));

passport.serializeUser(function(user,done) {
    done(null, user[0].id);
});

passport.deserializeUser(function(id, done) {
    console.log("DESERIALIZE HAS BEEN CALLED");
    model_entity.UserAPI.read({_id:id}, function(err, user) {
        done(err, user);
    });
});

function ensureAuthenticated(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        console.log("YOU ARE NOT AUTHORISED TO DO THAT------------------------------");
        console.log(req.user);
        res.sendStatus(400);
    }
}

module.exports= {
    passport:passport,
    ensureAuthenticated: ensureAuthenticated
};
