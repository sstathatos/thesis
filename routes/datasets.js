const express = require('express');
const router = express.Router();
const Entities = require('../models/entity').Entities;
const Converter = require('../data_converter');
let ProjectCreateView = require('../class_views/projects').ProjectCreateView;
let DatasetCreateView = require('../class_views/datasets').DatasetCreateView;
let DatasetListView = require('../class_views/datasets').DatasetListView;
let ProjectSearchListView = require('../class_views/projects').ProjectSearchListView;
let ProjectMembersListView = require('../class_views/projects').ProjectMembersListView;
let ProjectMemberCreateView = require('../class_views/projects').ProjectMemberCreateView;
let ProjectDeleteView = require('../class_views/projects').ProjectDeleteView;
let ProjectLeaveView = require('../class_views/projects').ProjectLeaveView;
let Permission = require('../models/permission').Permission;
let projects = Entities[1];
let users = Entities[0];
let projectpermissions = Entities[2];
const datasets = Entities[3];
let DetailView = require('../class_views/generic/base').DetailView;

router.post('/:_id/datasets/create', (req, res) => {
    Converter.send_data(req, (err, converted_result) => {
        if (err) {
            throw Error(err);
        }
        else {
            console.log('got converted result');
            let my_view = new DatasetCreateView(req, res);
            my_view.data = {
                project_id: req.params._id,
                data: converted_result
            };
            my_view.as_view();
        }
    });
});

router.get('/:_id/datasets/', (req, res) => {
    let my_view = new DatasetListView(req, res);
    my_view.queryset = datasets.dao.all().find({project_id: req.params._id});
    my_view.as_view();


});

module.exports = router;