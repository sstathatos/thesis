let DBOpsConstructor = (obj) => {
    let {entitiesConstructor,DAOConstructor,schemaConstructor,mongoose}=obj;
    let entities= entitiesConstructor({DAOConstructor,schemaConstructor,mongoose});
    let {users, projects, posts, datasets, plots} = entities;

    let createObj = (model_name, obj) => {
        return (cb) => {
            let model = entities[model_name];
            if (model === users) {
                model.dao.readItems({$or: [{username: obj.username}, {email: obj.email}]}, (err, user) => {
                    if (err) return cb(new Error(err));
                    if (user.length === 0) {
                        model.dao.createItem(obj, cb);
                    }
                    else return cb(new Error(`username: ${obj.username} or mail: ${obj.email} exists`));
                });
            }

            if (model === projects) {
                obj['date'] = new Date();
                model.dao.createItem(obj, cb);
            }

            if (model === posts) {
                obj['date'] = new Date();
                projects.dao.readItems({_id: obj['inproject']}, (err, proj) => {
                    if (err) return cb(new Error(err));
                    if (proj.length === 1) {
                        posts.dao.readItems({_id: obj['inpost']}, (err, post) => {
                            if (err) return cb(new Error(err));
                            if (post.length < 2) {
                                datasets.dao.readItems({_id: obj['dset_link']}, (err, dset) => {
                                    if (err) return cb(new Error(err));
                                    if (dset.length === 1) {
                                        model.dao.createItem(obj, cb);
                                    }
                                    else return cb(new Error('unknown dset id'));
                                });
                            }
                            else return cb(new Error('multiple post ids'));
                        });
                    }
                    else return cb(new Error('unknown project id'));
                });
            }

            if (model === datasets) {
                obj['date'] = new Date();
                projects.dao.readItems({_id: obj['inproject']}, (err, proj) => {
                    if (err) return cb(new Error(err));
                    if (proj.length === 1) {
                        users.dao.readItems({_id: obj['creator']}, (err, user) => {
                            if (err) return cb(new Error(err));
                            if (user.length === 1) model.dao.createItem(obj, cb);
                            else return cb(new Error('unknown user creator id'));
                        });
                    }
                    else return cb(new Error('unknown project id'));
                });
            }

            if (model === plots) {
                posts.dao.readItems({_id: obj['inpost']}, (err, post) => {
                    if (err) return cb(new Error(err));
                    if (post.length === 1) {
                        model.dao.createItem(obj, cb);
                    }
                    else return cb(new Error('unknown post id'));
                });
            }
        };
    };

    let readObjs = (model_name, query) => {
        return (cb) => {
            let model = entities[model_name];
            model.dao.readItems(query, cb);
        }
    };

    let updateObj = (model_name, query, newdata) => {
        return (cb) => {
            let model = entities[model_name];
            model.dao.readItems(query,(err,obj) => {
                if (obj.length===0) return cb(new Error(`There were no results from this query`));
                if (obj.length>1) return cb(new Error(`Query returned multiple objects to update. Cannot update multiple objects.`));
                if (model===users && ((newdata.username!==null && newdata.username!==obj[0].username) || (newdata.email!==null && newdata[0].email!==obj.email))) {
                    model.dao.readItems({$or: [{username: newdata.username}, {email: newdata.email}]}, (err, user) => {
                        if (err) return cb(new Error(err));
                        if (user.length === 0) {
                            model.dao.updateItem(query, newdata, cb);
                        }
                        else return cb(new Error(`New username or email already exists.`));
                    });
                }
                else model.dao.updateItem(query, newdata, cb);
            });
        }
    };

    let deleteObj = (model_name, query) => {
        return (cb) => {
            let model = entities[model_name];
            model.dao.readItems(query, (err, result) => {
                if (err) return cb(new Error(err));
                if (result.length === 1) {
                    model.dao.deleteItem(result, cb);
                }
                else if (result.length >1) cb(new Error('Query returned multiple objects to delete. Cannot delete multiple objects.'));
                else return cb(new Error(`There are no objects with this query`));
            });
        }
    };

    return {
        createObj, readObjs, updateObj, deleteObj, entities
    }
};

module.exports = DBOpsConstructor;

//todo rename ALL THESE files, and name this API.

// let createObjPromise = (model_name,obj) => { return new Promise((resolve,reject) =>{
//     return (createObj(model_name,obj))((err,data) => {
//         if(err) return reject(new Error(err));
//         return resolve(data);
//     })
// }) };
// let creates=[];
// for(let i=0;i<10;i++) {
//     creates.push(wrapper.createObj('users',{name:`stefanos${i}`,username:`stefanos${i}`, email:`stefanos${i}`,password:`stefanos${i}`}))
// }
//
// for(let cr in creates) {
//     console.log(cr);
//     creates[cr]((err,data) => {
//         if (err) throw err;
//         console.log(data);
//     });
// }
// wrapper.createObj('users',{name:'stefanos',username:'stef', email:'stef@stef.com',password:'test'})((err,data)=> {
//     if(err) throw err;
//     wrapper.createObj('users',{name:'mpla',username:'mpla', email:'stef@stef.com',password:'test'})((err,res) => {
//         if(err) throw err;
//         wrapper.createObj('posts',{inpost:'fjsdakjf'})((err,res) => {
//             if(err) throw err;
//         });
//     });
// });
// wrapper
//     .createObjPromise('users',{name:'asdffdsasdf',username:'asdfdsafdsf', email:'stfdfdassef@asdf.com',password:'tesasdft'})
//     .then(() => {wrapper.createObjPromise('users',{name:'ken',username:'ken', email:'ken@ken.com',password:'test'}).catch((e)=> {console.log(e)})})
//     .then(() => {wrapper.createObjPromise('users',{name:'asdffdsasdf',username:'asdfdsafdsf', email:'stfdfdassef@asdf.com',password:'tesasdft'}).catch((e)=> {console.log(e)})})
//     .catch((e)=> {console.log(e)});

// let arr=[
//     wrapper.createObjPromise('users',{name:'asdffdsasdf',username:'asdfdsafdsf', email:'stfdfdassef@asdf.com',password:'tesasdft'}),
//     wrapper.createObjPromise('users',{name:'ken',username:'ken', email:'ken@ken.com',password:'test'}),
//     wrapper.createObjPromise('users',{name:'asdffdsasdf',username:'asdfdsafdsf', email:'stfdfdassef@asdf.com',password:'tesasdft'})
// ];
//
// Promise.all(arr)
//     .then(console.log)
//     .catch(console.log);


