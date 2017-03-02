// var DetailView = require('./views').DetailView;
//
//
// router.all('/users',function(req,res) {
//     var view = new DetailView();
//     view.as_view(req,res);
// });
// router.all('profiles', DetailView.as_view());
// router.all('/edit/profile', EditProfileView.as_view());


class View {

    as_view(req,res) {
        //console.log(req);
        this.req=req;
        this.res=res;

        return this.dispatch();
    }

    dispatch() {
        console.log(this.req.method);
        for(var num in View.http_method_names) {
            if (this.req.method==View.http_method_names[num]) {
                var handler = View[this.req.method];
                return handler(this.req, this.res);
            }
        }
        this.http_method_not_allowed();
    }

    http_method_not_allowed() {
        this.res.status(400);
        throw TypeError("Not an http method.");
    }
}
View.http_method_names = ['GET','POST','PUT','DELETE'];




class DetailView  extends View {
    constructor() {
        super();
    }
    // get(req, res){
    //     render(asdf)
    // }
    //
    // get_object(query) {
    //     if(query=={}) {
    //         throw Error("Empty query string");
    //     }
    //     else {
    //         this.model.read(query,function(err,result) {
    //             if(err) throw Error("An error happened during reading.");
    //             else if(result) {
    //                 return result;
    //             }
    //             else  throw Error("Bad request.");
    //         });
    //     }
    // }
}

 DetailView.http_method_names = ['GET'];
// DetailView.model=null;

module.exports= {
    DetailView:DetailView
}