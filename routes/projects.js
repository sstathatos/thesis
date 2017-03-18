var express= require('express');
var router= express.Router();
var Entities = require('../models/model_entity').Entities;
let ProjectCreateView = require('../class_views/project_views').ProjectCreateView;
let ProjectSearchListView = require('../class_views/project_views').ProjectSearchListView;
let ProjectMemberCreateView = require('../class_views/project_views').ProjectMemberCreateView;
let ProjectDeleteView = require('../class_views/project_views').ProjectDeleteView;
var projects = Entities[1];
var users = Entities[0];
var projectpermissions = Entities[2];
let RedirectView = require('../generic_views').RedirectView;


//Get create project page
router.all('/create', (req, res) => {
    let my_view = new ProjectCreateView(req, res);
    my_view.as_view();
});

router.get('/search', (req, res) => {
    let my_view = new ProjectSearchListView(req, res);
    projects.dao.all().find(req.query, (err, proj) => {
        my_view.extra_data = proj;
        my_view.queryset = projectpermissions.dao.all().find({user_id: req.user._id});
        my_view.as_view();
    });
});

//Add User in a Project as Member
router.post('/:_id', function (req, res) {
    console.log(req.params._id);
    let my_view = new ProjectMemberCreateView(req, res);
    my_view.as_view();
});

router.delete('/:_id', function (req, res) {
    let my_view = new ProjectDeleteView(req, res);
    my_view.as_view();
})

// //Delete project
// router.delete('/:_id', function (req, res) {
//     //check my permissions for this project
//
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
//                 else projectpermissions.delete({'obj_id': {$in: result.map(function (a) {return a.obj_id})}}, function (err) {  //
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
