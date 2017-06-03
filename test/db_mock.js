let assert = require('assert');
let util = require('util');
let db = {
    users: [],
    projects: [],
    posts: [],
    datasets: [],
    plots: []
};
let roles = {
    owner: {read: true, update: true, delete: true, create: true},
    member: {read: true, update: false, delete: false, create: true}
};
let methods = ['read', 'update', 'delete', 'create'];
let map_allow = {true: 'allow', false: 'deny'};

let id = ~~(Math.random() * (10000 - 1) + 1);
let id_2 = ~~(Math.random() * (10000 - 1) + 1);
let id_3 = ~~(Math.random() * (10000 - 1) + 1);
let id_4 = ~~(Math.random() * (10000 - 1) + 1);
let project_id = ~~(Math.random() * id);
let project_id_2 = ~~(Math.random() * id);
let project_id_3 = ~~(Math.random() * id);
let project_id_4 = ~~(Math.random() * id);
let post_id = ~~(Math.random() * id);
let post_id_2 = ~~(Math.random() * id);
let post_id_3 = ~~(Math.random() * id);
let post_id_4 = ~~(Math.random() * id);
let post_id_5 = ~~(Math.random() * id);
let post_id_6 = ~~(Math.random() * id);
let dataset_id = ~~(Math.random() * id);
let dataset_id_2 = ~~(Math.random() * id);
let dataset_id_4 = ~~(Math.random() * id);
let dataset_id_5 = ~~(Math.random() * id);
let dataset_id_6 = ~~(Math.random() * id);
let plot_id = ~~(Math.random() * id);
let plot_id_2 = ~~(Math.random() * id);
let plot_id_4 = ~~(Math.random() * id);
let plot_id_5 = ~~(Math.random() * id);
let plot_id_6 = ~~(Math.random() * id);
let project_date = new Date();
let post_date = new Date();
let dataset_date = new Date();

/*
 createItem
 */
function createItem(obj, model, id, date, inproj_id, inpost_id) {
    obj['_id'] = id;
    if (inproj_id) assert(db.projects.some((obj) => {
        return obj._id === inproj_id;
    }));
    if (inpost_id) assert(db.posts.some((obj) => {
        return obj._id === inpost_id;
    }));
    if (model === 'users') {
        assert(!db.users.some((user) => {
            return user.username === obj.username;
        }), obj.username + ' exists');
    }
    if (model === 'projects') {
        obj['date'] = date;
        obj['acl'] = {
            read: {allow: [], deny: []},
            update: {allow: [], deny: []},
            create: {allow: [], deny: []},
            delete: {allow: [], deny: []}
        };
    }
    if (model === 'posts') {
        obj['date'] = date;
        obj['inproject'] = inproj_id;
        obj['inpost'] = inpost_id;
        obj['acl'] = {
            read: {allow: [], deny: []},
            update: {allow: [], deny: []},
            create: {allow: [], deny: []},
            delete: {allow: [], deny: []},
        };
    }
    if (model === 'datasets') {
        obj['date'] = date;
        obj['inproject'] = inproj_id;
        obj['acl'] = {
            read: {allow: [], deny: []},
            update: {allow: [], deny: []},
            create: {allow: [], deny: []},
            delete: {allow: [], deny: []}
        };
    }
    if (model === 'plots') {
        obj['inpost'] = inpost_id;
    }

    db[[model]].push(obj);
}

createItem({
    username: 'stef',
    name: 'stefanos',
    password: 'test',
    email: 'stef@stef.com'
}, 'users', id, null, null, null);
createItem({username: 'ken', name: 'ken', password: 'test', email: 'ken@ken.com'}, 'users', id_2);
createItem({username: 'filip', name: 'filip', password: 'test', email: 'filip@filip.com'}, 'users', id_3);

createItem({name: 'new Project', description: 'some new description'}, 'projects', project_id_2, project_date);
createItem({name: 'new Project', description: 'some new description'}, 'projects', project_id, project_date);
createItem({name: 'new Project 3', description: 'some new description 3'}, 'projects', project_id_3, project_date);

createItem({
    title: 'some title post',
    description: 'some new description post'
}, 'posts', post_id, post_date, project_id, null);
createItem({
    title: 'some title post 2',
    description: 'some new description post 2'
}, 'posts', post_id_3, post_date, project_id_2, null);
createItem({
    title: 'some title post 2',
    description: 'some new description post 2'
}, 'posts', post_id_2, post_date, project_id, null);

createItem({
    name: 'some dataset name',
    creator: id,
    path_saved: 'hdf_files/hdf1.h5'
}, 'datasets', dataset_id, dataset_date, project_id, null);
createItem({
    name: 'some dataset name 2',
    creator: id,
    path_saved: 'hdf_files/hdf2.h5'
}, 'datasets', dataset_id_2, dataset_date, project_id, null);

createItem({
        title: 'some plot 2', description: 'some plot description',
        array_path_saved: 'array1', zvalue: 3, plot_type: 'simple',
        xname: 'x', yconf: [{name: 'y1', color: 'blue'}, {name: 'y2', color: 'red'}]
    },
    'plots', plot_id, null, null, post_id);
createItem({
        title: 'some plot 2', description: 'some plot description',
        array_path_saved: 'array1', zvalue: 3, plot_type: 'simple',
        xname: 'x', yconf: [{name: 'y1', color: 'blue'}, {name: 'y2', color: 'red'}]
    },
    'plots', plot_id_2, null, null, post_id_2);

/*
 * readItems
 * */
function readItems(query, model) {
    return db[[model]].filter((obj) => {
        let property = Object.keys(query);
        return obj[[property]] === query[[property]];
    });
}
assert.deepEqual(readItems({_id: project_id}, 'projects'), [{
    _id: project_id,
    name: 'new Project',
    description: 'some new description',
    date: project_date,
    acl: {
        read: {allow: [], deny: []},
        update: {allow: [], deny: []},
        create: {allow: [], deny: []},
        delete: {allow: [], deny: []},
    }
}], 'should be equal');
assert.deepEqual(readItems({_id: project_id_2}, 'projects'), [{
    _id: project_id_2,
    name: 'new Project',
    description: 'some new description',
    date: project_date,
    acl: {
        read: {allow: [,], deny: []},
        update: {allow: [], deny: []},
        create: {allow: [,], deny: []},
        delete: {allow: [], deny: []},
    }
}], 'should be equal');
assert.deepEqual(readItems({email: 'ken@ken.com'}, 'users'), [{
    _id: id_2,
    username: 'ken',
    name: 'ken',
    password: 'test',
    email: 'ken@ken.com'
}], 'should be equal');
assert.deepEqual(readItems({email: 'stef@stef.com'}, 'users'), [{
    _id: id,
    username: 'stef',
    name: 'stefanos',
    password: 'test',
    email: 'stef@stef.com'
}], 'should be equal');

// console.log('THESE ARE MY READ OBJECTS:');
// console.log(util.inspect(readItems({_id:post_id},'posts'), false, null));
// console.log(util.inspect(readItems({inproject:project_id},'posts'), false, null));
// console.log(util.inspect(readItems({inproject:project_id_2},'posts'), false, null));
// console.log(util.inspect(readItems({_id:dataset_id},'datasets'), false, null));
// console.log(util.inspect(readItems({inproject:project_id},'datasets'), false, null));
// console.log(util.inspect(readItems({inproject:project_id_2},'datasets'), false, null));
// console.log(util.inspect(readItems({_id:plot_id},'plots'), false, null));
// console.log(util.inspect(readItems({inpost:post_id},'plots'), false, null));
// console.log(util.inspect(readItems({inpost:post_id_2},'plots'), false, null));


/*
 * Update Item
 * */
function updateItem(id, new_data, model) {
    let res = db[[model]].filter((obj) => {
        return obj._id === id;
    })[0];
    for (let prop in new_data) {
        assert.notDeepEqual(res[[prop]], undefined, 'new data property does not exist in user');
        res[[prop]] = new_data[[prop]];
    }
    return res;
}

assert.throws(function () {
    updateItem(id, {namefdhjask: 'manwlis'}, 'users')
});
assert.deepEqual(updateItem(id, {name: 'stefanos'}, 'users'), {
    _id: id,
    username: 'stef',
    name: 'stefanos',
    password: 'test',
    email: 'stef@stef.com'
}, 'should be equal');

assert.throws(function () {
    updateItem(id, {descritfdhjask: 'manwlis'}, 'projects')
});
//console.log(util.inspect(updateProject(project_id,{description:'some new description'}), false, null));
assert.deepEqual(updateItem(project_id, {description: 'some new description'}, 'projects'), {
    _id: project_id,
    name: 'new Project',
    description: 'some new description',
    date: project_date,
    acl: {
        read: {allow: [], deny: []},
        update: {allow: [], deny: []},
        create: {allow: [], deny: []},
        delete: {allow: [], deny: []},
    }
}, 'should be equal');

/*
 * Delete Item
 * */
function deleteItem(id, model) {
    assert(db[[model]].some((obj) => {
        return obj._id === id;
    }), "item id doesnt exist");
    let res = db[[model]].filter(obj => obj._id !== id);
    db[[model]] = res;
}
deleteItem(project_id, "projects");
assert.deepEqual(readItems({_id: project_id}, 'projects'), []);
deleteItem(id, 'users');
assert.deepEqual(readItems({_id: id}, 'users'), []);

createItem({username: 'stef', name: 'stefanos', password: 'test', email: 'stef@stef.com'}, 'users', id);
createItem({name: 'new Project', description: 'some new description'}, 'projects', project_id, project_date);

deleteItem(project_id_2, 'projects');
assert.deepEqual(readItems({_id: project_id_2}, 'projects'), []);
deleteItem(post_id, 'posts');
assert.deepEqual(readItems({_id: post_id}, 'posts'), []);
deleteItem(post_id_2, 'posts');
assert.deepEqual(readItems({_id: post_id_2}, 'posts'), []);
deleteItem(dataset_id, 'datasets');
assert.deepEqual(readItems({_id: dataset_id}, 'datasets'), []);
deleteItem(dataset_id_2, 'datasets');
assert.deepEqual(readItems({_id: dataset_id_2}, 'datasets'), []);
deleteItem(plot_id, 'plots');
assert.deepEqual(readItems({_id: plot_id}, 'plots'), []);
deleteItem(plot_id_2, 'plots');
assert.deepEqual(readItems({_id: plot_id_2}, 'plots'), []);

//create again the deleted items
createItem({name: 'new Project', description: 'some new description'}, 'projects', project_id_2, project_date);
createItem({
    title: 'some title post',
    description: 'some new description post'
}, 'posts', post_id, post_date, project_id, null);
createItem({
    title: 'some title post 2',
    description: 'some new description post 2'
}, 'posts', post_id_2, post_date, project_id, null);
createItem({
    name: 'some dataset name',
    creator: id,
    path_saved: 'hdf_files/hdf1.h5'
}, 'datasets', dataset_id, dataset_date, project_id, null);
createItem({
    name: 'some dataset name 2',
    creator: id,
    path_saved: 'hdf_files/hdf2.h5'
}, 'datasets', dataset_id_2, dataset_date, project_id, null);
createItem({
        title: 'some plot 2', description: 'some plot description',
        array_path_saved: 'array1', zvalue: 3, plot_type: 'simple',
        xname: 'x', yconf: [{name: 'y1', color: 'blue'}, {name: 'y2', color: 'red'}]
    },
    'plots', plot_id, null, null, post_id);
createItem({
        title: 'some plot 2', description: 'some plot description',
        array_path_saved: 'array1', zvalue: 3, plot_type: 'simple',
        xname: 'x', yconf: [{name: 'y1', color: 'blue'}, {name: 'y2', color: 'red'}]
    },
    'plots', plot_id_2, null, null, post_id_2);


// PERMISSIONS==========================================================================================================

/*
 * add User a role in a specific resource
 * */
function addUserRoleForResource(user_id, obj_id, role, model) {
    assert(db.users.some((obj) => {
        return obj._id === user_id;
    })); //check if user exists in get_user_profile
    assert(db[[model]].some((obj) => {
        return obj._id === obj_id;
    }));//same for project
    let role_methods = roles[[role]];
    for (let method in role_methods) {
        assert(!db[[model]].filter((obj) => {
            return obj._id === obj_id
        })[0].acl[method][map_allow[role_methods[method]]].includes(user_id), 'already in db');
        db[[model]].filter((obj) => {
            return obj._id === obj_id
        })[0].acl[method][map_allow[role_methods[method]]].push(user_id);
    }
}
addUserRoleForResource(id, project_id, 'member', 'projects');
addUserRoleForResource(id_3, project_id, 'member', 'projects');
addUserRoleForResource(id_2, project_id, 'owner', 'projects');
assert.throws(function () {
    addUserRoleForResource(id, project_id, 'owner', 'projects');
});
assert.throws(function () {
    addUserRoleForResource(id, project_id, 'member', 'projects');
});
addUserRoleForResource(id, project_id_2, 'member', 'projects');
addUserRoleForResource(id_3, project_id_2, 'member', 'projects');
addUserRoleForResource(id_2, project_id_2, 'owner', 'projects');
assert.throws(function () {
    addUserRoleForResource(id, project_id_2, 'member', 'projects')
});
assert.throws(function () {
    addUserRoleForResource(id_3, project_id_2, 'member', 'projects')
});
assert.throws(function () {
    addUserRoleForResource(id_2, project_id_2, 'owner', 'projects')
});
addUserRoleForResource(id_2, post_id, 'owner', 'posts');
addUserRoleForResource(id, post_id, 'member', 'posts');
addUserRoleForResource(id_3, post_id, 'member', 'posts');
assert.throws(function () {
    addUserRoleForResource(id_2, post_id, 'owner', 'posts');
});
addUserRoleForResource(id_2, dataset_id, 'owner', 'datasets');
addUserRoleForResource(id, dataset_id, 'member', 'datasets');
addUserRoleForResource(id_3, dataset_id, 'member', 'datasets');
assert.throws(function () {
    addUserRoleForResource(id_2, dataset_id, 'owner', 'datasets');
});

console.log('THESE ARE MY USERS');
console.log(util.inspect(db.users, false, null));
console.log('THESE ARE MY PROJECTS WITH PERMISSIONS:');
console.log(util.inspect(db.projects, false, null));
console.log('THESE ARE MY POSTS WITH PERMISSIONS:');
console.log(util.inspect(db.posts, false, null));
console.log('THESE ARE MY DATASETS WITH PERMISSIONS:');
console.log(util.inspect(db.datasets, false, null));
console.log('THESE ARE MY PLOTS:');
console.log(util.inspect(db.plots, false, null));

/*
 * remove User a role from specific resource
 * */
function removeUserRolefromResource(user_id, obj_id, role, model) {
    assert(db.users.some((obj) => {
        return obj._id === user_id;
    })); //check if user exists in get_user_profile
    assert(db[[model]].some((obj) => {
        return obj._id === obj_id;
    }));//same for project
    let role_methods = roles[[role]];

    for (let method in role_methods) {
        let path = db[[model]].filter((obj) => {
            return obj._id === obj_id
        })[0].acl[method][map_allow[role_methods[method]]];
        db[[model]].filter((obj) => {
            return obj._id === obj_id
        })[0].acl[method][map_allow[role_methods[method]]] = path.filter(obj => obj !== user_id);
    }
}
removeUserRolefromResource(id_2, project_id, 'owner', 'projects');
removeUserRolefromResource(id_3, project_id, 'member', 'projects');
removeUserRolefromResource(id, project_id_2, 'member', 'projects');
removeUserRolefromResource(id, post_id, 'member', 'posts');
removeUserRolefromResource(id_3, post_id, 'member', 'posts');
removeUserRolefromResource(id_2, dataset_id, 'owner', 'datasets');
removeUserRolefromResource(id, dataset_id, 'member', 'datasets');
removeUserRolefromResource(id_3, dataset_id, 'member', 'datasets');

console.log('THESE ARE MY PROJECTS AFTER WE DELETED USERS:');
console.log(util.inspect(db.projects, false, null));
console.log('THESE ARE MY POSTS AFTER WE DELETED USERS:');
console.log(util.inspect(db.posts, false, null));
console.log('THESE ARE MY DATASETS AFTER WE DELETED USERS:');
console.log(util.inspect(db.datasets, false, null));

/*
 * is allowed
 * works for everything after /get_create_project and not create
 * */
function isAllowed(user_id, obj_id, model, method) {
    assert(db.users.some((obj) => {
        return obj._id === user_id;
    })); //check if user exists in get_user_profile
    assert(methods.includes(method));
    assert(db[[model]].some((obj) => {
        return obj._id === obj_id;
    }));//same for project
    let check;
    if (model === 'plots') {
        let parent_post_id = db['plots'].filter((obj) => {
            return obj._id === obj_id
        })[0]['inpost'];
        check = db['posts'].filter((obj) => {
            return obj._id === parent_post_id
        })[0];
    }
    else {
        check = db[[model]].filter((obj) => {
            return obj._id === obj_id
        })[0];
    }

    assert(!check.acl[method].deny.includes(user_id), 'access DENIED');
    if (check.acl[method].allow.includes(user_id)) {
        return 'allowed';
    }
    else if (!(model === 'projects') && db.projects.filter((obj) => {
            return obj._id === check['inproject']
        })[0].acl[[method]].allow.includes(user_id)) {
        return 'allowed';
    }
    return 'denied';
}

createItem({username: 'tesss', name: 'tesst', password: 'test', email: 'teeeest@stef.com'}, 'users', id_4);
createItem({
    name: 'is allowed test project',
    description: 'some new description'
}, 'projects', project_id_4, project_date);
addUserRoleForResource(id, project_id_4, 'owner', 'projects');
addUserRoleForResource(id_2, project_id_4, 'member', 'projects');
addUserRoleForResource(id_3, project_id_4, 'member', 'projects');

createItem({
    title: 'is allowed test post1',
    description: 'some new description post'
}, 'posts', post_id_4, post_date, project_id_4, null);
createItem({
    title: 'is allowed test post2',
    description: 'some new description post'
}, 'posts', post_id_5, post_date, project_id_4, null);
createItem({
    title: 'is allowed test post3',
    description: 'some new description post'
}, 'posts', post_id_6, post_date, project_id_4, null);
addUserRoleForResource(id, post_id_4, 'owner', 'posts');
addUserRoleForResource(id_2, post_id_5, 'owner', 'posts');
addUserRoleForResource(id_3, post_id_6, 'owner', 'posts');
createItem({
    name: 'is allowed test dset1',
    creator: id,
    path_saved: 'hdf_files/hdf4.h5'
}, 'datasets', dataset_id_4, dataset_date, project_id_4, null);
createItem({
    name: 'is allowed test dset2',
    creator: id_2,
    path_saved: 'hdf_files/hdf5.h5'
}, 'datasets', dataset_id_5, dataset_date, project_id_4, null);
createItem({
    name: 'is allowed test dset3',
    creator: id_3,
    path_saved: 'hdf_files/hdf6.h5'
}, 'datasets', dataset_id_6, dataset_date, project_id_4, null);
addUserRoleForResource(id, dataset_id_4, 'owner', 'datasets');
addUserRoleForResource(id_2, dataset_id_5, 'owner', 'datasets');
addUserRoleForResource(id_3, dataset_id_6, 'owner', 'datasets');
createItem({
        title: 'is allowed test plot1', description: 'some plot description',
        array_path_saved: 'array1', zvalue: 3, plot_type: 'simple',
        xname: 'x', yconf: [{name: 'y1', color: 'blue'}, {name: 'y2', color: 'red'}]
    },
    'plots', plot_id_4, null, null, post_id_4);
createItem({
        title: 'is allowed test plot2', description: 'some plot description',
        array_path_saved: 'array1', zvalue: 3, plot_type: 'simple',
        xname: 'x', yconf: [{name: 'y1', color: 'blue'}, {name: 'y2', color: 'red'}]
    },
    'plots', plot_id_5, null, null, post_id_5);
createItem({
        title: 'is allowed test plot3', description: 'some plot description',
        array_path_saved: 'array1', zvalue: 3, plot_type: 'simple',
        xname: 'x', yconf: [{name: 'y1', color: 'blue'}, {name: 'y2', color: 'red'}]
    },
    'plots', plot_id_6, null, null, post_id_6);
console.log('id is ' + id);
console.log('id_2 is ' + id_2);
console.log('id_3 is ' + id_3);
console.log(util.inspect(readItems({_id: project_id_4}, 'projects'), false, null));


assert.deepEqual(isAllowed(id, project_id_4, 'projects', 'read'), 'allowed');
assert.deepEqual(isAllowed(id_2, project_id_4, 'projects', 'read'), 'allowed');
assert.deepEqual(isAllowed(id_3, project_id_4, 'projects', 'read'), 'allowed');
assert.deepEqual(isAllowed(id_4, project_id_4, 'projects', 'read'), 'denied'); //not a member

assert.deepEqual(isAllowed(id, project_id_4, 'projects', 'update'), 'allowed');
assert.throws(function () {
    isAllowed(id_2, project_id_4, 'projects', 'update');
});
assert.throws(function () {
    isAllowed(id_3, project_id_4, 'projects', 'update');
});

assert.deepEqual(isAllowed(id, post_id_4, 'posts', 'read'), 'allowed');
assert.deepEqual(isAllowed(id_2, post_id_4, 'posts', 'read'), 'allowed');
assert.deepEqual(isAllowed(id_3, post_id_4, 'posts', 'read'), 'allowed');

assert.deepEqual(isAllowed(id, post_id_4, 'posts', 'update'), 'allowed');//project owner post owner
assert.deepEqual(isAllowed(id_2, post_id_4, 'posts', 'update'), 'denied');
assert.deepEqual(isAllowed(id_2, post_id_5, 'posts', 'update'), 'allowed');//post owner
assert.deepEqual(isAllowed(id_3, post_id_4, 'posts', 'update'), 'denied');

assert.deepEqual(isAllowed(id, dataset_id_4, 'datasets', 'read'), 'allowed');//project owner
assert.deepEqual(isAllowed(id_2, dataset_id_4, 'datasets', 'read'), 'allowed');//post owner
assert.deepEqual(isAllowed(id_3, dataset_id_4, 'datasets', 'read'), 'allowed');

assert.deepEqual(isAllowed(id, dataset_id_4, 'datasets', 'update'), 'allowed');//project owner
assert.deepEqual(isAllowed(id_2, dataset_id_4, 'datasets', 'update'), 'denied');//post owner
assert.deepEqual(isAllowed(id_3, dataset_id_4, 'datasets', 'update'), 'denied');

assert.deepEqual(isAllowed(id_4, dataset_id_4, 'datasets', 'read'), 'denied');
assert.deepEqual(isAllowed(id_2, dataset_id_5, 'datasets', 'update'), 'allowed');
assert.deepEqual(isAllowed(id_4, dataset_id_5, 'datasets', 'update'), 'denied');
assert.deepEqual(isAllowed(id_4, dataset_id_5, 'datasets', 'read'), 'denied');

assert.deepEqual(isAllowed(id, plot_id_4, 'plots', 'read'), 'allowed');
assert.deepEqual(isAllowed(id_2, plot_id_4, 'plots', 'read'), 'allowed');
assert.deepEqual(isAllowed(id_3, plot_id_4, 'plots', 'read'), 'allowed');
assert.deepEqual(isAllowed(id_4, plot_id_4, 'plots', 'read'), 'denied');

assert.deepEqual(isAllowed(id, plot_id_4, 'plots', 'update'), 'allowed');
assert.deepEqual(isAllowed(id_3, plot_id_4, 'plots', 'update'), 'denied');
assert.deepEqual(isAllowed(id_4, plot_id_4, 'plots', 'update'), 'denied');

assert.deepEqual(isAllowed(id, plot_id_5, 'plots', 'update'), 'allowed');
assert.deepEqual(isAllowed(id_2, plot_id_5, 'plots', 'update'), 'allowed');
assert.deepEqual(isAllowed(id_3, plot_id_5, 'plots', 'update'), 'denied');
assert.deepEqual(isAllowed(id, plot_id_6, 'plots', 'update'), 'allowed');
assert.deepEqual(isAllowed(id_2, plot_id_6, 'plots', 'update'), 'denied');
assert.deepEqual(isAllowed(id_3, plot_id_6, 'plots', 'update'), 'allowed');

assert.deepEqual(isAllowed(id, plot_id_5, 'plots', 'update'), 'allowed');
assert.deepEqual(isAllowed(id, plot_id_5, 'plots', 'update'), 'allowed');
assert.deepEqual(isAllowed(id_4, plot_id_5, 'plots', 'update'), 'denied');
assert.deepEqual(isAllowed(id_3, plot_id_6, 'plots', 'update'), 'allowed');
assert.deepEqual(isAllowed(id_2, plot_id_6, 'plots', 'update'), 'denied');

assert.deepEqual(isAllowed(id_2, plot_id_5, 'plots', 'delete'), 'allowed');
assert.deepEqual(isAllowed(id_2, plot_id_6, 'plots', 'delete'), 'denied');
assert.deepEqual(isAllowed(id, plot_id_6, 'plots', 'delete'), 'allowed');

/*
 * get project permissions for ANY user and project id
 * */
function getProjectPermissionsForUser(user_id, project_id) {
    let data = {};
    assert(db.users.some((obj) => {
        return obj._id === user_id;
    })); //check if user exists in get_user_profile
    assert(db.projects.some((obj) => {
        return obj._id === project_id;
    }));//same for project
    for (let method in methods) {
        data[methods[method]] = db.projects.filter((obj) => {
            return obj._id === project_id
        })[0].acl[methods[method]].allow.includes(user_id);
    }
    return data;
}
console.log(getProjectPermissionsForUser(id_2, project_id_2));
console.log(getProjectPermissionsForUser(id, project_id_2));
console.log(getProjectPermissionsForUser(id, project_id));
console.log(getProjectPermissionsForUser(id_2, project_id));

// { read: true, update: true, delete: true, create: true }
// { read: true, update: false, delete: false, create: true }
// { read: true, update: false, delete: false, create: true }
// { read: false, update: false, delete: false, create: false }


//
//
//
// /*
//  * get All get_user_profile with a specific role in a specific project
//  * */
// function getRoleUsersOfProject(project_id,role) {
//     assert(db.get_create_project.some((obj)=> {return obj._id===project_id;}));//same for project
//     let role_methods=roles[[role]];
//     let get_user_profile=[];
//     let cnt=0;
//     for(let method in role_methods) {
//         if(cnt===0){
//             get_user_profile=db.get_create_project.filter((obj) => {return obj._id===project_id})[0].acl[[method]][map_allow[role_methods[method]]];
//         }
//         else {
//             let perm_users=db.get_create_project.filter((obj) => {return obj._id===project_id})[0].acl[[method]][map_allow[role_methods[method]]];
//             for(let puser in get_user_profile){
//                 if (!perm_users.includes(get_user_profile[puser])) {
//                     get_user_profile=get_user_profile.filter(obj=> obj!==get_user_profile[puser]);
//                 }
//             }
//         }
//         cnt++;
//     }
//     return get_user_profile;
// }
// // console.log(getRoleUsersOfProject(project_id,'member'));
// // console.log(getRoleUsersOfProject(project_id,'owner'));
// // console.log(getRoleUsersOfProject(project_id_2,'member'));
// // console.log(getRoleUsersOfProject(project_id_2,'owner'));
//
// //[ 493 ]
// //[]
// //[ 493, 715 ]
// //[ 234 ]
//
//
// //THESE ARE LISTVIEWS,
//
// /*
//  * Get all get_create_project of a specific user
//  * */
// function getAllProjectsForUser(user_id) {
//     assert(db.get_user_profile.some((obj)=> {return obj._id===user_id;})); //check if user exists in get_user_profile
//     let data=[];
//     for(let proj in db.get_create_project) {
//         if(db.get_create_project[proj].acl['read'].allow.includes(user_id)) {
//             data.push(db.get_create_project[proj]);
//         }
//     }
//     return data;
// }
// // console.log(id);
// // console.log(util.inspect(getAllProjectsForUser(id), false, null));
// // console.log(id_2);
// // console.log(util.inspect(getAllProjectsForUser(id_2), false, null));
//
// /*
//  *Get all posts of a specific project for a specific user
//  * */
// function getAllPostsForUser(project_id,user_id) {
//     assert(db.get_user_profile.some((obj)=> {return obj._id===user_id;})); //check if user exists in get_user_profile
//     assert(db.get_create_project.some((obj)=> {return obj._id===project_id;}));//same for project
//     console.log(db.posts.filter((obj)=>{return obj['inproject']===project_id;}));
// }
// // getAllPostsForUser(project_id,id);
