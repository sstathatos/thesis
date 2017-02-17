var express= require('express');
var router= express.Router();
var model_entity= require('./models/model_entity');
var User= model_entity.UserAPI.model;
var model_auth_ses= require('./models/model_authentication_session');



// class Service {
//
//     constructor (method, path, ensure ,callback) {
//         this.method= method;
//         this.path=path;
//         this.callback=callback;
//         this.ensure= ensure;
//
//
//     }
// }
//
// router.all('*', function(req,res) {
//
// })
//
//  new Service('GET','/login', false, function(req,res) {
//      if(req.isAuthenticated()) {
//          res.status(200);
//          res.redirect('/home');
//      }
//      else {
//          res.status(200);
//          res.render('welcome', {layout: false});
//      }
//  })



/*  Routes we use currently */

//get welcome page
router.get('/login',function(req,res) {
    if(req.isAuthenticated()) {
        res.status(200);
        res.redirect('/home');
    }
    else {
        res.status(200);
        res.render('welcome', {layout: false});
    }
})

//Get Homepage
router.get('/home',model_auth_ses.ensureAuthenticated,function(req,res) {
    res.status(200);
    res.render('home', {data: 'This is my Home. :)'});
});


/* User Requests */

//Login/Authenticate User
router.post('/home',model_auth_ses.passport.authenticate('local',{successRedirect:'/home',failureRedirect:'/login',failureFlash:true}));

//Register User
router.post('/users', function(req,res) {
    console.log(req.path);
    console.log(req.params);
    delete req.body.password2;
    model_entity.UserAPI.create(new User(req.body),function(err,result) {
        if (err) console.log(err);
        else console.log("user created");
    });
    res.status(200);
    res.render('welcome', {layout:false});
});

//Logout User
router.get('/logout',model_auth_ses.ensureAuthenticated,function (req,res) {
    console.log("Logout Request. ");
    //req.logOut();
    req.session.destroy( function(err) {
        console.log("session destroyed");
        res.status(200);
        res.clearCookie('connect.sid');
        console.log(res);
        res.redirect('/login');
    });
});

module.exports = router;
