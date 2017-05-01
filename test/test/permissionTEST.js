let assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
let util = require('util');
let DBOpsConstructor = require('../../DBOpsConstructor');
let permissionConstructor = require('../../permissionConstructor');
let {createObj, readObjs, updateObj, deleteObj, entities} = DBOpsConstructor();
let {addUserRole,removeUserRole,isAllowed} = permissionConstructor();

describe('test my PERMISSION OPS', function () {
    this.timeout(0);
    before( (done) => {
        let url = 'mongodb://localhost/daotest';
        MongoClient.connect(url,  (err, db) => {
            db.dropDatabase((res) => {
                db.close();
                done();
            });
        });
    });
    describe('init db',  () => {
        it('should init my db for permission testing',  (done) => {
            createObj('users', {name: `stefanos`, username: `stefanos`, email: `stefanos`, password: `stefanos`})((err, data) => {
                if (err) throw err;
                createObj('users', {name: `ken`, username: `ken`, email: `ken`, password: `ken`})((err, data) => {
                    if (err) throw err;
                    createObj('users', {name: `filip`, username: `filip`, email: `filip`, password: `filip`})((err, user3) => {
                        if (err) throw err;
                        createObj('users', {name: `kwnna`, username: `kwnna`, email: `kwnna`, password: `kwnna`})((err, data) => {
                            if (err) throw err;
                            createObj('projects', {name: `test project name`, description: `test project desc`})((err, proj) => {
                                if (err) throw err;
                                createObj('posts', {title: `test post title`, description: `test post desc`, inproject: proj._id})((err, post) => {
                                    if (err) throw err;
                                    createObj('datasets', {name: `test dataset name`, inproject: proj._id ,creator:user3._id})((err, data) => {
                                        if (err) throw err;
                                        createObj('plots', {title: `test plot name`,description: `test plot desc`, inpost: post._id})((err, data) => {
                                            if (err) throw err;
                                            console.log('1');
                                            done();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    describe('test addUserRole', () => {
        it('should create permissions',  (done) => {
            console.log('2');
            readObjs('users',{})((err,users) => {
                if (err) throw err;
                readObjs('projects',{})((err,projects) => {
                    if (err) throw err;
                    readObjs('posts',{})((err,posts) => {
                        if (err) throw err;
                        addUserRole(users[0]._id, projects[0]._id, 'owner', 'projects')((err, proj) => {
                            if(err) throw err;
                            addUserRole(users[1]._id, projects[0]._id, 'member', 'projects')((err, proj) => {
                                if(err) throw err;
                                addUserRole(users[2]._id, projects[0]._id, 'member', 'projects')((err, proj) => {
                                    if(err) throw err;
                                    addUserRole(users[1]._id, posts[0]._id, 'owner', 'posts')((err, proj) => {
                                        if(err) throw err;
                                        console.log('3');
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        it('should test create asserts',  (done) => {
            console.log('4');
            readObjs('users',{})((err,users) => {
                if (err) throw err;
                readObjs('projects',{})((err,projects) => {
                    if (err) throw err;
                    readObjs('posts',{})((err,posts) => {
                        if (err) throw err;
                        readObjs('plots',{})((err,plots) => {
                            if (err) throw err;
                            addUserRole(users[0]._id, projects[0]._id, 'owner', 'users')((err, proj) => {
                                assert.ok(err instanceof Error);
                                addUserRole(users[1]._id, projects[0]._id, 'member', 'plots')((err, proj) => {
                                    assert.ok(err instanceof Error);
                                    addUserRole(projects[0]._id, projects[0]._id, 'member', 'projects')((err, proj) => {
                                        assert.ok(err instanceof Error);
                                        addUserRole(users[1]._id, users[1]._id, 'member', 'projects')((err, proj) => {
                                            assert.ok(err instanceof Error);
                                            addUserRole(users[1]._id, users[1]._id, 'member', 'projects')((err, proj) => {
                                                assert.ok(err instanceof Error);
                                                addUserRole(users[1]._id, projects[0]._id, 'member', 'projects')((err, proj) => {
                                                    assert.ok(err instanceof Error);
                                                    addUserRole(users[2]._id, projects[0]._id, 'owner', 'projects')((err, proj) => {
                                                        assert.ok(err instanceof Error);
                                                        addUserRole(users[1]._id, projects[0]._id, 'owner', 'projects')((err, proj) => {
                                                            assert.ok(err instanceof Error);
                                                            isAllowed(users[0]._id,projects[0]._id,'read','projects')((err,perm) => {
                                                                console.log(perm);
                                                                isAllowed(users[2]._id,projects[0]._id,'update','projects')((err,perm) => {
                                                                    console.log(perm);
                                                                    isAllowed(users[0]._id,projects[0]._id,'update','projects')((err,perm) => {
                                                                        console.log(perm);
                                                                        isAllowed(users[0]._id,plots[0]._id,'update','plots')((err,perm) => {
                                                                            console.log(perm);
                                                                            done();
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

