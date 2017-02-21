var express= require('express');
var router= express.Router();
var model_entity= require('./models/model_entity');
var User= model_entity.UserAPI.model;
var Project= model_entity.ProjectAPI.model;
var model_auth_ses= require('./models/model_authentication_session');


/*  Routes we use currently */

//get welcome page
router.get('/',function(req,res) {
    if(req.isAuthenticated()) {
        res.status(200);
        res.redirect('/home');
    }
    else {
        console.log("about to be deleted");
        req.session.destroy( function(err) {
            res.status(200);
            res.clearCookie('connect.sid');
            res.render('welcome', {layout: false});
        });
    }
})

//Get Homepage
router.get('/home',model_auth_ses.ensureAuthenticated,function(req,res) {
    console.log("hello");
    console.log(req.user);
    res.status(200);
    res.render('home', {data: 'This is my Home. :)'});
});


/* User Requests */

//Login/Authenticate User
router.post('/login',model_auth_ses.passport.authenticate('local',{successRedirect:'/home',failureRedirect:'/',failureFlash:true}));

//Logout User
router.get('/logout',model_auth_ses.ensureAuthenticated,function (req,res) {
    console.log("Logout Request. ");
    //req.logOut();
    req.session.destroy( function(err) {
        res.status(200);
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

//Register User
router.post('/users', function(req,res) {
    delete req.body.password2;
    model_entity.UserAPI.create(new User(req.body),function(err,result) {
        if (err){
            req.flash('error',err);
            res.status(400);
            res.redirect('/');
        }
        else if(result) {
            req.flash('success','User created. You can now login.');
            res.status(200);
            res.redirect('/');
        }
        else  {
            console.log("User could not be created");
            res.status(400);
            res.redirect('/');
        }
    });

});

//Update User
router.put('/users',function(req,res) {
    model_entity.UserAPI.update({ _id: req.user._id}, req.body, function(err, result) {
        if (err){
            console.log(err);
            res.status(400);
        }
        else if(result) {
            console.log("user updated");
            req.flash('success','User updated successfully.');
            res.status(200);
            res.redirect('/home');
        }
        else  {
            console.log("User not found");
            res.status(404);
        }
    })
});

//Search User
router.get('/users/:_id', function(req,res) {
    model_entity.UserAPI.read(req.params, function(err, result) {
        if (err){
            console.log(err);
            res.status(400);
        }
        else if(result) {
            console.log("User found");
            res.status(200);
        }
        else  {
            console.log("User not found");
            res.status(404);
        }
    })
    res.end();
})

//Delete User
router.delete('/users', function(req,res) {
    model_entity.UserAPI.delete({ _id: req.user._id}, function(err, result) {
        if (err){
            console.log(err);
            res.status(400);
        }
        else if(result) {
            console.log("User deleted");
            req.session.destroy( function(err) {
                res.status(200);
                res.clearCookie('connect.sid');
                res.redirect('/');
            });
        }
        else  {
            console.log("User not found");
            res.status(404);
        }
    });
});

router.post('/projects', function(req,res) {
    req.body['date']= Date.now();
    model_entity.ProjectAPI.create(new Project(req.body), function(err, result) {
        if (err){
            req.flash('error',err);
            res.status(400);
            res.redirect('/');
        }
        else if(result) {
            req.flash('success','Project created.');
            res.status(200);
            res.redirect('/');
        }
        else  {
            console.log("Project could not be created");
            res.status(400);
            res.redirect('/');
        }
    });
});

module.exports = router;
