let ListView = require('./generic/base').ListView;
let CreateView = require('./generic/base').CreateView;
let DeleteView = require('./generic/base').DeleteView;
const Entities = require('./../models/model_entity').Entities;
let Permission = require('../models/model_permission').Permission;
let projectpermissions = Entities[2];
const projects = Entities[1];
let users = Entities[0];
const datasets = Entities[3];

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