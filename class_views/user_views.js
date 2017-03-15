let CreateView = require('./../generic_views').CreateView;
let UpdateView = require('./../generic_views').UpdateView;
let DeleteView = require('./../generic_views').DeleteView;

var Entities = require('./../models/model_entity').Entities;
var users = Entities[0];

class UserCreateView extends CreateView {
    constructor() {
        super();
        this.success_url = '/register';
        this.model = users;
        this.template_name = "welcome";
        this.msg = "User created, you can now login";
    }
}

class UserUpdateView extends UpdateView {
    constructor() {
        super();
        this.model = users;
        this.template_name = "editprofile";
        this.msg = "User updated successfully";
    }

    put(req, res) {
        this.query = {_id: req.user._id};
        this.success_url = '/' + req.user.username;
        super.put(req, res);
    }
}

class UserDeleteView extends DeleteView {
    constructor() {
        super();
    }

    delete(req, res) { //must override this cause of session destroy
        this.model.dao.delete(this.query, (err) => {
            if (err) {
                req.flash('error', err);
                res.redirect('/error');
            }
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                res.redirect(this.success_url);
            });
        });
    };
}

module.exports = {
    UserCreateView: UserCreateView,
    UserUpdateView: UserUpdateView,
    UserDeleteView: UserDeleteView
};