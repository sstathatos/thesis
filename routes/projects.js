var express= require('express');
var router= express.Router();
var Entities = require('../models/model_entity').Entities;
let ProjectCreateView = require('../class_views/project_views').ProjectCreateView;
var projects = Entities[1];
var users = Entities[0];
var projectpermissions = Entities[2];

let View = require('../generic_views').View;
let DetailView = require('../generic_views').DetailView;
let CreateView = require('../generic_views').CreateView;
let RedirectView = require('../generic_views').RedirectView;


//Get create project page
router.all('/create', (req, res) => {
    console.log('something');
    let my_view = new ProjectCreateView(null, "createproject");
    my_view.as_view(req, res);
});


// //Create Project
// router.post('/create', function(req,res) {
//     console.log(req.body);
//     req.body['date']= Date.now();
//     projects.dao.create(req.body, function(err, proj) { //FIRST WE INSERT OUR NEW PROJECT INTO PROJECTS
//         // if (err) mf.errorRespond(req,res,'/',"Error!");
//         // req.flash('success', "Project created");
//         projectpermissions.dao.create(new Permission.add(req.user, 'owner', proj._id), function (err) {
//             // if(err) mf.errorRespond(req,res,'/',"Error!");
//             // req.flash('success',"Project Owner Permission created");
//         });
//         if (req.body.member) // if  project members were added
//         {
//             //must check if they exist in users (if duplicate it sends the name once)
//             users.dao.find({'username': {$in: req.body.member}}, function (err, members) {
//                 // if (err) mf.errorRespond(req, res, '/', "Something went wrong with the new members");
//                 // //users exist, ready to insert them to project as members
//                 projectpermissions.dao.insertMany(members.map(function (a) {
//                     return (new Permission.add(a, 'member', proj._id))
//                 }), function (err, result) {
//                     // console.log(result);
//                     // req.flash('success', "Project Members Added");
//                     // mf.successRedirect(req, res, '/users/' + req.user.username);
//                     res.redirect('/'+req.user.username);
//                 })
//             });
//         }
//         res.redirect('/'+req.user.username);
//         // else mf.successRedirect(req, res, '/users/' + req.user.username);
//     });
// });
//
// //Add User in a Project as Member
// router.post('/:_id', function(req,res) {
//     console.log(req.params._id);
//     projectpermissions.create(new Permission.add(req.user, 'member', req.params._id), function (err, result) {
//         if (err) mf.errorRespond(req, res, '/', "Error!");
//         console.log("project member permission created");
//         mf.successRedirect(req, res, '/users/' + req.user.username, "Project Member Permission created");
//     })
// });
// //
// //Search projects
// router.get('/search', function(req,res) {
//     projects.all(req.query, function(err,proj) { //find all searches
//         if(err) new RedirectView('/error',null).as_view(req,res);
//         projectpermissions.all({user_id:req.user._id}, function (err,perms) {
//             if(err) new RedirectView('/error',null).as_view(req,res);
//             new DetailView({proj :proj,perms:perms}, 'searchproject').as_view(req,res);
//         });
//     });
// });
//
// //Delete project
// router.delete('/:_id', function (req, res) {
//     //check my permissions for this project
//     projectpermissions.all({user_id: req.user._id, obj_id: req.params._id}, function (err, result) {
//         if (err) mf.errorRespond(req, res, '/', "Error!");
//         else if (result[0].del == false) {// if not project owner
//             projectpermissions.delete({user_id: req.user._id, obj_id: req.params._id}, function (err, result) { //delete project permission
//                 if (err) mf.errorRespond(req, res, '/', "Error!");
//                 else {
//                     console.log("project member deleted");
//                     mf.successRedirect(req, res, '/users/' + req.user.username, "Project Member deleted");
//                 }
//             });
//         }
//         else { //project owner
//             projectpermissions.all({obj_id: req.params._id}, function (err, result) { //get all project permissions for all users
//                 if (err) mf.errorRespond(req, res, '/', "Error!");
//                 else projectpermissions.delete({
//                     'obj_id': {
//                         $in: result.map(function (a) {
//                             return a.obj_id
//                         })
//                     }
//                 }, function (err) {  //
//                     console.log("All project permissions were deleted");
//                     projects.delete({_id: req.params._id}, function (err) {
//                         if (err) mf.errorRespond(req, res, '/', "Error!");
//                         else {
//                             console.log("Your project was deleted");
//                             mf.successRedirect(req, res, '/users/' + req.user.username, "Your project and all project permissions were deleted");
//
//                         }
//                     })
//                 });
//             });
//         }
//     });
// });


module.exports = router;
