let assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
let util = require('util');
let DBOpsConstructor = require('./DBOpsConstructor');
let permissionConstructor = require('./permissionConstructor');
let {createObj, readObjs, updateObj, deleteObj, entities} = DBOpsConstructor();
let {addUserRole} = permissionConstructor();

describe('test my API', function () {
    before(function (done) {
        let url = 'mongodb://localhost/daotest';
        MongoClient.connect(url, function (err, db) {
            db.dropDatabase((res) => {
                db.close();
                done();
            });
        });
    });
    describe.skip('test some creations', function () {
        it('should create users projects posts', function (done) {
            for (let i = 0; i < 10; i++) {
                createObj('users', {
                    name: `stefanos${i}`,
                    username: `stefanos${i}`,
                    email: `stefanos${i}`,
                    password: `stefanos${i}`
                })((err, data) => {
                    if (err) throw err;
                    createObj('projects', {
                        name: `some new project${i}`,
                        description: `some new project${i}`
                    })((err, data1) => {
                        if (err) throw err;
                        createObj('posts', {
                            title: `some new post${i}`,
                            description: `some new post${i}`,
                            inproject: data1._id
                        })((err, data2) => {
                            if (err) throw err;
                            createObj('posts', {
                                title: `some new posttt${i}`,
                                description: `some new posttt${i}`,
                                inproject: data1._id,
                                inpost: data2._id
                            })((err, data) => {
                                if (err) throw err;
                                if (i === 9) {
                                    done();
                                }
                            });
                        });
                    });
                });
            }
        });
    });

    describe('test some permissions', function () {
        it('should create permissions', function (done) {
            for (let i = 0; i < 1; i++) {
                createObj('users', {
                    name: `ken${i}`,
                    username: `ken${i}`,
                    email: `ken${i}`,
                    password: `ken${i}`
                })((err, user1) => {
                    if (err) throw err;
                    createObj('users', {
                        name: `ken${i + 1}`,
                        username: `ken${i + 1}`,
                        email: `ken${i + 1}`,
                        password: `ken${i + 1}`
                    })((err, user2) => {
                        if (err) throw err;
                        createObj('projects', {
                            name: `some new project${i}`,
                            description: `some new project${i}`
                        })((err, proj1) => {
                            if (err) throw err;
                            addUserRole(user1._id, user1._id, 'owner', 'projects')((err, proj) => {
                                assert.ok(err instanceof Error);
                                addUserRole(user1._id, proj1._id, 'owner', 'projects')((err, proj) => {
                                    if (err) throw err;
                                    addUserRole(user1._id, proj1._id, 'member', 'projects')((err, proj) => {
                                        assert.ok(err instanceof Error);
                                        addUserRole(user1._id, proj1._id, 'owner', 'projects')((err, proj) => {
                                            assert.ok(err instanceof Error);
                                            addUserRole(user2._id, proj1._id, 'member', 'projects')((err, proj) => {
                                                if (err) throw err;
                                                done();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
        });
    });
});

