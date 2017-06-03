const express = require('express');
const router = express.Router();
const Entities = require('../models/entity').Entities;
let ProjectCreateView = require('../class_views/projects').ProjectCreateView;
let ProjectSearchListView = require('../class_views/projects').ProjectSearchListView;
let ProjectMembersListView = require('../class_views/projects').ProjectMembersListView;
let ProjectMemberCreateView = require('../class_views/projects').ProjectMemberCreateView;
let ProjectDeleteView = require('../class_views/projects').ProjectDeleteView;
let ProjectLeaveView = require('../class_views/projects').ProjectLeaveView;
const Permission = require('../old_directory/models/acl').Permission;
const projects = Entities[1];
let users = Entities[0];
const projectpermissions = Entities[2];
let DetailView = require('../class_views/generic/base').DetailView;
let RedirectView = require('../class_views/generic/base').RedirectView;
let acl = require('../old_directory/models/acl').Acl;

//Get create project page
router.all('/create', (req, res) => {
    let my_view = new ProjectCreateView(req, res);
    my_view.as_view();
});

router.get('/search', (req, res) => {
    let my_view = new ProjectSearchListView(req, res);
    projects.dao.all().find({name: new RegExp('^' + req.query.name + '$', "i")}, (err, proj) => {
        my_view.extra_data = proj;
        my_view.queryset = projectpermissions.dao.all().find({user_id: req.user._id});
        my_view.as_view();
    });
});

router.get('/:_id', (req, res) => {
    projects.dao.all().findOne(req.params, (err, proj) => {
        let my_view = new DetailView(req, res, proj, 'project');
        if (err) my_view.crud_error(err);
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
    Permission.check(projectpermissions, req, (err, bool) => {
        let my_view = new ProjectDeleteView(req, res);
        if (err) my_view.crud_error(err);
        else if (bool) {
            my_view.as_view();
        }
        else {
            my_view.crud_error(err);
        }
    })
});

router.delete('/:_id/leave', (req, res) => {
    acl.removeUserRole(projects, 'member', req.params._id, [req.user._id], (err, res) => {
        let my_view = new RedirectView(req, res, "/get_user_profile/" + req.user.username, "User member removed");
        my_view.as_view();
    })

});

router.get('/:_id/edit', (req, res) => {
    let my_view = new ProjectMembersListView(req, res);
    //my_view.queryset = projectpermissions.dao.all().find({obj_id: req.params._id}).populate('user_id obj_id');
    my_view.queryset = projects.dao.all().find({_id: req.params._id}).populate({
        path: 'acl.read.allow',
        model: 'users'
    });
    my_view.as_view();
});


module.exports = router;
