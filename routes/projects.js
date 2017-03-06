var express= require('express');
var router= express.Router();
var DAOS= require('../models/model_entity').DAOS;
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
        if (err){
            req.flash('error',err);
            res.status(400);
            res.redirect('/');
        }
        else if(proj) { // ONCE DONE, WE INSERT A NEW PROJECTPERMISSION FOR THE OWNER
            req.flash('success',"Project  created");
            console.log("project  created");
            let permission={
                user_id:req.user._id,
                obj_id: proj._id,
                view:true,
                edit:true,
                del:true,
                create:true
            };
            projectpermissions.create(permission, function(err,result) {
                if(err) {
                    req.flash('error',err);
                    console.log("ERROR!");
                    res.status(400);
                    res.redirect('/');
                }
                else if(result) {
                    req.flash('success',"Project Permission created");
                    console.log("project permission created");
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

//Add Project
router.post('/add', function(req,res) {
    console.log("i was called");
    console.log(req.body);
})

//Search projects
router.get('/search', function(req,res) {
    console.log(req.query);
    projects.objects(req.query, function(err,searches) { //find all searches
        if(err) {
            req.flash('error',err);
            console.log("ERROR!");
            res.status(400);
            res.redirect('/');
        }
        else if(searches) {
            console.log(req.user);
            var userprojects=req.user.projects;
            for (var i=0; i<searches.length;i++) {
                searches[i]['bool']=false;
                for(var j=0; j<userprojects.length; j++)
                    if(searches[i]._id.equals(userprojects[j])) {
                        searches[i]['bool']=true;
                    }
                // if (userprojects.includes(searches[i]._id)) {
            }
        }
        res.status(200);
        res.render('searchproject',{searches :searches});
    });
})

//Delete project UNDER CONSTRUCTION
router.delete('/', function(req,res) {
    projects.delete({ _id: req.user._id}, function(err, result) {
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
