let APIConstructor=require('../API/index');
let {isAllowed,isAllowedCreate}=APIConstructor;

let rules = [
    {route:"/",method:"GET"},
    {route:"/login",method:"POST"},
    {route:"/register",method:"POST"}
];

let entities=['users','projects','posts','datasets','plots'];

let methodMap = {
    'GET':"read",'POST':"create",'PUT':"update",'DELETE':"delete"
};

let defender = (req,res,next) => {
    let {url,method}=req;

    let current = {route:url,method};
    console.log(method, url);

    for (let i in rules) {
        if (JSON.stringify(current)===JSON.stringify(rules[i])) {
            return next('route');
        }
    }

    if (!req.isAuthenticated()) {
        console.log('NOT ALLOWED!');
        return res.status(418).send({perm:"denied"});
    }

    else checkPermission(req,res,next);

};

let checkPermission = (req,res,next) => {
    let {query,method,path} = req;
    let model=path.split('/');
    console.log(model[1],query,method);

    if(model[1]==='logout') {
        return next('route');
    }

    if(!entities.includes(model[1])) {
        return res.status(418).send({perm:"denied"});
    }

    else if (method ==='POST') {
        isAllowedCreate(req.user._id,methodMap[method],model[1],query._id)((err,perm) => {
            if(err) {
                console.log(err.message);
                return res.status(418).send({perm:"denied"});
            }
            if(perm==='allowed') {
                // res.status(200).send('allowed');
                return next();
            }
            else {
                return res.status(418).send({perm:"denied"});
            }
        });
    }

    else if ((method === 'GET') || (method === 'PUT') || (method === 'DELETE')) {
      // /users && method 'get'
        isAllowed(req.user._id,query._id,methodMap[method],model[1])((err,perm) => {
            if(err) {
                console.log(err.message);
                return res.status(418).send({perm:"denied"});  //404 normally
            }
            if(perm==='allowed') {
                return next(); 
            }
            else {
                return res.status(418).send({perm:"denied"});
            }
        })
    }

    else {
        return res.status(418).send({perm:"denied"}); 
    }
};

let defend= (router) => {
    router.use(defender);
};

module.exports=defend;

