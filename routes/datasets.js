var express = require('express');
var router = express.Router();
var Entities = require('../models/model_entity').Entities;
var Converter = require('../data_converter');
let ProjectCreateView = require('../class_views/project_views').ProjectCreateView;
let DatasetCreateView = require('../class_views/dataset_views').DatasetCreateView;
let DatasetListView = require('../class_views/dataset_views').DatasetListView;
let ProjectSearchListView = require('../class_views/project_views').ProjectSearchListView;
let ProjectMembersListView = require('../class_views/project_views').ProjectMembersListView;
let ProjectMemberCreateView = require('../class_views/project_views').ProjectMemberCreateView;
let ProjectDeleteView = require('../class_views/project_views').ProjectDeleteView;
let ProjectLeaveView = require('../class_views/project_views').ProjectLeaveView;
var Permission = require('../models/model_permission').Permission;
var projects = Entities[1];
var users = Entities[0];
var projectpermissions = Entities[2];
var datasets = Entities[3];
let DetailView = require('../generic_views').DetailView;

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