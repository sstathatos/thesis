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
        for(let i in users) {
            let obj={};

            obj['name'] = users[i].name;
            obj['username'] = users[i].username;
            obj['email'] = users[i].email;
            new_users.push(obj);
        }
        res.status(200).json(new_users);
    });
});

router.get('/projects' ,(req,res) => {
    let new_projects = [];
    readObjs('projects',{})((err,projs) => {
        if (err) throw err;
        for (let i in projs) {
            let obj ={};
            obj['post']=[];
            obj['post'].kids=[];
            obj['name'] = projs[i].name;
            obj['description'] = projs[i].description;
            obj['date'] = projs[i].date.toISOString().slice(0, 10);
            readObjs('posts',{inproject:projs[i]._id})((err,posts)=> {
                if(err) throw err;
                for(let j in posts) {
                    if(!posts[j].inpost){
                        obj['posts'][j].parent=posts[j];
                    }
                    else obj['posts'][j].kids.push(posts[j]);
                }
            })
        }
    })
});

function postConf(post_id,cb) {
    readObjs('datasets',{inproject})
}

module.exports=router;