let Routes = () => {
    const router = require('express').Router();
    //let defender = require('./defender')(router);
    let session_setup = require('./session_setup');
    let APIConstructor=require('../API/index');
    let helperConstructor=require('./helpers');
    let client = require('./client');

    let {readObjs,createObj,addUserRole,isAllowed}=APIConstructor;
    let {getUserProjects,getHDFArray,getHDFContentsForView,
        confProject,searchRelatedPosts,
        save_data,getDataFromPlotID,getHDFPlot,confDsets,errorHandler}= helperConstructor;

    router.get('/', (req, res) => {
        let home = client();
        res.set('Content-Type','text/html').status(200).send(home);
    });

    router.post('/login', (req, res, next) => {
        session_setup.passport.authenticate('local', {failureFlash: true}, (err, user, info) => {

            if (err) return errorHandler(500,err.message,res);

            else if (!user) {
                return res.status(422).send(info);
            }
            else {
                req.logIn(user, (err) => {
                    if (err) return errorHandler(500,err.message,res);
                    else {
                        res.status(200).send({data:user});
                    }
                });
            }
        })(req,res,next);
    });

    router.get('/logout', (req, res) => {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.status(200).send();
        });
    });

    router.get('/isauthenticated', (req,res) => {
        res.status(200).send(req.isAuthenticated());
    });

    router.get('/search', (req, res) => {
        let {query} = req;

        readObjs('users',{username:query['term']})((err,users) => {
            if (err) return errorHandler(500,err.message,res);

            if(users.length === 0) {
                res.status(200).send({data:'empty'});
            }
            else if (users.length === 1) {
                let new_user=users.map((obj)=>{return {"name":obj.name,"username":obj.username,"email" : obj.email}})[0];
                getUserProjects(users[0]._id, (err,projs) => {
                    let cnt = 0;
                    if(projs.length === 0) {
                        new_user['projects']=[];
                        return res.status(200).send({data:new_user});
                    }
                    else {
                        projs[0].map((proj,index)=> {
                            isAllowed(req.user._id, proj.id, 'read','projects')((err,result)=> {

                                if (err) return errorHandler(500,err.message,res);

                                projs[0][index].permission = result;
                                if(cnt === projs[0].length-1) {
                                    new_user['projects']=projs[0];
                                    res.status(200).send({data:new_user});
                                }
                                cnt++;
                            })
                        });
                    }
                });
            }
            else {
                res.status(200).send({data:'too many results'});
            }
        });
    });

    router.get('/join',(req,res)=> {
        addUserRole(req.user._id, req.query._id, 'member','projects')((err) => {
            if (err) return errorHandler(500,err.message,res);

            res.status(200).send();
        })
    });

    router.post('/register', (req,res) => {
        let {query} = req;
        createObj('users',query)((err,user) => {
            if (err) return res.status(422).send(err.message);


            res.status(200).send({data:user});
        })
    });

//get a user's profile contents
    router.get('/users',(req,res) => {
        let {query} = req;
        readObjs('users',{_id:query._id})((err,users) => {
            if (err) return errorHandler(500,err.message,res);

            let new_user=users.map((obj)=>{return {"name":obj.name,"username":obj.username,"email" : obj.email}})[0];
            getUserProjects(query._id, (err,projs) => {
                if (err) return errorHandler(500,err.message,res);

                new_user['projects']=projs;
                res.status(200).send({perm:'allowed',data:new_user});
            });
        });
    });

//get contents of ONE project
    router.get('/projects' ,(req,res) => {
        readObjs('projects',req.query)((err,proj) => {
            if (err) return errorHandler(500,err.message,res);
            confProject(proj[0],(err,proj) => {
                if (err) errorHandler(500,err.message,res);
                res.status(200).send({perm:'allowed',data:proj});
            })
        })
    });

    router.post('/projects', (req,res) => {
        let {query} = req; //MUST BE CHANGED remember project members etc
        createObj('projects',query)((err,proj) => {
            if (err) return errorHandler(500,err.message,res);

            addUserRole(req.user._id, proj._id, 'owner', 'projects')((err)=> {

                res.status(200).send({perm:'allowed',data:proj});
            });
        })
    });

    router.get('/posts',(req,res) => {
        searchRelatedPosts(req.query,(err,posts) => {
            if (err) return errorHandler(500,err.message,res);

            return res.status(200).send({perm:'allowed',data:posts});
        });
    });

    router.post('/posts',(req,res) => {
        let {query} = req;

        createObj('posts',query)((err,post) => {
            if (err) return errorHandler(500,err.message,res);

            addUserRole(req.user._id, post._id, 'owner', 'posts')((err)=> {
                if (err) return errorHandler(500,err.message,res);
                res.status(200).send({perm:'allowed',data:post});
            });
        })
    });

    router.post('/datasets', (req,res) => {
        let {query} = req;
        save_data(req,(err,data_path) => {
            if (err) return errorHandler(500,err.message,res);
            query['path_saved']=data_path;
            createObj('datasets',query)((err,dset) => {
                if (err) return errorHandler(500,err.message,res);
                return res.status(200).send({data:dset});
            })
        });
    });

//read contents of ONE dataset... use of PYTHON
    router.get('/datasets',(req,res) => {
        let {query} = req;
        readObjs('datasets',query)((err,dset) => {
            if (err) return errorHandler(500,err.message,res);
            console.log(dset[0].path_saved);
            getHDFContentsForView(dset[0].path_saved,(err,contents) => {
                if (err) return errorHandler(500,err.message,res);
                res.status(200).send({perm:'allowed',data:contents});
            });
        })
    });

    router.get('/datasetlist', (req,res) => {
        let {query} = req;
        confDsets({inproject:query._id},(err,dsets) => {
            if (err) return errorHandler(500,err.message,res);
            res.status(200).send({perm:'allowed',data:dsets});
        });
    });

//read data of ONE dataset ...use of PYTHON
    router.get('/datasetgrid',(req,res) => {
        let {query} = req;
        readObjs('datasets',{_id:query._id})((err,dset) => {
            if (err) return errorHandler(500,err.message,res);
            getHDFArray(dset[0].path_saved,query,(err,contents) => {
                res.status(200).send({perm:'allowed',data:contents});
            });
        })
    });

    router.post('/plots' ,(req,res) => {
        let {query} = req;
        let {inpost,dim1,dim2,dim3Value,dim2Value,plot_type,title,description,array_path_saved} = query;

        let plot_metadata ={dim1,dim2,dim2Value,plot_type};
        if(dim3Value) plot_metadata['dim3Value'] = dim3Value;

        let new_obj = {
            inpost,
            title,
            description,
            array_path_saved,
            plot_metadata
        };
        createObj('plots',new_obj)((err,plot) => {
            if (err) return errorHandler(500,err.message,res);
            res.status(200).send({perm:'allowed',data:plot});
        })
    });

    router.get('/plots',(req,res) => {
        getDataFromPlotID(req,(err,data) => {
            if (err)  return errorHandler(500,err.message,res);

            res.status(200).send({perm:'allowed',data:data});
        })
    });

    router.get('/plottest',(req,res) => {

        req['query'] = {
        _id:"59590b507156f50deb28441a",
        direction:"init",
        currystart:0,
        curryend:0,
        zoomstart:0,
        zoomend:0
        };
        getDataFromPlotID(req,(err,data) => {
            if (err)  return errorHandler(500,err.message,res);

            res.status(200).send({perm:'allowed',data:data});
        })
    });

    router.get('/preview',(req,res) => {
        let {query} = req;
        console.log(query);
        let {_id,path,direction,currystart,curryend,zoomstart,zoomend,dim1,dim2,dim3Value,dim2Value} =query;
        readObjs('datasets',{_id:_id})((err,dset) => {
            if (err) return errorHandler(500,err.message,res);
            let obj={direction,currystart,curryend,zoomstart,
                zoomend,dim1,dim2,dim2Value,path};
            if(dim3Value) obj['dim3Value']= dim3Value;
            getHDFPlot(dset[0].path_saved,obj,(err,data) => {
                if (err) return errorHandler(500,err.message,res);
                res.status(200).send({perm:'allowed',data:data});
            });
        });
    });

    return router;

};

module.exports=Routes;
