let APIConstructor=require('../API/index');
let {isAllowed,isAllowedCreate}=APIConstructor;

let rules = [
    {route:"",method:"GET"},
    {route:"login",method:"POST"},
    {route:"register",method:"POST"},
    {route:'isauthenticated',method:'GET'}
];

let map_to_model = {
    'datasetlist' : 'projects',
    'datasetgrid' : 'datasets',
    'preview' : 'datasets'
};

let entities=['users','projects','posts','datasets','plots'];

let methodMap = {
    'GET':"read",'POST':"create",'PUT':"update",'DELETE':"delete"
};

let defender = (req,res,next) => {
    let {url,method,path}=req;
    let current = {route:path.split('/')[1],method};
    console.log(method, url);

    for (let i in rules) {
        if (JSON.stringify(current)===JSON.stringify(rules[i])) {
            return next();
        }
    }

    if (!req.isAuthenticated()) {
        return res.status(401).send('You are not authenticated.');
    }

    else return checkExceptions(req,res,next);

};

let checkExceptions = (req,res,next) => {
    let {url} = req;
    // let regExp1 =/(\?_id=)(\/)/;

    // let regExp= /[-!$^*()+|~`{}\[\]:";'<>,.]/;
    //
    // if(regExp.test(url)) {
    //     console.log('weird symbols');
    //     return res.status(418).send({perm:"denied"});
    // }
    // else if (url.split("/").length -1 >2) {
    //     console.log('too many slashes');
    //     return res.status(418).send({perm:"denied"});
    // }

    checkPermission(req,res,next);
};

let checkPermission = (req,res,next) => {
    let {query,method,path} = req;
    let model=path.split('/');

    if(model[1]==='logout' | model[1]==='search' | model[1]==='join') {
        return next();
    }

    else if(map_to_model[model[1]]) {
        model[1] = map_to_model[model[1]];
    }

    if(!entities.includes(model[1])) {
        return res.status(400).send('Bad request.');
    }

    else if (method ==='POST') {
        let check;

        if(query.inproject) check = query.inproject;
        else if(query.inpost) check = query.inpost;
        else check = query._id;

        isAllowedCreate(req.user._id,methodMap[method],model[1],check)((err,perm) => {
            if(err) {
                console.log(err.message);
                return res.status(500).send('Internal Server Error.');
            }
            if(perm==='allowed') {
                return next();
            }
            else {
                return res.status(403).send('Permission denied.');
            }
        });
    }

    else if ((method === 'GET') || (method === 'PUT') || (method === 'DELETE')) {
        isAllowed(req.user._id,query._id,methodMap[method],model[1])((err,perm) => {
            if(err) {
                console.log(err.message);
                return res.status(500).send('Internal Server Error.');
            }
            if(perm==='allowed') {
                return next();
            }
            else {
                return res.status(403).send('Permission denied.');
            }
        })
    }

    else {

        return res.status(400).send('Bad request.');

    }
};

let defend= (app) => {
    app.use(defender);
};

module.exports=defend;

