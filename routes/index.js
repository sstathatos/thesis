var express= require('express');
var router= require('express').Router();
var model_auth_ses= require('../models/model_authentication_session');


// log each request to the console for debug
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

//first of all check if the user requesting is authenticated,or else redirect to '/'
router.all('*', function(req,res,next) {
    if((req.url=='/login' && req.method=='POST') || (req.url=='/' && req.method=='GET') || (req.url=='/users' && req.method=='POST')) next();
    else {
        if(req.isAuthenticated()) next();
        else  {
            req.flash('error','You are not authorised. Login to continue');
            res.status(302);
            res.redirect('/');
        }
    }
});

router.use('/users',require('./users'));
router.use('/users/:username/projects',require('./projects'));

/*  Routes we use currently */

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
                else return res.redirect('/users/' + user.username);
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

//get welcome PAGE
router.get('/',function(req,res) {
    req.session.destroy( function() {
        res.status(200);
        res.clearCookie('connect.sid');
        res.render('welcome', {layout: false});
    });
});

module.exports = router;