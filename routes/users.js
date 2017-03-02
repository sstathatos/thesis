var express= require('express');
var router= express.Router();
var model_entity= require('../models/model_entity');
var User= model_entity.UserAPI.model;


/* User Requests */

//get UserPAGE
router.get('/:username', function(req,res) {
    model_entity.UserAPI.read({ _id: req.user._id},function(err,result) {
        if(err) {
            req.flash('error',err);
            console.log("ERROR!");
            console.log(err);
            res.status(400);
            res.redirect('/');
        }
        else if(result) {
            var names=[];
            var promises=[];
            for (var i=0; i<result.projects.length;i++) {
                var pro= new Promise(function(resolve,reject) {
                    model_entity.ProjectAPI.read({_id: result.projects[i]}, function(err,result) {
                        if (err) return reject(err);
                        else {
                            names.push(result.name);
                            resolve();
                        }
                    })
                });
                promises.push(pro);
            }
            Promise.all(promises).then(function() {
                console.log(names);
                res.status(200);
                res.render('home',{names:names});
            }, function(err) {
            });

        }
        else {
            console.log("BAD REQUEST!");
            res.status(400);
            res.redirect('/');
        }
    })
});

//Register User
router.post('/', function(req,res) {
    delete req.body.password2;
    model_entity.UserAPI.create(new User(req.body),function(err,result) {
        if(err) {
            req.flash('error',err);
            console.log("ERROR!");
            console.log(err);
            res.status(400);
            res.redirect('/');
        }
        else if(result) {
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

//get edit profile PAGE
router.get('/:username/edit', function(req,res) {
    res.status(200);
    res.render('editprofile');
});

//Update User
router.put('/',function(req,res) {
    model_entity.UserAPI.update({ _id: req.user._id}, req.body, function(err, result) {
        if(err) {
            req.flash('error',err);
            console.log("ERROR!");
            console.log(err);
            res.status(400);
            res.redirect('/');
        }
        else if(result) {
            req.flash('success',"User Updated");
            res.status(200);
            res.redirect('/users/'+req.user.username);
        }
        else {
            console.log("BAD REQUEST!");
            res.status(400);
            res.redirect('/');
        }
    })
});

//Search User UNDER CONSTRUCTION
router.get('/:_id', function(req,res) {
    model_entity.UserAPI.read(req.params, function(err, result) {
        if(err) {
            req.flash('error',err);
            console.log("ERROR!");
            console.log(err);
            res.status(400);
            res.redirect('/');
        }
        else if(result) {
            req.flash('success',"User found");
            res.status(200);
            res.redirect('/users/'+req.user.username);
        }
        else {
            console.log("BAD REQUEST!");
            res.status(400);
            res.redirect('/');
        }
    })
});

//Delete User
router.delete('/', function(req,res) {
    model_entity.UserAPI.delete({ _id: req.user._id}, function(err, result) {
        if (err){
            console.log(err);
            res.status(400);
        }
        else if(result) {
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

module.exports = router;