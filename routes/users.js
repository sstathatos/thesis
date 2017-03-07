var express= require('express');
var router= express.Router();
var DAOS= require('../models/model_entity').DAOS;
var mf= require('../models/model_respond');
var projects= DAOS[1];
var users= DAOS[0];
var projectspermissions= DAOS[2];

/* User Requests */

//get UserPAGE
router.get('/:username', function(req,res) {
    projectspermissions.objects({user_id: req.user._id}, function (err, permissions) {
        if (err) mf.errorRespond(req, res, '/', "Error!");
        projects.objects({'_id': {$in: permissions.map(function (a) {return a.obj_id})} }, function (err, results) {
            if (err) return reject(err);
            res.status(200);
            res.render('home', {results: results});
        })
    });
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
                mf.errorRespond(req,res,'/',"Error!");
            }
            else if(result) {
                mf.successRedirect(req,res,'/users/'+req.user.username,"User Updated");
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
                mf.errorRespond(req,res,'/',"Error!");
            }
            else if(result) {
                mf.successRedirect(req,res,'/users/'+req.user.username,"User found");
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
                mf.errorRespond(req,res,'/',"Error!");
            }
            else if(result) {
                req.session.destroy( function() {
                    res.clearCookie('connect.sid');
                    mf.successRedirect(req,res,'/');
                });
            }
            else  {
                console.log("User not found");
                res.status(404);
            }
        });
    });

    module.exports = router;