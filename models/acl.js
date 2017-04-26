let Entities = require('./entity').Entities;
let projects = Entities[1];
var ObjectId = require('mongodb').ObjectID;

class Acl {
    constructor() {
    }
}

Acl.roles = {
    owner: {read: true, update: true, delete: true, create: true},
    member: {read: true, update: false, delete: false, create: true}
};

Acl.method_map = {
    get: 'read', post: 'create', put: 'update', delete: 'delete'
};

Acl.addUserRole = (collection, role_name, obj_id, users, cb) => {
    let role = Acl.roles[role_name];
    let new_query = {};
    let cnt = 0;
    for (let user in users) {
        for (let key in role) {
            if (role[key] === true) {
                let name = "acl." + Object.keys(role)[cnt] + ".allow";
                if (!new_query[[name]]) new_query[[name]] = {$each: []};
                new_query[[name]].$each.push(users[user]);
            }
            cnt++;
        }
        cnt = 0;
    }
    collection.dao.update({_id: obj_id}, {$push: new_query}, (err, doc) => {
        if (err) cb(err, null);
        else cb(null, doc);
    });
};

/*
 * Acls Check. If someone tries to perform an operation  which he is not permitted for, we redirect to an Error!
 * */
Acl.isAllowed = (collection, req, cb) => {
    let op = Acl.method_map[req.method.toLowerCase()];
    let query = "acl." + op + ".allow";

    //{user_id: req.user._id, obj_id: req.params._id}
    collection.dao.all().findOne({_id: req.params._id, [query]: req.user._id}, (err, result) => {
        // console.log(result);
        // console.log(result[op]);
        if (err) return cb(err, null);
        else {
            return cb(null, result[op]);
        }
    });
};

Acl.removeUserRole = (collection, role_name, obj_id, users, cb) => {
    let role = Acl.roles[role_name];
    let new_query = {};
    let cnt = 0;
    for (let user in users) {
        for (let key in role) {
            if (role[key] === true) {
                let name = "acl." + Object.keys(role)[cnt] + ".allow";
                if (!new_query[[name]]) new_query[[name]] = {$each: []};
                new_query[[name]].$each.push(users[user]);
            }
            cnt++;
        }
        cnt = 0;
    }
    collection.dao.update({_id: obj_id}, {$pop: new_query}, (err, doc) => {
        if (err) cb(err, null);
        else cb(null, doc);
    });
};

module.exports= {
    Acl: Acl
};

// Acl.addUserRole(projects,'owner',ObjectId("58cebe5ac90385156b7f9159"),[ObjectId("58cebe5ac90385156b7f9158")],(err,res)=> {
//     if (err) throw Error(err);
//     else console.log(res);
// });

// let my_query= role.map((a)=>{
//     let name="acl."+Object.keys(a)+".allow";
//     if(a[Object.keys(a)]===true) return {[name]:user_id};
// });


//{"acl.read.allow":role['read'],"acl.create.allow":role['create'],"acl.update.allow":role['update'],"acl.delete.allow":role['delete']
// Acl.addRole = (role_name,obj_id,privileges,cb) => {
//     let my_query = privileges.map(function (a) {
//         return
//     });
//     acl_roles.dao.create({role:role_name,obj_id:obj_id,privilege:privilege,allow:allow},(err,role)=> {
//         if(err) cb(err,null);
//         else cb(null,role);
//     });
// };

