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

//get homepage
router.get('/home',model_auth_ses.ensureAuthenticated, function(req,res) {
    model_entity.UserAPI.read({ _id: req.user._id},function(err,result) {
        model_auth_ses.respond_conf(req,res,err,result,null,null,function() {
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
                })
                promises.push(pro);
            }
            Promise.all(promises).then(function() {
                console.log(names);
                res.status(200);
                res.render('home',{names:names});
            }, function(err) {

            });
        })
    })
})

//get edit profile
router.get('/editprofile', function(req,res) {
    res.status(200);
    res.render('editprofile');
})



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
        model_auth_ses.respond_conf(req,res,err,result,'/', "User Created, you can now login",null);
    });

});

//Update User
router.put('/users',function(req,res) {
    model_entity.UserAPI.update({ _id: req.user._id}, req.body, function(err, result) {
        model_auth_ses.respond_conf(req,res,err,result,'/home', "User Updated",null);
    })
});

//Search User UNDER CONSTRUCTION
router.get('/users/:_id', function(req,res) {
    model_entity.UserAPI.read(req.params, function(err, result) {
        model_auth_ses.respond_conf(req,res,err,result,null, "User Search",null);
    })
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

/* Project Requests */

//Get create project page
router.get('/projects', function(req,res) {
    res.status(200);
    res.render('createproject');
})

//Create Project
router.post('/projects', function(req,res) {
    req.body['date']= Date.now();
    model_entity.ProjectAPI.create(new Project(req.body), function(err, proj) {
        if (err){
            req.flash('error',err);
            res.status(400);
            res.redirect('/');
        }
        else if(proj) {
            model_entity.UserAPI.push({ _id: req.user._id},{ _id: proj._id},'projects', function(err,result) {
                model_auth_ses.respond_conf(req,res,err,result,'/home', "Project Created",null);
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
router.get('/projects/search', function(req,res) {
    console.log(req.query);
    model_entity.ProjectAPI.readALL(req.query, function(err,result) {
        res.status(200);
        res.render('searchproject',{result :result});
    })
})

//Delete project UNDER CONSTRUCTION
router.delete('/projects', function(req,res) {
    model_entity.ProjectAPI.delete({ _id: req.user._id}, function(err, result) {
        console.log(result);
        model_auth_ses.respond_conf(req,res,err,result,'/home', "Project Deleted",null);
    });
})


module.exports = router;
