var express= require('express');
var router= require('express').Router();
var model_auth_ses= require('../models/model_authentication_session');
var DAOS= require('../models/model_entity').DAOS;
var users= DAOS[0];

router.post('/login', function(req,res,next) {
    model_auth_ses.passport.authenticate('local', {failureFlash:true},function(err,user,info) {
        if (err) return next(err);
        else if (!user) {
            req.flash('error',info);
            return res.redirect('/');
        }
        else {
            req.logIn(user, function (err) {
                if (err) {
                    req.flash('error',info);
                    return next(err);
                }
                else res.redirect('/users/' + user.username);
            });
        }
    })(req,res,next);
});

//Logout User
router.get('/logout',function (req,res) {
    req.session.destroy( function() {
        res.status(200);
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

//Register User
router.post('/register', function(req,res) {
    delete req.body.password2;
    users.create(req.body,function(err,result) {
        if(err) {
            req.flash('error',err);
            console.log("ERROR!");
            console.log(err);
            res.status(400);
            res.redirect('/');
        }
        else if(result) {
            console.log("User created");
            req.flash('success',"User Created, you can now login");
            res.status(200);
            res.redirect('/');
        }
        else {
            console.log("BAD REQUEST!");
            res.status(400);
            res.redirect('/');
        }
    });
});

module.exports = router;