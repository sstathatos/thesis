const express = require('express');
const router = express.Router();
const Entities = require('../models/entity').Entities;
let ProjectCreateView = require('../class_views/projects').ProjectCreateView;
let ProjectSearchListView = require('../class_views/projects').ProjectSearchListView;
let ProjectMembersListView = require('../class_views/projects').ProjectMembersListView;
let ProjectMemberCreateView = require('../class_views/projects').ProjectMemberCreateView;
let ProjectDeleteView = require('../class_views/projects').ProjectDeleteView;
let ProjectLeaveView = require('../class_views/projects').ProjectLeaveView;
let Permission = require('../old_directory/models/acl').Permission;
let projects = Entities[1];
let users = Entities[0];
let projectpermissions = Entities[2];
let DetailView = require('../class_views/generic/base').DetailView;

router.get('/:_id', (req, res) => {
    let my_view = new DetailView(req, res, null, 'error');
    my_view.layout = false;
    my_view.as_view();
});


module.exports = router;