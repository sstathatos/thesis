let APIConstructor=require('../API/index');
let {isAllowed,isAllowedCreate}=APIConstructor;

let rules = [
    {route:"/",method:"GET"},
    {route:"/login",method:"POST"},
    {route:"/register",method:"POST"}
];

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
        res.status(418).send("NOT ALLOWED!");
    }
    else checkPermission(req,res);

};

let checkPermission = (req,res) => {
    let {query,method,path} = req;
    let model=path.split('/');
    console.log(model[1],query,method);

    if (method ==='POST') {
        isAllowedCreate(req.user._id,methodMap[method],model[1],query._id)((err,perm) => {
            if(err) throw err;
            if(perm==='allowed') {
                console.log('ALLOWED to create');
                res.status(200).send('ALLOWED to create');
                //next();
            }
            else {
                console.log('ACCESS DENIED TO CREATE');
                res.status(418).send('ACCESS DENIED!');
            }
        });
    }

    else if ((method === 'GET') || (method === 'PUT') || (method === 'DELETE')) {
        isAllowed(req.user._id,query._id,methodMap[method],model[1])((err,perm) => {
            if(err) throw err;
            if(perm==='allowed') {
                console.log(`ALLOWED to ${methodMap[method]}`);
                res.status(200).send(`ALLOWED to ${methodMap[method]}`);
                //next();
            }
            else {
                console.log(`ACCESS DENIED TO ${methodMap[method]}`);
                res.status(418).send('ACCESS DENIED!');
            }
        })
    }

    else {
        console.log('NOT ALLOWED vol2!');
        res.status(418).send("NOT ALLOWED vol2!");
    }
};

let defend= (router) => {
    router.use(defender);
};

module.exports=defend;

