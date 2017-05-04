const router = require('express').Router();

let APIConstructor=require('./API');
let {createObj, readObjs}=APIConstructor;

router.get('/', (req, res) => {
    res.status(200).json([]);
});

router.get('/users', (req, res) => {
    let new_users=[];

    readObjs('users',{})((err,users) => {
        if (err) throw err;
        new_users=users.map((obj)=>{return {"name":obj.name,"username":obj.username,"email" : obj.email}});
        res.status(200).json(new_users);
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
    let new_posts=[];
    let cnt=0;
    let cnt1=0;
    readObjs('posts',{})((err,posts) => {
        if (err) throw err;
        if (posts.length ===0)  res.status(200).json(new_posts);
        let parents=posts.filter((obj)=>{ if(!obj.inpost) return obj });
        let kids= posts.filter((obj) => { if(obj.inpost) return obj});

        for (let i=0;i<parents.length;i++) {
            confPost(parents[i],(err,ppost) => {
                if (err) throw err;
                new_posts.push({parent:ppost,kids:[]});
                if(cnt===parents.length-1)  {
                    for (let i=0;i<kids.length;i++) {
                        confPost(kids[i],(err,kpost) => {
                            if (err) throw err;
                            new_posts.filter((obj) =>{ if(JSON.stringify(obj.parent._id)===JSON.stringify(kpost.inpost)) {
                                obj.kids.push(kpost);
                            }});
                            if(cnt1===kids.length-1)  {
                                res.status(200).json(new_posts);
                            }
                            cnt1++;
                        })
                    }
                }
                cnt++;
            })
        }
    });
});

router.get('/projects' ,(req,res) => {
    let new_projects = [];
    let cnt1=0;
    readObjs('projects',{})((err,projs) => {
        if (err) throw err;

        if(projs.length===0) res.status(200).json(new_projects);

        else {
            for (let i in projs) {
                confProject(projs[i],(err,proj) => {
                    if(err) throw err;
                    new_projects.push(proj);
                    if(cnt1 === projs.length-1) res.status(200).json(new_projects);
                    cnt1++;
                })
            }
        }
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





module.exports=router;