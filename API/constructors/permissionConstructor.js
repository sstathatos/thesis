let util = require('util');

let permissionConstructor = (obj) => {
    let {entitiesConstructor,DAOConstructor,schemaConstructor,DBOpsConstructor,mongoose}=obj;
    let DBops = DBOpsConstructor({entitiesConstructor,DAOConstructor,schemaConstructor,mongoose});
    let {createObj, readObjs, updateObj, deleteObj, entities} = DBops;

    let roles = {
        owner: {read: 'allow', update: 'allow', delete: 'allow', create: 'allow'},
        member: {read: 'allow', update: 'deny', delete: 'deny', create: 'allow'}
    };
    let methods = ['read', 'update', 'delete', 'create'];

    let addUserRole = (user_id, obj_id, role, model_name) => {
        return (cb) => {
            if (model_name === 'users' || model_name === 'plots') return cb(new Error(`this operation is not supported for model: ${model_name}`));
            let model = entities[model_name];

            readObjs('users', {_id: user_id})((err, user) => {
                if (err) return cb(new Error(err));
                if (user.length === 1) {
                    readObjs(model_name, {_id: obj_id})((err, obj) => {
                        if (err) return cb(new Error(err));
                        if (obj.length === 1) {
                            let role_methods = roles[role];
                            let cnt = 0;
                            let perms=readPermissions(user_id,obj);
                            for (let method in role_methods) {
                                if (perms['read']) {
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

    let readPermissions = (user_id,obj) => {
        let perms={};
        for(let i=0;i<methods.length;i++) {
            if (checkObj(obj[0].acl[methods[i]].allow, user_id)) {
                perms[methods[i]]='allow';
            }
            else if(checkObj(obj[0].acl[methods[i]].deny, user_id)) {
                perms[methods[i]]='deny';
            }
            else perms[methods[i]]=null;

            if(i===3) {
                return  perms;
            }
        }
    };

    let checkObj = (array, id) => {
        if (array.length === 0) return false;
        for (let ar_id in array) {
            if (array[ar_id].toString() === id.toString()) return true;
        }
        return false;
    };

    let removeUserRole = (user_id, obj_id, role, model_name) => {
        return (cb) => {
            if (model_name === 'users' || model_name === 'plots') return cb(new Error(`this operation is not supported for model: ${model_name}`));
            let model = entities[model_name];

            readObjs('users', {_id: user_id})((err, user) => {

                if (err) return cb(new Error(err));
                if (user.length === 1) {

                    readObjs(model_name, {_id: obj_id})((err, obj) => {

                        if (err) return cb(new Error(err));
                        if(obj.length===1) {
                            let role_methods = roles[role];
                            let perms=readPermissions(user_id,obj);
                            if(JSON.stringify(perms)===JSON.stringify(role_methods)) {
                                let cnt = 0;

                                for (let method in role_methods) {
                                    let newdata = `acl.${method}.${role_methods[method]}`;
                                    updateObj(model_name, {_id: obj_id}, {$pull: {[newdata]: user_id}})((err, data) => {
                                        cnt++;
                                        if (cnt === 4) return cb(err, data);
                                    });
                                }
                            }
                            else return cb(new Error(`role given doesn't match the role found in user's permissions`));
                        }
                        else return cb(new Error(`Obj id: ${obj_id} does not exist in the collection: ${model_name} db`));
                    });
                }
                else return cb(new Error(`User id: ${user_id} does not exist in db`));
            });
        }
    };

    let isAllowed = (user_id, obj_id, method, model_name) => {
        return (cb) => {
            readObjs('users',{_id:user_id})((err,user) => { //CHECK USER_ID
                if (err) return cb(new Error(err));
                if (user.length === 1) {

                    readObjs(model_name, {_id: obj_id})((err, obj) => { //CHECK OBJ_ID

                        if (err) return cb(new Error(err));
                        if (obj.length === 1) {

                            if (model_name === 'users') {
                                if(method === 'read') return cb(null,'allowed');
                                else if(JSON.stringify(obj[0]._id)===JSON.stringify(user[0]._id)) return cb(null,'allowed');
                                return cb(null,'denied');
                            }

                            if(model_name === 'plots') {
                                readObjs('posts',{_id:obj[0].inpost})((err,post) => {

                                    if (err) return cb(new Error(err));
                                    else if(checkObj(post[0].acl[method].deny,user_id)) return cb(null,'denied');
                                    else if(checkObj(post[0].acl[method].allow,user_id)) return cb(null,'allowed');

                                    readObjs('projects',{_id:post[0].inproject})((err,proj) => {

                                        if (err) return cb(new Error(err));
                                        else if(checkObj(proj[0].acl[method].allow,user_id)) return cb(null,'allowed');
                                        else return cb(null,'denied');

                                    });
                                })
                            }

                            else if(checkObj(obj[0].acl[method].deny,user_id)) return cb(null,'denied');
                            else if(checkObj(obj[0].acl[method].allow,user_id)) return cb(null,'allowed');
                            else if(model_name!=='projects') {

                                readObjs('projects',{_id:obj[0].inproject})((err,proj) => {

                                    if (err) return cb(new Error(err));
                                    else if(checkObj(proj[0].acl[method].allow,user_id)) return cb(null,'allowed');
                                    else return cb(null,'denied');

                                })
                            }
                            else return cb(null,'denied');
                        }
                        else return cb(new Error(`Obj id does not exist in the collection: ${model_name} db`));
                    });
                }

                else return cb(new Error(`User id: ${user_id} does not exist in db`));
            })
        }
    };

    let isAllowedCreate = (user_id, method, model_to_create, in_obj_id) => {
        return (cb) => {
            if(method!=='create' || model_to_create === 'users' ) return  cb(new Error('Not supported operation'));
            readObjs('users',{_id:user_id})((err,user) => {

                if (err) return cb(new Error(err));
                if (user.length === 1) {
                    if(model_to_create === 'projects' && !in_obj_id) return cb(null,'allowed');

                    else if(model_to_create === 'posts' || model_to_create === 'datasets') {
                        readObjs('projects', {_id: in_obj_id})((err, proj) => {
                            if (err) return cb(new Error(err));
                            if (proj.length === 1) {
                                if(checkObj(proj[0].acl['create'].allow,user_id)) return cb(null,'allowed');
                                else return cb(null,'denied');
                            }
                            else return cb(new Error(`Obj id is not valid`));
                        });
                    }

                    else if(model_to_create === 'plots') {
                        readObjs('posts', {_id: in_obj_id})((err, post) => {
                            if (err) return cb(new Error(err));

                            if (post.length === 1) {
                                if(checkObj(post[0].acl['create'].allow,user_id)) return cb(null,'allowed');
                                else return cb(null,'denied');
                            }
                            else return cb(new Error(`Obj id is not valid`));
                        });
                    }

                    else return cb(null,'denied');

                }
                else return cb(new Error(`User id: ${user_id} does not exist in db`));
            });
        };
    };


    return {
        addUserRole,removeUserRole,isAllowed,isAllowedCreate,DBops
    }
};
module.exports = permissionConstructor;



