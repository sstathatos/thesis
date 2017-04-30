let DBOpsConstructor = require('./DBOpsConstructor');
let util = require('util');

let permissionConstructor = () => {

    let {createObj, readObjs, updateObj, deleteObj, entities} = DBOpsConstructor();

    let roles = {
        owner: {read: 'allow', update: 'allow', delete: 'allow', create: 'allow'},
        member: {read: 'allow', update: 'deny', delete: 'deny', create: 'allow'}
    };
    let methods = ['read', 'update', 'delete', 'create'];

    let addUserRole = (user_id, obj_id, role, model_name) => {
        return (cb) => {
            if (model_name === 'users' || model_name === 'plots') cb(new Error(`this operation is not supported for model: ${model_name}`));
            let model = entities[model_name];

            readObjs('users', {_id: user_id})((err, user) => {
                if (err) return cb(new Error(err));
                if (user.length === 1) {
                    readObjs(model_name, {_id: obj_id})((err, obj) => {

                        if (err) return cb(new Error(err));
                        if (obj.length === 1) {
                            let role_methods = roles[role];
                            let cnt = 0;
                            for (let method in role_methods) {
                                if (checkObj(obj[0].acl[method].allow, user_id) || checkObj(obj[0].acl[[method]].deny, user_id)) {
                                    return cb(new Error(`User: ${user[0].username} already has permissions in this object.`))
                                }
                                else {
                                    let newdata = `acl.${method}.${role_methods[method]}`;
                                    updateObj(model_name, {_id: obj_id}, {$push: {[newdata]: user_id}})((err, data) => {
                                        cnt++;
                                        if (cnt === 4) return cb(err, data);
                                    });
                                }
                            }
                        }
                        else return cb(new Error(`Obj id: ${obj_id} does not exist in the collection: ${model_name} db`));
                    })
                }
                else return cb(new Error(`User id: ${user_id} does not exist in db`));
            })
        }
    };

    let checkObj = (array, id) => {
        if (array.length === 0) return false;
        for (let ar_id in array) {
            if (array[ar_id].toString() === id.toString()) return true;
        }
        return false;
    };

    return {
        addUserRole
    }
};
module.exports = permissionConstructor;



