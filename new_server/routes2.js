const router = require('express').Router();
let defender = require('./defender')(router);
let session_setup = require('./session_setup');
let APIConstructor=require('../API/index');
let {readObjs}=APIConstructor;

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
            new_user['projects'].push(projs.map((obj)=>{return {"name":obj.name,"description":obj.description,"date":obj.date.toISOString().slice(0, 10)}}));
            res.status(200).send({perm:'allowed',data:new_user});
        });
    });
});

router.get('/datasets',(req,res) => {
    let new_dsets = [];
    readObjs('datasets',{})((err,dsets) => {
        if (err) throw err;
        new_dsets=dsets.map((obj)=>{return {"name":obj.name,"creator":obj.creator,"date" : obj.date.toISOString().slice(0, 10),"data":[{'x':3,'y':5},{'x':3,'y':5}]}});
        //hdf function must be called
        res.status(200).json(new_dsets);
    })
});

router.get('/plots',(req,res) => {
    let new_plots = [];
    readObjs('plots',{})((err,plots) => {
        if (err) throw err;
        new_plots=plots.map((obj)=>{return {"title":obj.title,"description":obj.description,"plot_metadata":obj.plot_metadata,"data":[{'x':3,'y':5},{'x':3,'y':5}]}});
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

router.get('/projects' ,(req,res) => {
    readObjs('projects',req.query._id)((err,proj) => {
        if (err) throw err;
        confProject(proj[0],(err,proj) => {
            if(err) throw err;
            res.status(200).json({perm:'allowed',data:proj});
        })
    })
});

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




// let new_post=[];
// let cnt=0;
// let cnt1=0;
// readObjs('posts',{_id:query._id})((err,post) => {
//     if (err) throw err;
//     let parents=post.filter((obj)=>{ if(!obj.inpost) return obj });
//     let kids= post.filter((obj) => { if(obj.inpost) return obj});
//
//     for (let i=0;i<parents.length;i++) {
//         confPost(parents[i],(err,ppost) => {
//             if (err) throw err;
//             new_posts.push({parent:ppost,kids:[]});
//             if(cnt===parents.length-1)  {
//                 for (let i=0;i<kids.length;i++) {
//                     confPost(kids[i],(err,kpost) => {
//                         if (err) throw err;
//                         new_posts.filter((obj) =>{ if(JSON.stringify(obj.parent._id)===JSON.stringify(kpost.inpost)) {
//                             obj.kids.push(kpost);
//                         }});
//                         if(cnt1===kids.length-1)  {
//                             console.log('here');
//                             res.status(200).json(new_posts);
//                         }
//                         cnt1++;
//                     })
//                 }
//             }
//             cnt++;
//         })
//     }
// });