var express= require('express');
var router= express.Router();
var DAOS= require('../models/model_entity').DAOS;
var projects= DAOS[1];
var users= DAOS[0];
var projectspermissions= DAOS[2];

/* User Requests */

//get UserPAGE
router.get('/:username', function(req,res) {
    //GET MY PROJECTS FROM PERMISSION MODEL
    projectspermissions.objects({ user_id: req.user._id},function(err,userprojects) {
        if(err) {
            req.flash('error',err);
            console.log("ERROR!");
            console.log(err);
            res.status(400);
            res.redirect('/');
        }
        else if(userprojects) {
            let names=[];
            let promises=[];
            for (let i=0; i<userprojects.length;i++) {
                let pro= new Promise(function(resolve,reject) {
                    projects.read({_id: userprojects[i].obj_id}, function(err,result) {
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
                console.log("Here are current User projects");
                console.log(names);
                res.status(200);
                res.render('home',{names:names});
            }, function(err) {
            });

        }
        else {
            console.log("empty response");
            res.status(200);
            res.render('home');
        }
    })
});



//get edit profile PAGE
router.get('/:username/edit', function(req,res) {
    res.status(200);
    res.render('editprofile');
});

//Update User
router.put('/',function(req,res) {
    users.update({ _id: req.user._id}, req.body, function(err, result) {
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
    users.read(req.params, function(err, result) {
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
    users.delete({ _id: req.user._id}, function(err, result) {
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