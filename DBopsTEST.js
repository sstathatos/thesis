let assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
let util = require('util');
let DBOpsConstructor = require('./DBOpsConstructor');
let {createObj, readObjs, updateObj, deleteObj} = DBOpsConstructor();

describe('test my DB CRUD OPERATIONS', function () {
    before(function (done) {
        let url = 'mongodb://localhost/daotest';
        MongoClient.connect(url, function (err, db) {
            db.dropDatabase(() => {
                db.close();
                done();
            });
        });
    });

    describe('test CREATE', function () {
        it('should create users', function (done) {
            for (let i = 0; i < 10; i++) {
                createObj('users', {
                    name: `stefanos${i}`,
                    username: `stefanos${i}`,
                    email: `stefanos${i}`,
                    password: `stefanos${i}`
                })((err, data) => {
                    if (err) throw err;
                    createObj('users', {
                        name: `stefanos${i}`,
                        username: `stefanos${i}`,
                        email: `stefanos${i}`,
                        password: `stefanos${i}`
                    })((err, data) => {
                        assert.ok(err instanceof Error);
                        createObj('users', {
                            name: `ken${i}`,
                            username: `ken${i}`,
                            email: `ken${i}`,
                            password: `ken${i}`
                        })((err, data) => {
                            if (err) throw err;
                            if (i === 9) {
                                console.log('first');
                                done();
                            }
                        });
                    });
                });
            }
        });
        it('should create projects', function (done) {
            for (let i = 0; i < 10; i++) {
                if (i === 0) console.log('second');
                createObj('projects', {name: `project stefanos`, description: `project stefanos${i}`})((err, data) => {
                    if (err) throw err;
                    createObj('projects', {name: `project ken${i}`, description: `project ken${i}`})((err, data) => {
                        if (err) throw err;
                        if (i === 9) {
                            console.log('third');
                            done();
                        }
                    });
                });
            }
        });
        it('should create posts without inpost', function (done) {
            readObjs('projects', {name: 'project stefanos'})((err, projs) => {
                for (let i = 0; i < projs.length / 2; i++) {
                    if (i === 0) console.log('fourth');
                    createObj('posts', {
                        title: `post stefanos${i}`,
                        description: `post stefanos${i}`,
                        inproject: projs[i]._id
                    })((err, data) => {
                        if (err) throw err;
                        createObj('posts', {title: `stefanos${i}`, description: `stefanos${i}`})((err, data) => {
                            assert.ok(err instanceof Error);
                            createObj('posts', {
                                title: `post ken${i}`,
                                description: `post ken${i}`,
                                inproject: projs[i]._id
                            })((err, data) => {
                                if (err) throw err;
                                if (i === 4) {
                                    console.log('fifth');
                                    done();
                                }
                            });
                        });
                    });
                }
            });
        });
        it('should create posts with inpost', function (done) {
            readObjs('projects', {name: 'project stefanos'})((err, projs) => {
                for (let i = 0; i < projs.length / 2; i++) {
                    if (i === 0) console.log('fourth');
                    createObj('posts', {
                        title: `post stefanos${i}`,
                        description: `post stefanos${i}`,
                        inproject: projs[i]._id
                    })((err, data) => {
                        if (err) throw err;
                        createObj('posts', {title: `stefanos${i}`, description: `stefanos${i}`})((err, data) => {
                            assert.ok(err instanceof Error);
                            createObj('posts', {
                                title: `post ken${i}`,
                                description: `post ken${i}`,
                                inproject: projs[i]._id
                            })((err, data) => {
                                if (err) throw err;
                                if (i === 4) {
                                    console.log('fifth');
                                    done();
                                }
                            });
                        });
                    });
                }
            });
        });
    });
});
