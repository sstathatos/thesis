let ListView = require('./../generic_views').ListView;
let CreateView = require('./../generic_views').CreateView;
let DeleteView = require('./../generic_views').DeleteView;
var Entities = require('./../models/model_entity').Entities;
var Permission = require('../models/model_permission').Permission;
var projectpermissions = Entities[2];
var projects = Entities[1];
var users = Entities[0];


class ProjectCreateView extends CreateView {
    constructor(req, res) {
        super(req, res);
        this.model = projects;
        this.template_name = "createproject";
        this.msg = "Project created";
    }

    get() {
        this.layout = 'main';
        return super.get();
    }

    post() {
        this.success_url = "/users/" + this.req.user.username;
        if (this.validate()) {
            this.req.body['date'] = Date.now();
            this.data = this.req.body;
            this.createAndPerm(projectpermissions, "Project Owner Permission created", (err, proj, perm) => {
                if (err) this.crud_error(err);
                if (this.req.body.member) {
                    users.dao.all().find({'username': {$in: this.req.body.member}}, (err, members) => {
                        if (err) this.crud_error(err);
                        //users exist, ready to insert them to project as members
                        let my_query = members.map(function (a) {
                            return (new Permission.add(a, 'member', proj._id))
                        });
                        projectpermissions.dao.insertMany(my_query, () => {
                            this.req.flash('success', "Project members Added");
                            return super.done();
                        })
                    });
                }
                else return super.done();
            });
        }
    }
}

class ProjectMemberCreateView extends CreateView {
    constructor(req, res) {
        super(req, res);
        this.model = projectpermissions;
        this.msg = "project member permission created";
    }

    post() {
        this.success_url = '/users/' + this.req.user.username;
        this.data = new Permission.add(this.req.user, 'member', this.req.params._id);
        super.post();
    }

    //todo validate
}

class ProjectListView extends ListView {
    constructor(req, res) {
        super(req, res);
        this.model = projects;
        this.queryset = {};
        this.template_name = 'home';
    }

    get_context_data(items) {
        let new_items = {
            items: items.map(function (a) {
                return {obj: a.obj_id, update: a.update, delete: a.delete};
            }), current_user: this.extra_data
        };
        return super.get_context_data(new_items);
    };
}

class ProjectMembersListView extends ListView {
    constructor(req, res) {
        super(req, res);
        this.model = projects;
        this.template_name = 'editproject';
    }

    get_context_data(items) {
        let new_items = {
            items: items.map(function (a) {
                return {user: a.user_id.username, perm: a.delete};
            }), proj_name: items[0].obj_id.name, proj_descr: items[0].obj_id.description
        };
        return super.get_context_data(new_items);
    };
}

class ProjectSearchListView extends ListView {
    constructor(req, res) {
        super(req, res);
        this.model = projects;
        this.queryset = {};
        this.template_name = 'searchproject';
    }

    get_context_data(perms) {
        let new_items = {proj: this.extra_data, perms: perms};
        return super.get_context_data(new_items);
    };
}

class ProjectLeaveView extends DeleteView {
    constructor(req, res) {
        super(req, res);
        this.success_url = '/users/' + this.req.user.username;
    }

    delete() {
        this.query = {user_id: this.req.user._id, obj_id: this.req.params._id};
        this.model = projectpermissions;
        super.delete(() => {
            this.msg = "You are not project's member anymore.";
            this.done();
        });
    }
}

class ProjectDeleteView extends DeleteView {
    constructor(req, res) {
        super(req, res);
    }

    delete() {
        this.success_url = '/users/' + this.req.user.username;
        projectpermissions.dao.all().find({obj_id: this.req.params._id}, (err, result) => { //get all project permissions for all users
            if (err) this.crud_error(err);
            else {
                this.query = {
                    'obj_id': {
                        $in: result.map(function (a) {
                            return a.obj_id;
                        })
                    }
                };
                this.model = projectpermissions;
                super.delete(() => { //delete all project permissions
                    this.query = {_id: this.req.params._id};
                    this.model = projects;
                    super.delete(() => { //delete the project
                        this.msg = "Your project and all permissions were deleted";
                        this.done();
                    })
                });
            }
        });

    }
}

module.exports = {
    ProjectListView: ProjectListView,
    ProjectCreateView: ProjectCreateView,
    ProjectSearchListView: ProjectSearchListView,
    ProjectMemberCreateView: ProjectMemberCreateView,
    ProjectDeleteView: ProjectDeleteView,
    ProjectLeaveView: ProjectLeaveView,
    ProjectMembersListView: ProjectMembersListView
};