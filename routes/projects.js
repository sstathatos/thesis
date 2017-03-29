var express= require('express');
var router= express.Router();
var Entities = require('../models/model_entity').Entities;
let ProjectCreateView = require('../class_views/project_views').ProjectCreateView;
let ProjectSearchListView = require('../class_views/project_views').ProjectSearchListView;
let ProjectMembersListView = require('../class_views/project_views').ProjectMembersListView;
let ProjectMemberCreateView = require('../class_views/project_views').ProjectMemberCreateView;
let ProjectDeleteView = require('../class_views/project_views').ProjectDeleteView;
let ProjectLeaveView = require('../class_views/project_views').ProjectLeaveView;
var Permission = require('../models/model_permission').Permission;
var projects = Entities[1];
var users = Entities[0];
var projectpermissions = Entities[2];
let DetailView = require('../generic_views').DetailView;


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
    let my_view = new ProjectLeaveView(req, res);
    my_view.as_view();
});

router.get('/:_id/edit', (req, res) => {
    let my_view = new ProjectMembersListView(req, res);
    my_view.queryset = projectpermissions.dao.all().find({obj_id: req.params._id}).populate('user_id obj_id');
    my_view.as_view();
});


module.exports = router;
