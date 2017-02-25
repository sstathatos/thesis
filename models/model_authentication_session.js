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

function respond_conf(req,res,err,result,redirect_path, flash_msg, callback) {
    if(err) {
        req.flash('error',err);
        console.log("ERROR!");
        console.log(err);
        res.status(400);
        res.redirect('/');
    }
    else if(result) {
        req.flash('success',flash_msg);
        console.log("SUCCESS!");
        if (callback) callback();
        else  {
            res.status(200);
            if(redirect_path) res.redirect(redirect_path);
            else res.end();
        }
    }
    else {
        console.log("BAD REQUEST!");
        res.status(400);
        res.redirect('/');
    }
}

module.exports= {
    passport:passport,
    ensureAuthenticated: ensureAuthenticated,
    respond_conf:respond_conf
};
