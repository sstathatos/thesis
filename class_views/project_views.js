let ListView = require('./../generic_views').ListView;
let CreateView = require('./../generic_views').CreateView;
var Entities = require('./../models/model_entity').Entities;
var Permission = require('../models/model_permission').Permission;
var projectpermissions = Entities[2];
var projects = Entities[1];
var users = Entities[0];


class ProjectCreateView extends CreateView {
    constructor() {
        super();
        this.model = projects;
        this.template_name = "createproject";
        this.msg = "Project created";
    }

    get(req, res) {
        this.success_url = "/" + req.user._id;
        this.layout = 'main';
        super.get(req, res);
    }

    post(req, res) {
        req.body['date'] = Date.now();
        projects.dao.create(req.body, (err, proj) => { //FIRST WE INSERT OUR NEW PROJECT INTO PROJECTS
            if (err) {
                req.flash('error', err);
                res.redirect('/error');
            }
            projectpermissions.dao.create(new Permission.add(req.user, 'owner', proj._id), function (err) {
                if (err) {
                    req.flash('error', err);
                    res.redirect('/error');
                }
                req.flash('success', "Project Owner Permission created");
            });
            if (req.body.member) // if  project members were added
            {
                users.dao.all().find({'username': {$in: req.body.member}}, function (err, members) {  //must check if they exist in users (if duplicate it sends the name once)
                    if (err) {
                        req.flash('error', err);
                        res.redirect('/error');
                    }
                    //users exist, ready to insert them to project as members
                    projectpermissions.dao.insertMany(members.map(function (a) {
                        return (new Permission.add(a, 'member', proj._id))
                    }), function (err, result) {
                        req.flash('success', "Project Members Added");
                        res.redirect('/' + req.user.username);
                    })
                });
            }
            else res.redirect('/' + req.user.username);
        });
    }
}


class ProjectListView extends ListView {
    constructor() {
        super();
        this.queryset = {};
        this.template_name = 'home';
        this.model = projects;
    }

    get_context_data(items) {
        let new_items = items.map(function (a) {
            return a.obj_id
        });
        return super.get_context_data(new_items);
    };


    //todo fix this queryset
    // get_queryset(req) {
    //     projectspermissions.dao.by_username("filip",(err,permissions)=> {
    //         projects.dao.all({permissions}, (err,result) =>{
    //             console.log(result);
    //             cb(err,result);
    //         })
    //     });
    // };

    //projectspermissions.dao.user(req.params.username).filter(IS OWNER or IS MEMBER);


    //return projectspermissions.dao.all().find({user_id:req.user._id})
    //    .populate('user_id obj_id');
    // users.dao.read({username:req.params.username}, (err,user) => {
    //      if (err) cb(err,null);
    //     projectspermissions.dao.all({user_id: user._id}, (err, permissions) =>{
    //         if (err) cb(err,null);
    //         projects.dao.all({'_id': {$in: permissions.map(function (a) {return a.obj_id})}}, (err, items) =>{
    //             if (err) cb(err,null);
    //             cb(null,this.queryset=items);
    //         });
    //     });
    // });
}
module.exports = {
    ProjectListView: ProjectListView,
    ProjectCreateView: ProjectCreateView
};