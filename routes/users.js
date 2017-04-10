const express = require('express');
const router = express.Router();
const Entities = require('../models/entity').Entities;
let projects = Entities[1];
const users = Entities[0];
const projectpermissions = Entities[2];


let DetailView = require('../class_views/generic/base').DetailView;
let RedirectView = require('../class_views/generic/base').RedirectView;
let ProjectListView = require('../class_views/projects').ProjectListView;
let UserDeleteView = require('../class_views/users').UserDeleteView;
let UserUpdateView = require('../class_views/users').UserUpdateView;

//todo searchbar projects and users/ add *

//get UserPAGE
router.get('/:username', (req, res) => {

    let my_view = new ProjectListView(req, res);
    users.dao.all().findOne({username: req.params.username}, (err, user) => {
        if (err || !user) my_view.crud_error(err);
        else {
            my_view.extra_data = req.params.username;
            my_view.queryset = projectpermissions.dao.all().find({'user_id': user._id}).populate('obj_id');
            my_view.as_view();
        }
    });
});

router.all('/:username/edit', (req, res) => {
    new UserUpdateView(req, res).as_view();
});

router.delete('/:username/delete', (req, res) => {
    let my_view = new UserDeleteView(req, res);
    my_view.as_view();
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