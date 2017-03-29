let CreateView = require('./../generic_views').CreateView;
let DeleteView = require('./../generic_views').DeleteView;

var Entities = require('./../models/model_entity').Entities;
var users = Entities[0];

class UserCreateView extends CreateView {
    constructor(req, res) {
        super(req, res);
        this.model = users;
        this.success_url = '/register';
        this.template_name = "welcome";
        this.msg = "User created, you can now login";
        this.data = req.body;
    }
}

class UserUpdateView extends CreateView {
    constructor(req, res) {
        super(req, res);
        this.model = users;
        this.layout = 'main';
        this.template_name = "editprofile";
        this.msg = "User updated successfully";
        this.query = {_id: req.user._id};
        this.success_url = '/users/' + req.user.username;
    }

    //todo override validate
}

class UserDeleteView extends DeleteView {
    constructor(req, res) {
        super(req, res);
        this.model = users;
        this.query = {_id: this.req.user._id};
    }

    delete() {
        super.delete(req, res, () => {
            this.req.session.destroy(() => {
                this.res.clearCookie('connect.sid');
                this.res.redirect(this.success_url);
            });
        })
    }
}

module.exports = {
    UserCreateView: UserCreateView,
    UserUpdateView: UserUpdateView,
    UserDeleteView: UserDeleteView
};