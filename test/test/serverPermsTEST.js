const request = require('supertest');
const agent = request.agent('http://localhost:3000');
let assert= require('assert');
let util = require('util');
let initDB=require('./initDBTEST');
let APIConstructor=require('../../API/index');
let {readObjs}=APIConstructor;
let usersArr=[];
let projectsArr=[];
let postsArr=[];
let datasetsArr=[];

describe('test my simple server', function () {
    this.timeout(3000);

    describe('read all objs and save them', function () {
        it('should int my db', function (done) {
            readObjs('projects', {})((err, projs) => {
                if (err) throw err;
                projectsArr=projs;
                readObjs('users', {})((err, users) => {
                    if (err) throw err;
                    usersArr=users;
                    readObjs('posts', {})((err, posts) => {
                        if (err) throw err;
                        postsArr=posts;
                        readObjs('datasets', {})((err, dsets) => {
                            if (err) throw err;
                            datasetsArr=dsets;
                            done();
                        });
                    });
                });
            });
        })
    });


    describe('test server permissions',function(){
        let credentialsStef = {username: 'stefanos', password: 'stefanos'};
        let credentialsKen = {username: 'ken', password: 'ken'};
        let credentialsFilip = {username: 'filip', password: 'filip'};
        let credentialsKwnna = {username: 'kwnna', password: 'kwnna'};

        it('should login stefanos', function(done) {
            agent
                .post('/login')
                .send(credentialsStef)
                .end(function(err) {
                    if (err) return done(err);
                    done()
                });
        });

        it('should test stef Project owner', function (done) {
            agent
                .get(`/projects/?_id=${projectsArr[0]._id}`)
                .then(function (res) {
                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                    agent
                        .put(`/projects/?_id=${projectsArr[0]._id}`)
                        .then(function (res) {
                            assert.equal(JSON.parse(res.text)['perm'],'allowed');
                            agent
                                .get(`/posts/?_id=${postsArr[0]._id}`)
                                .then(function (res) {
                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                    agent
                                        .delete(`/posts/?_id=${postsArr[0]._id}`)
                                        .then(function (res) {
                                            assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                            agent
                                                .post(`/posts/?_id=${projectsArr[0]._id}`)
                                                .then(function (res) {
                                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                                    agent
                                                        .post(`/plots/?_id=${postsArr[0]._id}`) //because post owner can create plots only
                                                        .then(function (res) {
                                                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                                                            done();
                                                        });
                                                });
                                        });
                                });
                        });
                });
        });

        it('should continue stef',function (done){
            agent
                .post(`/datasets/?_id=${projectsArr[0]._id}`)
                .then(function (res) {
                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                    agent
                        .post(`/projects`)
                        .then(function (res) {
                            assert.equal(JSON.parse(res.text)['perm'],'allowed');
                            agent
                                .get(`/posts/?_id=${postsArr[2]._id}`)
                                .then(function (res) {
                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                    agent
                                        .delete(`/posts/?_id=${postsArr[2]._id}`)
                                        .then(function (res) {
                                            assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                            agent
                                                .get(`/users/?_id=${usersArr[0]._id}`)
                                                .then(function (res) {
                                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                                    agent
                                                        .delete(`/users/?_id=${usersArr[2]._id}`)
                                                        .then(function (res) {
                                                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                                                            agent
                                                                .delete(`/users/?_id=${usersArr[0]._id}`)
                                                                .then(function (res) {
                                                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                                                    done();
                                                                });
                                                        });
                                                });
                                        });
                                });
                        });
                });
        });

        it('should get logout stef',function (done) {
            agent
                .get(`/logout`)
                .expect(function (res) {
                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                })
                .expect(200,done)
        });

        it('should login ken', function(done) {
            agent
                .post('/login')
                .send(credentialsKen)
                .end(function(err) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should test ken Post 1 PARENT owner', function (done) {
            agent
                .get(`/projects/?_id=${projectsArr[0]._id}`)
                .then(function (res) {
                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                    agent
                        .put(`/projects/?_id=${projectsArr[0]._id}`)
                        .then(function (res) {
                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                            agent
                                .get(`/posts/?_id=${postsArr[0]._id}`)
                                .then(function (res) {
                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                    agent
                                        .delete(`/posts/?_id=${postsArr[0]._id}`)
                                        .then(function (res) {
                                            assert.equal(JSON.parse(res.text)['perm'],'allowed'); //owner
                                            agent
                                                .post(`/posts/?_id=${projectsArr[0]._id}`)
                                                .then(function (res) {
                                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                                    agent
                                                        .post(`/plots/?_id=${postsArr[0]._id}`)
                                                        .then(function (res) {
                                                            assert.equal(JSON.parse(res.text)['perm'],'allowed'); //post owner
                                                            done();
                                                        });
                                                });
                                        });
                                });
                        });
                });
        });

        it('should continue ken', function (done) {
            agent
                .post(`/datasets/?_id=${projectsArr[0]._id}`)
                .then(function (res) {
                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                    agent
                        .post(`/projects`)
                        .then(function (res) {
                            assert.equal(JSON.parse(res.text)['perm'],'allowed');
                            agent
                                .get(`/posts/?_id=${postsArr[2]._id}`)
                                .then(function (res) {
                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                    agent
                                        .delete(`/posts/?_id=${postsArr[2]._id}`)
                                        .then(function (res) {
                                            assert.equal(JSON.parse(res.text)['perm'],'denied'); //not owner
                                            agent
                                                .get(`/users/?_id=${usersArr[2]._id}`)
                                                .then(function (res) {
                                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                                    agent
                                                        .put(`/users/?_id=${usersArr[1]._id}`)
                                                        .then(function (res) {
                                                            assert.equal(JSON.parse(res.text)['perm'],'allowed');//same user
                                                            done();
                                                        });
                                                });
                                        });
                                });
                        });
                });
        });

        it('should get logout ken',function (done) {
            agent
                .get(`/logout`)
                .expect(function (res) {
                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                })
                .expect(200,done)
        });

        it('should login filip', function(done) {
            agent
                .post('/login')
                .send(credentialsFilip)
                .end(function(err) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should test filip Post KID 2 owner', function (done) {
            agent
                .get(`/projects/?_id=${projectsArr[0]._id}`)
                .then(function (res) {
                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                    agent
                        .put(`/projects/?_id=${projectsArr[0]._id}`)
                        .then(function (res) {
                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                            agent
                                .get(`/posts/?_id=${postsArr[0]._id}`)
                                .then(function (res) {
                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                    agent
                                        .delete(`/posts/?_id=${postsArr[0]._id}`)
                                        .then(function (res) {
                                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                                            agent
                                                .post(`/posts/?_id=${projectsArr[0]._id}`)
                                                .then(function (res) {
                                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                                    agent
                                                        .post(`/plots/?_id=${postsArr[0]._id}`)
                                                        .then(function (res) {
                                                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                                                            agent
                                                                .post(`/plots/?_id=${postsArr[3]._id}`)
                                                                .then(function (res) {
                                                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                                                    agent
                                                                        .post(`/datasets/?_id=${projectsArr[0]._id}`)
                                                                        .then(function (res) {
                                                                            assert.equal(JSON.parse(res.text)['perm'],'allowed');
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

        it('should continue filip', function (done) {
            agent
                .post(`/projects`)
                .then(function (res) {
                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                    agent
                        .get(`/posts/?_id=${postsArr[2]._id}`)
                        .then(function (res) {
                            assert.equal(JSON.parse(res.text)['perm'],'allowed');
                            agent
                                .delete(`/posts/?_id=${postsArr[2]._id}`)
                                .then(function (res) {
                                    assert.equal(JSON.parse(res.text)['perm'],'denied'); //not onwer
                                    agent
                                        .get(`/posts/?_id=${postsArr[3]._id}`)
                                        .then(function (res) {
                                            assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                            agent
                                                .delete(`/posts/?_id=${postsArr[3]._id}`)
                                                .then(function (res) {
                                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');//owner
                                                    agent
                                                        .get(`/users/?_id=${usersArr[3]._id}`)
                                                        .then(function (res) {
                                                            assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                                            agent
                                                                .delete(`/users/?_id=${usersArr[0]._id}`)
                                                                .then(function (res) {
                                                                    assert.equal(JSON.parse(res.text)['perm'],'denied'); //not same user
                                                                    done();
                                                                });
                                                        });
                                                });
                                        });
                                });
                        });
                });
        });

        it('should get logout filip',function (done) {
            agent
                .get(`/logout`)
                .expect(function (res) {
                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                })
                .expect(200,done)
        });

        it('should login kwnna', function(done) {
            agent
                .post('/login')
                .send(credentialsKwnna)
                .end(function(err) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should read project for kwnna', function (done) {
            agent
                .get(`/projects/?_id=${projectsArr[0]._id}`)
                .then(function (res) {
                    assert.equal(JSON.parse(res.text)['perm'],'denied');
                    agent
                        .put(`/projects/?_id=${projectsArr[0]._id}`)
                        .then(function (res) {
                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                            agent
                                .get(`/posts/?_id=${postsArr[0]._id}`)
                                .then(function (res) {
                                    assert.equal(JSON.parse(res.text)['perm'],'denied');
                                    agent
                                        .delete(`/posts/?_id=${postsArr[0]._id}`)
                                        .then(function (res) {
                                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                                            agent
                                                .post(`/posts/?_id=${projectsArr[0]._id}`)
                                                .then(function (res) {
                                                    assert.equal(JSON.parse(res.text)['perm'],'denied');
                                                    agent
                                                        .post(`/plots/?_id=${postsArr[0]._id}`)
                                                        .then(function (res) {
                                                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                                                            agent
                                                                .post(`/datasets/?_id=${projectsArr[0]._id}`)
                                                                .then(function (res) {
                                                                    assert.equal(JSON.parse(res.text)['perm'],'denied');
                                                                    done()
                                                                });
                                                        });
                                                });
                                        });
                                });
                        });
                });
        });

        it('should continue kwnna', function (done) {
            agent
                .post(`/projects`)
                .then(function (res) {
                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                    agent
                        .get(`/posts/?_id=${postsArr[2]._id}`)
                        .then(function (res) {
                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                            agent
                                .delete(`/posts/?_id=${postsArr[2]._id}`)
                                .then(function (res) {
                                    assert.equal(JSON.parse(res.text)['perm'],'denied');
                                    agent
                                        .get(`/users/?_id=${usersArr[2]._id}`)
                                        .then(function (res) {
                                            assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                            agent
                                                .put(`/users/?_id=${usersArr[3]._id}`)
                                                .then(function (res) {
                                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');//own user
                                                    agent
                                                        .put(`/users/?_id=${usersArr[2]._id}`)
                                                        .then(function (res) {
                                                            assert.equal(JSON.parse(res.text)['perm'],'denied');//not same user
                                                            done();
                                                        });
                                                });
                                        });
                                });
                        });
                });
        });

        it('should get logout kwnna',function (done) {
            agent
                .get(`/logout`)
                .expect(function (res) {
                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                })
                .expect(200,done)
        });
    });

    describe('test asserts', function() {
        let credentialsKen = {username: 'ken', password: 'ken'};
        it('should login ken', function(done) {
            agent
                .post('/login')
                .send(credentialsKen)
                .end(function(err) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should test asserts', function(done) {
            agent
                .get(`/dsfdasfdasf/?_id=${postsArr[2]._id}`)
                .then(function (res) {
                    assert.equal(JSON.parse(res.text)['perm'],'denied');
                    agent
                        .delete(`/gsfdsgsd/asdf/fdsa`)
                        .then(function (res) {
                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                            agent
                                .get(`/dsfdasfdasf/?asdfdsa=${postsArr[2]._id}`)
                                .then(function (res) {
                                    assert.equal(JSON.parse(res.text)['perm'],'denied');
                                    agent
                                        .delete(`/posts/3287423nfnjdsah`)
                                        .then(function (res) {
                                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                                            agent
                                                .delete(`/posts/?_id=3287423nfnjdsah`)
                                                .then(function (res) {
                                                    assert.equal(JSON.parse(res.text)['perm'],'denied');
                                                    agent
                                                        .get(`/posts/plots/projects`)
                                                        .then(function (res) {
                                                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                                                            agent
                                                                .delete(`/posts/?_id=${postsArr[0]._id}/asdfg`)
                                                                .then(function (res) {
                                                                    assert.equal(JSON.parse(res.text)['perm'],'denied');
                                                                    agent
                                                                        .delete(`/posts/?_id="${postsArr[0]._id}"/asdfg`)
                                                                        .then(function (res) {
                                                                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                                                                            agent
                                                                                .post(`/projects/?_id="${postsArr[0]._id}"/asdfg`)
                                                                                .then(function (res) {
                                                                                    assert.equal(JSON.parse(res.text)['perm'],'denied');
                                                                                    agent
                                                                                        .post(`/projects/^&*&12479867`)
                                                                                        .then(function (res) {
                                                                                            assert.equal(JSON.parse(res.text)['perm'],'denied');
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
        });

        it('should get logout ken',function (done) {
            agent
                .get(`/logout`)
                .expect(function (res) {
                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                })
                .expect(200,done)
        });
    });

    describe.skip('test server routes', function() {
        let credentialsKen = {username: 'ken', password: 'ken'};
        it('should login ken', function(done) {
            agent
                .post('/login')
                .send(credentialsKen)
                .end(function(err) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should get /posts/id',function (done) {
            agent
                .get(`/posts/?_id=${postsArr[0]._id}`)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    console.log(res.text);
                })
                .expect(200,done)
        });
        it('should get /users',function (done) {
            agent
                .get(`/users/?_id=${usersArr[1]._id}`)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    console.log(res.text);
                })
                .expect(200,done)
        });

        it('should get /projects',function (done) {
            agent
                .get(`/projects/?_id=${projectsArr[0]._id}`)
                .expect(function (res) {
                    console.log(res.text);
                })
                .expect(200,done)
        });
    });

});
