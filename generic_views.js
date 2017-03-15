class View {
    constructor() {
        this.http_method_names = ['GET', 'POST', 'PUT', 'DELETE'];
    }

    as_view(req, res) {
        this.req = req;
        this.res = res;

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

    get(req, res) {
        res.render(this.template_name, this.get_context_data(this.objects));
    };

    get_context_data(items) {
        return {
            items: items,
            layout: this.layout
        }
    }

    post(req, res) {
        throw Error();
    };
}

class DetailView extends View {
    constructor(object, template_name) {
        super();
        this.objects = object;
        this.template_name = template_name;
        this.layout = 'main';
    }
}
DetailView.http_method_names = ['GET'];


class RedirectView extends View {
    constructor(redirect_url, msg) {
        super();
        this.redirect_url = redirect_url;
        this.msg = msg;
    }

    get(req, res) {
        if (this.msg) req.flash(this.msg.type, this.msg.info);
        res.redirect(this.redirect_url);
    };

    post(req, res) {
        if (this.msg) req.flash(this.msg.type, this.msg.info);
        res.redirect(this.redirect_url);
    };
}
RedirectView.http_method_names = ['GET', 'POST'];

class ValidateView extends View {
    constructor() {
        super();
    }

    validate(req, res) {
        if (!req.body.username || !req.body.password) {
            req.flash('error', "Data are required.");
            res.redirect('/error');
        }
    }
}


class CreateView extends ValidateView {
    constructor() {
        super();
        this.success_url = '/';
        this.model = null;
        this.template_name = 'welcome';
        this.msg = null;
    }

    post(req, res) {
        super.validate(req, res, () => {
            this.model.dao.create(req.body, (err) => {
                if (err) {
                    req.flash('error', err);
                    res.redirect('/error');
                }
                req.flash('success', this.msg);
                res.redirect(this.success_url);
            });
        });
    };
}
CreateView.http_method_names = ['GET', 'POST'];

class UpdateView extends ValidateView {
    constructor() {
        super();
        this.success_url = null;
        this.template_name = 'editprofile';
        this.layout = 'main';
        this.msg = null;
        this.query = null;
        this.model = null;
    }

    put(req, res) {
        super.validate(req, res, () => {
            this.model.dao.update(this.query, req.body, (err) => {
                if (err) {
                    req.flash('error', err);
                    res.redirect('/error');
                }
                req.flash('success', this.msg);
                res.redirect(this.success_url);
            });
        });
    };
}
UpdateView.http_method_names = ['GET', 'PUT'];

class DeleteView extends View {
    constructor() {
        super();
        this.success_url = '/register';
        this.msg = "User successfully deleted";
        this.query = null;
    }

    delete(req, res) {
        this.model.dao.delete(this.query, (err) => {
            if (err) {
                req.flash('error', err);
                res.redirect('/error');
            }
            req.flash('success', this.msg);
            res.redirect(this.success_url);

        });
    };
}
DeleteView.http_method_names = ['DELETE'];

//todo change  get_queryset
class ListView extends View {
    constructor() {
        super();
        this.queryset = null;
        this.template_name = 'home';
        this.model = null;
        this.layout = 'main';
        this.objects = null;
    }

    get_queryset(req) {
        if (this.queryset)
            return this.queryset;
        else if (this.model) {
            return this.model.dao.all();
        }
        else throw Error("Queryset is missing");
    }

    get(req, res) {
        this.get_queryset(req).exec((err, objects) => {
            if (err) throw Error();
            this.objects = objects;
            super.get(req, res);
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
    DeleteView: DeleteView,
    UpdateView: UpdateView
};


