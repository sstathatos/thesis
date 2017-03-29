var Permission = require('./models/model_permission').Permission;
class View {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.http_method_names = ['GET', 'POST', 'PUT', 'DELETE'];
    }

    as_view() {
        return this.dispatch();
    };

    dispatch() {
        for (let num in this.http_method_names) {
            if (this.req.method == this.http_method_names[num]) {
                this.handler = this[this.req.method.toLowerCase()];
                return this.handler(this.req, this.res);
            }
        }
        this.http_method_not_allowed();
    };

    http_method_not_allowed() {
        this.res.status(400);
        throw TypeError("Not an http method.");
    };

    get() {
        this.res.render(this.template_name, this.get_context_data(this.objects));
    };

    get_context_data(items) {
        return {
            items: items,
            layout: this.layout
        }
    }

    crud_error(err) {
        this.req.flash('error', err);
        this.res.redirect('/error');
    }

    done() {
        this.req.flash('success', this.msg);
        this.res.redirect(this.success_url);
    }
}

class DetailView extends View {
    constructor(req, res, object, template_name) {
        super(req, res);
        this.objects = object;
        this.template_name = template_name;
        this.layout = 'main';
    }
}
DetailView.http_method_names = ['GET'];

class ValidateView extends View {
    constructor(req, res) {
        super(req, res);
    }

    validate() {
        return true;
        //        if  (all_fields_required && pass_match) cb()
        // else {
        //     this.req.flash('error',"Wrong data inserted.");
        //     this.res.redirect(this.failure_url);
        // }
    }

    invalid_form() {
        this.req.flash('error', err);
        this.res.redirect(this.failure_url);
    }
}

class CreateView extends ValidateView {

    constructor(req, res) {
        super(req, res);
        this.success_url = '/';
        this.template_name = 'welcome';
        this.msg = null;
        this.failure_url = '/register';
        this.data = null;
    }

    post() {
        if (super.validate()) {
            this.model.dao.create(this.data, (err) => {
                if (err) throw Error(err);
                console.log('data saved');
                if (err) this.crud_error(err);
                else this.done();
            });
        }
        else super.invalid_form();
    };

    createAndPerm(model, msg, cb) { //class method which is used to create something and owner perms for that
        this.model.dao.create(this.data, (err, item) => { //create project
            if (err) this.crud_error(err);
            this.data = new Permission.add(this.req.user, 'owner', item._id);
            model.dao.create(this.data, (err, perm) => { //create owner permission
                if (err) this.crud_error(err);
                this.req.flash('success', msg);
                return cb(err, item, perm);
            });
        });
    }

    put() {
        if (super.validate()) {
            this.model.dao.update(this.query, this.req.body, (err) => {
                if (err) this.crud_error(err);
                else super.done();
            });
        }
        else super.invalid_form();
    };
}
CreateView.http_method_names = ['GET', 'POST', 'PUT'];


class RedirectView extends View {
    constructor(req, res, redirect_url, msg) {
        super(req, res);
        this.redirect_url = redirect_url;
        this.msg = msg;
    }

    get() {
        if (this.msg) this.req.flash(this.msg.type, this.msg.info);
        this.res.redirect(this.redirect_url);
    };

    post() {
        if (this.msg) this.req.flash(this.msg.type, this.msg.info);
        this.res.redirect(this.redirect_url);
    };
}
RedirectView.http_method_names = ['GET', 'POST'];

class DeleteView extends View {
    constructor(req, res) {
        super(req, res);
        this.success_url = '/register';
        this.msg = "User successfully deleted";
        this.query = null;
    }

    delete(cb) {
        this.model.dao.delete(this.query, (err) => {
            if (err) this.crud_error(err);
            else cb();
        });
    };

}
DeleteView.http_method_names = ['DELETE'];

class ListView extends View {
    constructor(req, res) {
        super(req, res);
        this.queryset = null;
        this.template_name = 'home';
        this.model = null;
        this.layout = 'main';
        this.objects = null;
    }

    get_queryset() {
        if (this.queryset)
            return this.queryset;
        else if (this.model) {
            return this.model.dao.all();
        }
        else throw Error("Queryset is missing");
    }

    get() {
        this.get_queryset().exec((err, objects) => {
            if (err) throw Error();
            this.objects = objects;
            super.get();
        });
    }
}
ListView.http_method_names = ['GET'];

module.exports = {
    View: View,
    DetailView: DetailView,
    RedirectView: RedirectView,
    CreateView: CreateView,
    ListView: ListView,
    DeleteView: DeleteView
};


