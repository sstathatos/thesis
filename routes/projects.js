var express= require('express');
var router= express.Router();
var model_entity= require('../models/model_entity');
var Project= model_entity.ProjectAPI.model;


/* Project Requests */

//Get create project page
router.get('/', function(req,res) {
    res.status(200);
    res.render('createproject');
})

//Create Project
router.post('/', function(req,res) {
    req.body['date']= Date.now();
    model_entity.ProjectAPI.create(new Project(req.body), function(err, proj) {
        if (err){
            req.flash('error',err);
            res.status(400);
            res.redirect('/');
        }
        else if(proj) {
            model_entity.UserAPI.push({ _id: req.user._id},{ _id: proj._id},'projects', function(err,result) {
                if(err) {
                    req.flash('error',err);
                    console.log("ERROR!");
                    res.status(400);
                    res.redirect('/');
                }
                else if(result) {
                    req.flash('success',"Project Created");
                    res.status(200);
                    res.redirect('/users/'+req.user.username);
                }
                else {
                    console.log("BAD REQUEST!");
                    res.status(400);
                    res.redirect('/');
                }
            })
        }
        else  {
            console.log("Project could not be created");
            res.status(400);
            res.redirect('/');
        }
    });
});

//Search projects
router.get('/search', function(req,res) {
    console.log(req.query);
    model_entity.ProjectAPI.readALL(req.query, function(err,result) {
        res.status(200);
        res.render('searchproject',{result :result});
    });
})

//Delete project UNDER CONSTRUCTION
router.delete('/', function(req,res) {
    model_entity.ProjectAPI.delete({ _id: req.user._id}, function(err, result) {
        console.log(result);
        if(err) {
            req.flash('error',err);
            console.log("ERROR!");
            console.log(err);
            res.status(400);
            res.redirect('/');
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
