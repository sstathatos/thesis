const router = require('express').Router();
//let defender = require('./defender')(router);
let session_setup = require('./session_setup');
let fs = require('fs');
let APIConstructor=require('../API/index');
let helperConstructor=require('./helpers');

let {readObjs,updateObj,createObj}=APIConstructor;
let {getUserProjects,getHDFPlot,getHDFArray,getHDFContentsForView,
    confProject,searchRelatedPosts,save_data,getDataFromPlotID,confDsets}= helperConstructor;

router.get('/', (req, res) => {
    let code = "/bundle.js";
    let c3css = "/c3.css";
    let home = `
        <!doctype html>
        <html lang=en>
        <head>
            <meta charset=utf-8>
            <title>blah</title>
            <link rel="stylesheet" type="text/css" href="${c3css}">
        </head>
        <body>
            <div id="app"></div>
            
            <script src="${code}"></script>
        </body>
        </html>
    `;
    res.set('Content-Type','text/html').status(200).send(home);
});

router.post('/login', (req, res, next) => {
    session_setup.passport.authenticate('local', {failureFlash: true}, (err, user, info) => {
        if (err) return next(err);
        else if (!user) {
            res.status(404).send('error');
        }
        else {
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                else {
                    res.status(200).send('all done');
                }
            });
        }
    })(req,res,next);
});

router.post('/register', (req,res) => {
    let {query} = req;
    createObj('users',query)((err,user) => {
        if (err) throw err;
        res.status(200).send({perm:'allowed',data:user});
    })
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.status(200).send({perm:'allowed',msg:'all done'});
    });
});


//get a user's profile contents
router.get('/users', (req, res) => {
    let {query} = req;
    readObjs('users',{_id:query._id})((err,users) => {
        if (err) throw err;
        let new_user=users.map((obj)=>{return {"name":obj.name,"username":obj.username,"email" : obj.email}})[0];
        getUserProjects(query._id, (err,projs) => {
            new_user['projects']=projs;
            res.status(200).send({perm:'allowed',data:new_user});
        });
    });
});

router.post('/projects', (req,res) => {
    let {query} = req; //MUST BE CHANGED remember project members etc
    createObj('projects',query)((err,proj) => {
        if (err) throw err;
        res.status(200).send({perm:'allowed',data:proj});
    })
});

router.post('/datasets', (req,res) => {
    let {query} = req;
    query['creator'] = '5931b0a96b3bc32dee7dbc8f';//req.user._id MUST BE CHANGED
    save_data(req,(err,data_path) => {
        query['path_saved']=data_path;
        createObj('datasets',query)((err,dset) => {
            if (err) throw err;
            res.status(200).send({perm:'allowed',data:dset});
        })
    });
});

router.post('/plots' ,(req,res) => {
    let {query} = req;
    console.log(query);
    createObj('plots',query)((err,plot) => {
        if (err) throw err;
        res.status(200).send({perm:'allowed',data:plot});
    })
});

router.get('/datasetlist', (req,res) => {
    let {query} = req;
    confDsets({inproject:query._id},(err,dsets) => {
        if (err) throw err;
        res.status(200).send({perm:'allowed',data:dsets});
    });
});

//read contents of ONE dataset... use of PYTHON
router.get('/datasets',(req,res) => {
    let {query} = req;
    let new_dsets = [];
    readObjs('datasets',query)((err,dset) => {
        if (err) throw err;
        console.log(dset[0].path_saved);
        getHDFContentsForView(dset[0].path_saved,(err,contents) => {
            // let con =  JSON.parse(JSON.stringify(contents));
            res.status(200).send({perm:'allowed',data:contents});
        });
    })
});

//read data of ONE dataset ...use of PYTHON
router.get('/datasets/grid',(req,res) => {
    //let {path,direction,xstart,xend,ystart,yend,_id} = req.query;
    readObjs('datasets',{_id:req.query._id})((err,dset) => {
        if (err) throw err;
        console.log(dset[0]._id);
        //console.log({path,direction,xstart,xend,ystart,yend,_id});
        getHDFArray(dset[0].path_saved,req.query,(err,contents) => {
            let con =  JSON.parse(JSON.stringify(contents));
            //console.log(con);
            res.status(200).send(con);
        });
    })
});

router.get('/plots',(req,res) => {
    getDataFromPlotID(req,(err,data) => {
        if (err) throw err;

        res.status(200).send({perm:'allowed',data:data});
    })
});

router.get('/posts',(req,res) => {
    searchRelatedPosts(req.query,(err,posts) => {
        if (err) {
            console.log(err);
            return res.status(404).send({perm:'allowed',data:{}});
        }
        return res.status(200).send({perm:'allowed',data:posts});
    });
});

//get contents of ONE project
router.get('/projects' ,(req,res) => {
    readObjs('projects',req.query._id)((err,proj) => {
        if (err) throw err;
        confProject(proj[0],(err,proj) => {
            if(err) throw err;
            res.status(200).send({perm:'allowed',data:proj});
        })
    })
});







//testing
router.post('/upload', (req,res) => {
    let {query} = req;
    console.log(req.headers);
    save_data(req,(err,data_path) => {
        console.log(data_path);
        updateObj('datasets',query,{path_saved:data_path})((err,data) => {
            if (err) throw err;
            //console.log(data);
            res.status(200).send({perm:'allowed',data:data_path});
        });
    })
});
//for testing
router.get('/plot',(req,res) => {
    //console.log(req.query);
    readObjs('datasets',{})((err,dset) => {
        if (err) throw err;
        console.log(dset[0]._id);
        getHDFPlot(dset[0].path_saved,req.query,(err,contents) => {
            console.log('done');
            res.status(200).json(contents);
        });
    })
});
//for testing
router.get('/grid',(req,res) => {
    readObjs('datasets',{})((err,dset) => {
        if (err) throw err;
        console.log(dset[0]._id);
        getHDFArray(dset[0].path_saved,req.query,(err,contents) => {
            res.status(200).json(contents);
        });
    })
});

//for testing concurrent
router.get('/plottest',(req,res) => {
    let query={ path: 'd3dset',
        dim1: '1',
        dim2: '2',
        dim3Value: '0',
        dim2Value: '2',
        currystart: '0',
        curryend: '0',
        zoomstart: '0',
        zoomend: '0',
        direction: 'init' };
    readObjs('datasets',{})((err,dset) => {
        if (err) throw err;
        console.log(dset[0]._id);
        getHDFPlot(dset[0].path_saved,query,(err,contents) => {
            console.log('done');
            res.status(200).json(contents);
        });
    })
});

router.all('*' ,(req,res) => {
    res.status(200).send({perm:'allowed'});
});

module.exports=router;
