var express= require('express');
var router= require('express').Router();
var mf= require('../models/model_respond');
// log each request to the console for debug
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

//first of all check if the user requesting is authenticated,or else redirect to '/'
router.all('*', function(req,res,next) {
    if((req.url=='/login' && req.method=='POST') || (req.url=='/' && req.method=='GET') || (req.url=='/register' && req.method=='POST')) next();
    else {
        if(req.isAuthenticated()) next();
        else  {
            mf.errorRespond(req,res,'/','You are not authorised. Login to continue');
        }
    }
});

router.use('/',require('./authentication.js'));
router.use('/users',require('./users'));
router.use('/users/:username/projects',require('./projects'));

//get welcome PAGE
router.get('/',function(req,res) {
    //if(req.isAuthenticated) res.redirect('/users/:username');
    // else
        req.session.destroy( function() {
        res.status(200);
        res.clearCookie('connect.sid');
        res.render('welcome', {layout: false});
    });
 });

module.exports = router;