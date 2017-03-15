var express= require('express');
var router= express.Router();
var Entities = require('../models/model_entity').Entities;
var projects = Entities[1];
var users = Entities[0];
var projectpermissions = Entities[2];


let DetailView = require('../generic_views').DetailView;
let RedirectView = require('../generic_views').RedirectView;
let ProjectListView = require('../class_views/project_views').ProjectListView;
let ListView = require('../generic_views').ListView;
let UserDeleteView = require('../class_views/user_views').UserDeleteView;
let UserUpdateView = require('../class_views/user_views').UserUpdateView;


//todo must move searchbar to navbar
//todo delete user,delete project, search project
//todo in userpage, show delete buttons etc only for user

//get UserPAGE
router.get('/:username', (req, res) => {
    let my_view = new ProjectListView();
    users.dao.all().findOne({username: req.params.username}, (err, user) => {
        my_view.queryset = projectpermissions.dao.all().find({'user_id': user._id}).populate('obj_id');
        my_view.as_view(req, res);
    });
});

router.all('/:username/edit', (req, res) => {
    new UserUpdateView().as_view(req, res);
});

router.delete('/:username/delete', (req, res) => {
    let my_view = new UserDeleteView();
    my_view.query = {_id: req.user._id};
    my_view.model = users;
    my_view.as_view(req, res);
});

// //Search User UNDER CONSTRUCTION
//     router.get('/:_id', function(req,res) {
//         users.read(req.params, function(err, result) {
//             if(err) {
//                 mf.errorRespond(req,res,'/',"Error!");
//             }
//             else if(result) {
//                 mf.successRedirect(req,res,'/users/'+req.user.username,"User found");
//             }
//             else {
//                 console.log("BAD REQUEST!");
//                 res.status(400);
//                 res.redirect('/');
//             }
//         })
//     });


module.exports = router;