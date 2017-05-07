const request = require('supertest');
const agent = request.agent('http://localhost:3000');
let assert= require('assert');
const MongoClient = require('mongodb').MongoClient;
let util = require('util');
let APIConstructor=require('../../API/index');
let {createObj, readObjs,addUserRole}=APIConstructor;
let usersArr=[];
let projectsArr=[];
let postsArr=[];
let datasetsArr=[];

describe('test my simple server', function () {
    this.timeout(3000);

    before(function (done) {
        let url = 'mongodb://localhost/daotest';
        MongoClient.connect(url, function (err, db) {
            if (err) throw new Error(err);
            db.dropDatabase((err) => {
                if (err) throw new Error(err);
                db.close();
                done();
            });
        });
    });

    describe('init my db', function () {
        it('should create users', function (done) {
            createObj('users', {name: `stefanos`, username: `stefanos`, email: `stefanos`, password: `stefanos`})((err, data) => {
                if (err) throw err;
                usersArr[0]=data;
                createObj('users', {name: `ken`, username: `ken`, email: `ken`, password: `ken`})((err, data) => {
                    if (err) throw err;
                    usersArr[1]=data;
                    createObj('users', {name: `filip`, username: `filip`, email: `filip`, password: `filip`})((err, data) => {
                        if (err) throw err;
                        usersArr[2]=data;
                        createObj('users', {name: `kwnna`, username: `kwnna`, email: `kwnna`, password: `kwnna`})((err, data) => {
                            if (err) throw err;
                            usersArr[3]=data;
                            done();
                        });
                    });
                });
            });
        });

        it('should create projects', function (done) {
            createObj('projects', {name: `project test`, description: `project test`})((err, proj) => {
                if (err) throw err;
                projectsArr[0]=proj;
                readObjs('users', {})((err, users) => {
                    if (err) throw err;
                    addUserRole(users[0]._id,proj._id,'owner','projects')((err) => {
                        if (err) throw err;
                        addUserRole(users[1]._id,proj._id,'member','projects')((err) => {
                            if (err) throw err;
                            addUserRole(users[2]._id,proj._id,'member','projects')((err) => {
                                if (err) throw err;
                                done();
                            })
                        })
                    })
                });
            });
        });

        //must add owner permissions to check
        it('should create datasets', function (done) {
            readObjs('projects', {})((err, projs) => {
                if (err) throw err;
                readObjs('users', {})((err, users) => {
                    if (err) throw err;
                    createObj('datasets', {name: `dataset 1`,path_saved:`hdf_files/hdf.h5`, creator:users[0]._id, inproject: projs[0]._id})((err, dset1) => {
                        if (err) throw err;
                        datasetsArr[0]=dset1;
                        createObj('datasets', {name: `dataset 2`,path_saved:`hdf_files/hdf.h5`, creator:users[1]._id, inproject: projs[0]._id})((err, dset2) => {
                            if (err) throw err;
                            datasetsArr[1]=dset2;
                            done();
                        });
                    });
                });
            });
        });

        it('should create 2 posts', function (done) {
            readObjs('datasets', {})((err, dsets) => {
                if (err) throw err;
                readObjs('users', {})((err, users) => {
                    if (err) throw err;
                    readObjs('projects', {})((err, projs) => {
                        if (err) throw err;
                        createObj('posts', {title: `post PARENT 1`, description: `post PARENT 1`, inproject: projs[0]._id,dset_link:dsets[0]._id})((err, post1) => {
                            if (err) throw err;
                            postsArr[0]=post1;
                            createObj('posts', {title: `post KID 1`, description: `post KID 1`,inpost:post1._id ,inproject: projs[0]._id,dset_link:dsets[1]._id})((err, data) => {
                                if (err) throw err;
                                postsArr[1]=data;
                                createObj('posts', {title: `post PARENT 2`, description: `post PARENT 2`, inproject: projs[0]._id,dset_link:dsets[1]._id})((err, post2) => {
                                    if (err) throw err;
                                    postsArr[2]=post2;
                                    createObj('posts', {title: `post KID 2`, description: `post KID 2`,inpost:post2._id ,inproject: projs[0]._id,dset_link:dsets[0]._id})((err, post4) => {
                                        if (err) throw err;
                                        postsArr[3]=post4;
                                        addUserRole(users[1]._id,post1._id,'owner','posts')((err) => {
                                            if (err) throw err;
                                            addUserRole(users[2]._id,post4._id,'owner','posts')((err) => {
                                                if (err) throw err;
                                                done();
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

        it('should create plots', function (done) {
            readObjs('posts', {})((err, posts) => {
                if (err) throw err;
                for (let i = 0; i < posts.length; i++) {
                    createObj('plots', {title: `plot ${i}`, description: `plot ${i}`, inpost: posts[i]._id,array_path_saved:`array${i}`,
                        plot_metadata: {
                            x_axis_name: `x_axis${i}`,
                            y_axis_name: `y_axis${i}`,
                            y: [{name: `f(x1) ${i}`, color: 'red'},{name: `f(x2) ${i}`, color: 'blue'}],
                            dimension_name_x: `dim0 ${i}`,
                            dimension_name_y: `dim1 ${i}`,
                            plot_type: `simple${i}`
                        }
                    })((err, plot) => {
                        if (err) throw err;
                        createObj('plots', {title: `plot ${i}`, description: `plot ${i}`, inpost: posts[i]._id,array_path_saved:`array${i}`,
                            plot_metadata: {
                                x_axis_name: `x_axis${i}`,
                                y_axis_name: `y_axis${i}`,
                                y: [{name: `f(x1) ${i}`, color: 'red'},{name: `f(x2) ${i}`, color: 'blue'}],
                                dimension_name_x: `dim0 ${i}`,
                                dimension_name_y: `dim1 ${i}`,
                                plot_type: `simple${i}`
                            }
                        })((err) => {
                            if (err) throw err;
                            if (i === posts.length-1) {
                                done();
                            }
                        });
                    });
                }
            });
        });
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
                                                        .post(`/plots/?_id=${postsArr[0]._id}`)
                                                        .then(function (res) {
                                                            assert.equal(JSON.parse(res.text)['perm'],'denied');
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
                                            assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                            agent
                                                .post(`/posts/?_id=${projectsArr[0]._id}`)
                                                .then(function (res) {
                                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                                    agent
                                                        .post(`/plots/?_id=${postsArr[0]._id}`)
                                                        .then(function (res) {
                                                            assert.equal(JSON.parse(res.text)['perm'],'allowed');
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
                                                                                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                                                                                            agent
                                                                                                .get(`/posts/?_id=${postsArr[2]._id}`)
                                                                                                .then(function (res) {
                                                                                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                                                                                    agent
                                                                                                        .delete(`/posts/?_id=${postsArr[2]._id}`)
                                                                                                        .then(function (res) {
                                                                                                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                                                                                                            agent
                                                                                                                .get(`/users/?_id=${usersArr[2]._id}`)
                                                                                                                .then(function (res) {
                                                                                                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                                                                                                    agent
                                                                                                                        .put(`/users/?_id=${usersArr[1]._id}`)
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
                                                });
                                        });
                                });
                        });
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
                                        .delete(`/ahfjdshafhdjsahj/3287423nfnjdsah`)
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
                                                                    done();
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
                                                                                            assert.equal(JSON.parse(res.text)['perm'],'denied');
                                                                                            agent
                                                                                                .get(`/posts/?_id=${postsArr[3]._id}`)
                                                                                                .then(function (res) {
                                                                                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                                                                                    agent
                                                                                                        .delete(`/posts/?_id=${postsArr[3]._id}`)
                                                                                                        .then(function (res) {
                                                                                                            assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                                                                                            agent
                                                                                                                .get(`/users/?_id=${usersArr[3]._id}`)
                                                                                                                .then(function (res) {
                                                                                                                    assert.equal(JSON.parse(res.text)['perm'],'allowed');
                                                                                                                    agent
                                                                                                                        .delete(`/users/?_id=${usersArr[0]._id}`)
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

    describe('test server routes', function() {
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
