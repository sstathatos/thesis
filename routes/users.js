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
        console.log(user.id);
        if (err || !user) my_view.crud_error(err);
        else {
            //my_view.extra_data = req.params.username;
            //my_view.queryset = projectpermission.dao.all().find({'user_id': user._id}).populate('obj_id');
            my_view.queryset = projects.dao.all().find({'acl.read.allow': user._id}).populate([{
                path: 'acl.update.allow',
                model: 'users'
            }, {
                path: 'acl.delete.allow',
                model: 'users'
            }]);
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

module.exports = router;