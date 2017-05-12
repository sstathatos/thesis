const router = require('express').Router();
//let defender = require('./defender')(router);
let session_setup = require('./session_setup');
let APIConstructor=require('../API/index');
let fs = require('fs');
let shortid = require('shortid');
let Busboy = require('busboy');
let spawn=require('child_process').spawn;

let {readObjs,updateObj}=APIConstructor;

router.get('/', (req, res) => {
    res.status(200).send({perm:'allowed',msg:'all done'});
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

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.status(200).send({perm:'allowed',msg:'all done'});
    });
});


router.get('/users', (req, res) => {
    let {query} = req;
    readObjs('users',{_id:query._id})((err,users) => {
        if (err) throw err;
        let new_user=users.map((obj)=>{return {"name":obj.name,"username":obj.username,"email" : obj.email}})[0];
        new_user['projects']=[];
        let qpath="acl.read.allow";
        readObjs('projects',{[qpath]:query._id})((err,projs) => {
            if (err) throw err;
            new_user['projects'].push(projs.map((obj)=>{return {"name":obj.name,
                "description":obj.description,"date":obj.date.toISOString().slice(0, 10)}}));
            res.status(200).send({perm:'allowed',data:new_user});
        });
    });
});



router.get('/datasets',(req,res) => {
    let {query} = req;
    let new_dsets = [];
    readObjs('datasets',query)((err,dset) => {
        if (err) throw err;
        console.log(dset[0].path_saved);
        getHDFContentsForView(dset[0].path_saved,(err,contents) => {
            let con =  JSON.parse(JSON.stringify(contents));
            console.log(con);
            res.status(200).send('all done');
        });
    })
});

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

router.get('/grid',(req,res) => {
    readObjs('datasets',{})((err,dset) => {
        if (err) throw err;
        console.log(dset[0]._id);
        getHDFArray(dset[0].path_saved,req.query,(err,contents) => {
            let con =  JSON.parse(JSON.stringify(contents));
            res.status(200).json(con);
        });
    })
});

function getHDFArray(path_saved,obj,cb) {
    let {path,direction,xstart,xend,ystart,yend,dim1,dim2,dim3Value}=obj;
    let sp_child;
    if(dim1 && dim2 && dim3Value) {
        sp_child= spawn('python3',[__dirname+"/python_files/getHDFArray.py",path_saved,path,
            direction,xstart,xend,ystart,yend,dim1,dim2,dim3Value]);
    }
    else {
            sp_child= spawn('python3',[__dirname+"/python_files/getHDFArray.py",path_saved,path,
                direction,xstart,xend,ystart,yend]);
    }

    sp_child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    sp_child.stdout.on('data', function (data) {
        let arr = data.toString();
        cb(null,arr)
        //var array = JSON.parse(arr); //parse data into JSON form
    });
}


function getHDFContentsForView(path,cb) {
    let sp_child= spawn('python3',[__dirname+"/python_files/getHDFContent.py",path]);

    sp_child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    sp_child.stdout.on('data', function (data) {
        let arr = data.toString();
        cb(null,arr)
        //var array = JSON.parse(arr); //parse data into JSON form
    });
}


router.post('/upload', (req,res) => {
    let {query} = req;
    save_data(req,(err,data_path) => {
        console.log(data_path);
        updateObj('datasets',query,{path_saved:data_path})((err,data) => {
            if (err) throw err;
            //console.log(data);
            res.status(200).send({perm:'allowed',data:data_path});
        });
    })
});

function save_data(req, cb) {
    let busboy = new Busboy({headers: req.headers});
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        if (!filename.includes('.h5')) cb('This file extension is not supported.', null);
        else {
            file.fileRead = []; //collect al8l chunks
            let size = 0; //count size of chunks
            file.on('data', function (chunk) {
                size += chunk.length;
                file.fileRead.push(chunk);
            });
            file.on('end', function () {
                console.log(size);
                let data = Buffer.concat(file.fileRead, size);//concat all chunks
                let new_name=__dirname+'/hdf_saved_files/'+shortid.generate()+'.h5';
                fs.writeFile(new_name, data, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                    cb(null,new_name);
                });
            });
            file.on('limit', function () {
                console.log("limit!!");
            });
        }
    });
    busboy.on('finish', function () {
        console.log('Done parsing form!');
    });
    busboy.on('error', function (err) {
        cb(new Error(err));
    });
    req.pipe(busboy);
}

router.get('/plots',(req,res) => {
    let new_plots = [];
    readObjs('plots',{})((err,plots) => {
        if (err) throw err;
        new_plots=plots.map((obj)=>{return {"title":obj.title,"description":obj.description,
            "plot_metadata":obj.plot_metadata,"data":[{'x':3,'y':5},{'x':3,'y':5}]}});
        //hdf
        res.status(200).json(new_plots);
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

router.get('/projects' ,(req,res) => {
    readObjs('projects',req.query._id)((err,proj) => {
        if (err) throw err;
        confProject(proj[0],(err,proj) => {
            if(err) throw err;
            res.status(200).json({perm:'allowed',data:proj});
        })
    })
});

function searchRelatedPosts(query,cb) {
    readObjs('posts',{_id:query._id})((err,posts) => {
        if (err) return cb(new Error(err));
        if(posts[0].inpost) return searchRelatedPosts({_id:posts[0].inpost},cb);
        else {
            let whole_post = {kids:[]};
            let cnt=0;
            readObjs('posts',{$or :[{_id:query._id},{inpost:query._id}]})((err,posts) => {
                if (err) return cb(new Error(err));
                for(let i in posts){

                    if (JSON.stringify(posts[i]._id)===JSON.stringify(query._id)) { //parent
                        confPost(posts[i],(err,post) => {
                            if (err) return cb(new Error(err));
                            whole_post['parent']=post;
                            if(cnt ===posts.length -1) return cb(null,whole_post);
                            cnt++;
                        })
                    }
                    else { //kid
                        confPost(posts[i],(err,post) => {
                            if (err) return cb(new Error(err));
                            whole_post.kids.push(post);
                            if(cnt ===posts.length -1) return cb(null,whole_post);
                            cnt++;
                        })
                    }
                }
            });
        }
    });
}


function confProject(proj,cb) {
    let obj ={};
    let cnt =0;
    obj['name'] = proj.name;
    obj['description'] = proj.description;
    obj['date'] = proj.date.toISOString().slice(0, 10);
    obj.post_parents=[];

    confDsets({inproject:proj._id},(err,dsets) => {
        obj['dsets']=dsets;
        readObjs('posts',{$and:[{inproject:proj._id},{inpost:{$exists:false}}]})((err,posts)=> {
            if(err) return cb(new Error(err));
            if(posts.length===0) return cb(null,{});
            else {
                for(let j in posts) {
                    confPost(posts[j],(err,post) => {
                        obj['post_parents'].push(post);
                        if(cnt === posts.length-1) {
                            return cb(null,obj);
                        }
                        cnt++;
                    })
                }
            }
        })
    });
}

function confPost(post,cb) {
    let obj={};
    obj['title']=post.title;
    obj['_id']=post._id;
    obj['description']=post.description;
    obj['date'] = post.date.toISOString().slice(0, 10);
    if(post.inpost) obj['inpost']=post.inpost;
    confDsets({_id:post.dset_link},(err,dset) => { //only one
        if (err) return cb (new Error(err));
        obj['dset']=dset[0];
        readObjs('plots',{inpost:post._id})((err,plots) => { //only one
            if (err) return cb (new Error(err));
            obj['plots_ids']=plots.map((obj)=> {return {title:obj.title,_id:obj._id}});
            return cb(null,obj);
        })
    })
}

function confDsets(query,cb) {
    let new_dsets = [];
    readObjs('datasets',query)((err,dsets) => {
        if (err) return cb(new Error(err));
        if(dsets.length===0) return cb(err,[]);
        for(let i=0;i<dsets.length;i++) {
            let obj={};
            obj['name']=dsets[i].name;
            obj['_id']=dsets[i]._id;
            obj['creator']=dsets[i].creator;//use search function
            obj['date'] = dsets[i].date.toISOString().slice(0, 10);
            new_dsets.push(obj);

            if(i === dsets.length-1) {
                return cb(null,new_dsets);
            }
        }
    })
}

router.all('*' ,(req,res) => {
    res.status(200).send({perm:'allowed'});
});

module.exports=router;
