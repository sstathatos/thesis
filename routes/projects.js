var express= require('express');
var router= express.Router();
var DAOS= require('../models/model_entity').DAOS;
var mf= require('../models/model_respond');
var Permission= require('../models/model_permission').Permission;
var projects= DAOS[1];
var users= DAOS[0];
var projectpermissions= DAOS[2];

/* Project Requests */

//Get create project page
router.get('/', function(req,res) {
    res.status(200);
    res.render('createproject');
})

//Create Project
router.post('/', function(req,res) {
    req.body['date']= Date.now();
    projects.create(req.body, function(err, proj) { //FIRST WE INSERT OUR NEW PROJECT INTO PROJECTS
        if (err) mf.errorRespond(req,res,'/',"Error!");
        req.flash('success',"Project  created");
        console.log("project  created");
        projectpermissions.create(new Permission.add(req,'owner',proj._id), function(err) {
            if(err) mf.errorRespond(req,res,'/',"Error!");
            req.flash('success',"Project Owner Permission created");
            console.log("project owner permission created");
            mf.successRedirect(req,res,'/users/'+req.user.username);
        })
    });
});

//Add Project
router.post('/:_id', function(req,res) {
    console.log("i was called");
    console.log(req.params);
    projectpermissions.create(new Permission.add(req,'member',req.params._id), function(err,result) {
        if(err) {
            mf.errorRespond(req,res,'/',"Error!");
        }
        else if(result) {
            console.log("project member permission created");
            mf.successRedirect(req,res,'/users/'+req.user.username,"Project Member Permission created");
        }
        else {
            console.log("BAD REQUEST!");
            res.status(400);
            res.redirect('/');
        }
    })
});

//Search projects
router.get('/search', function(req,res) {
    projects.objects(req.query, function(err,proj) { //find all searches
        if(err) mf.errorRespond(req,res,'/',"Error!");
        projectpermissions.objects({user_id:req.user._id}, function (err,perms) {
            if(err) mf.errorRespond(req,res,'/',"Error!");
            res.status(200);
            res.render('searchproject',{proj :proj,perms:perms});
        });
    });
});

//Delete project UNDER CONSTRUCTION
router.delete('/', function(req,res) {
    projects.delete({ _id: req.user._id}, function(err, result) {
        console.log(result);
        if(err) {
            mf.errorRespond(req,res,'/',"Error!");
        }
        else if(result) {
            req.flash('success',"Project Deleted");
            res.status(200);
            res.redirect('/users/'+req.user.username+'/projects');
        }
        else {
            console.log("BAD REQUEST!");
            res.status(400);
            res.redirect('/');
        }
    });
})


module.exports = router;
