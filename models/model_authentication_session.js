var passport= require('passport');
var LocalStrategy= require('passport-local').Strategy;
var model_entity= require('../models/model_entity');



//authentication strategy-passport
passport.use(new LocalStrategy (
    function(username, password, done) {
        model_entity.UserAPI.read({username:username}, function (err,user){
            if(err) throw err;
            if(!user) {
                return done(null , false,{message:'Unknown User'});
            }
            else if(user.password==password) {
                return done(null,user);
            }
            else {
                return done(null,false,{message:'Invalid password'});
            }
        });
    }
));

passport.serializeUser(function(user,done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    model_entity.UserAPI.read({_id:id}, function(err, user) {
        done(err, user);
    });
});

function ensureAuthenticated(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error','You are not authorised. Login to continue');
        res.render('welcome', {layout:false});
    }
}

module.exports= {
    passport:passport,
    ensureAuthenticated: ensureAuthenticated
};
