let assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
let wrapperConstructor = require('./DBOpsConstructor');
let {createObj} = wrapperConstructor();

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

