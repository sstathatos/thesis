const express = require('express');
const router = express.Router();
const Entities = require('../models/entity').Entities;
let ProjectCreateView = require('../class_views/project').ProjectCreateView;
let ProjectSearchListView = require('../class_views/project').ProjectSearchListView;
let ProjectMembersListView = require('../class_views/project').ProjectMembersListView;
let ProjectMemberCreateView = require('../class_views/project').ProjectMemberCreateView;
let ProjectDeleteView = require('../class_views/project').ProjectDeleteView;
let ProjectLeaveView = require('../class_views/project').ProjectLeaveView;
let Permission = require('../models/permission').Permission;
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