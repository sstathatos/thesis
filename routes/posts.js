var express = require('express');
var router = express.Router();
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

router.get('/:_id', (req, res) => {
    let my_view = new DetailView(req, res, null, 'error');
    my_view.layout = false;
    my_view.as_view();
});


module.exports = router;