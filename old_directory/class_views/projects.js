let ListView = require('./generic/base').ListView;
let CreateView = require('./generic/base').CreateView;
let DeleteView = require('./generic/base').DeleteView;
const Entities = require('../models/entity').Entities;
//const Permission = require('../models/acl').Permission;
//const projectpermissions = Entities[2];
const projects = Entities[1];
const users = Entities[0];
let acl = require('../old_directory/models/acl').Acl;

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
            //this.model.dao.create(this.data, (err, item) => { //create project
            //         if (err) this.crud_error(err);
            //         this.data = new Permission.add(this.req.user, 'owner', item._id);
            //         model.dao.create(this.data, (err, perm) => { //create owner permission
            //             if (err) this.crud_error(err);
            //             this.req.flash('success', msg);
            //             return cb(err, item, perm);
            //         });
            //     });
            this.model.dao.create(this.data, (err, item) => {
                if (err) this.crud_error(err);
                acl.addUserRole(this.model, 'owner', item._id, [this.req.user], (err, res) => {
                    if (err) this.crud_error(err);
                    this.req.flash('success', "Project Owner Permission created");
                    if (this.req.body.member) {
                        users.dao.all().find({'username': {$in: this.req.body.member}}, (err, members) => {
                            if (err) this.crud_error(err);
                            //users exist, ready to insert them to project as members
                            acl.addUserRole(this.model, 'member', item._id, members, (err, res) => {
                                this.req.flash('success', "Project members Added");
                                return super.done();
                            });
                            // let my_query = members.map(function (a) {
                            //     return (new Permission.add(a, 'member', proj._id))
                            // });
                            // projectpermissions.dao.insertMany(my_query, () => {
                            //
                            // })
                        });
                    }
                    else return super.done();
                })
            });

            //this.createAndPerm(projectpermissions, "Project Owner Permission created", (err, proj, perm) => {

        }
    }
}

class ProjectMemberCreateView extends CreateView {
    constructor(req, res) {
        super(req, res);
        // this.model = projectpermissions;
        // this.msg = "project member permission created";
    }

    post() {
        // this.success_url = '/users/' + this.req.user.username;
        // this.data = new Permission.add(this.req.user, 'member', this.req.params._id);
        // super.post();
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
            projects: items.map(function (a) {
                return {
                    _id: a._id,
                    name: a.name,
                    date: a.date,
                    description: a.description,
                    upd_users: a.acl.update.allow,
                    del_users: a.acl.delete.allow
                };
            }), current_user: this.req.params.username
        };
        console.log(new_items);
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
                return {user: a.acl.read.allow, perm: a.delete};
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
        //this.model = projectpermissions;
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
        // projectpermissions.dao.all().find({obj_id: this.req.params._id}, (err, result) => { //get all project permissions for all users
        //     if (err) this.crud_error(err);
        //     else {
        //         this.query = {
        //             'obj_id': {
        //                 $in: result.map(function (a) {
        //                     return a.obj_id;
        //                 })
        //             }
        //         };
        //         this.model = projectpermissions;
        //         super.delete(() => { //delete all project permissions
        //             this.query = {_id: this.req.params._id};
        //             this.model = projects;
        //             super.delete(() => { //delete the project
        //                 this.msg = "Your project and all permissions were deleted";
        //                 this.done();
        //             })
        //         });
        //     }
        // });

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