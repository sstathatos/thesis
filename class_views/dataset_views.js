let ListView = require('./../generic_views').ListView;
let CreateView = require('./../generic_views').CreateView;
let DeleteView = require('./../generic_views').DeleteView;
var Entities = require('./../models/model_entity').Entities;
var Permission = require('../models/model_permission').Permission;
var projectpermissions = Entities[2];
var projects = Entities[1];
var users = Entities[0];
var datasets = Entities[3];

class DatasetCreateView extends CreateView {
    constructor(req, res) {
        super(req, res);
        this.model = datasets;
        this.success_url = "project";
        this.msg = "Dataset uploaded";
        this.validate = true;
    }

    done() {
        this.req.flash('success', this.msg);
        this.res.send(this.msg);
    }
}

class DatasetListView extends ListView {
    constructor(req, res) {
        super(req, res);
        this.model = projects;
        this.template_name = 'editproject';
    }

    get() {
        this.get_queryset().exec((err, objects) => {
            if (err) throw Error();
            this.res.send(objects);
        });
    }
}

module.exports = {
    DatasetCreateView: DatasetCreateView,
    DatasetListView: DatasetListView
};