const request = require('supertest');
const agent = request.agent('http://localhost:3000');
let assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
let util = require('util');
let APIConstructor=require('../API');
let {createObj, readObjs}=APIConstructor;

describe('test my simple server', function () {
    this.timeout(0);

    before(function (done) {
        let url = 'mongodb://localhost/daotest';
        MongoClient.connect(url, function (err, db) {
            db.dropDatabase(() => {
                db.close();
                done();
            });
        });
    });

    describe('init my db', function () {
        it('should create users', function (done) {
            createObj('users', {name: `stefanos`, username: `stefanos`, email: `stefanos`, password: `stefanos`})((err, data) => {
                if (err) throw err;
                createObj('users', {name: `ken`, username: `ken`, email: `ken`, password: `ken`})((err, data) => {
                    if (err) throw err;
                    done();
                });
            });
        });

        it('should create projects', function (done) {
            createObj('projects', {name: `project test`, description: `project test`})((err, data) => {
                if (err) throw err;
                done();
            });
        });

        it('should create 2 posts', function (done) {
            readObjs('projects', {})((err, projs) => {
                if (err) throw err;
                createObj('posts', {title: `post PARENT`, description: `post PARENT`, inproject: projs[0]._id})((err, post1) => {
                    if (err) throw err;
                    createObj('posts', {title: `post KID`, description: `post KID`,inpost:post1._id ,inproject: projs[0]._id})((err, data) => {
                        if (err) throw err;
                        done();
                    });
                });
            });
        });

        it('should create datasets', function (done) {
            readObjs('projects', {})((err, projs) => {
                if (err) throw err;
                readObjs('users', {})((err, users) => {
                    if (err) throw err;
                    createObj('datasets', {name: `dataset`,path_saved:`hdf_files/hdf.h5`, creator:users[0]._id, inproject: projs[0]._id})((err, post1) => {
                        if (err) throw err;
                        done();
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
                        if (i === posts.length / 2-1) {
                            done();
                        }
                    });
                }
            });
        });
    });


    describe('test server routes', function() {
        it('should get /',function (done) {
            agent
                .get('/')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    console.log(res.text);
                })
                .expect(200,done)
        });
        it('should get /users',function (done) {
            agent
                .get('/users')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    console.log(res.text);
                })
                .expect(200,done)
        });
        // it('should get /projects',function (done) {
        //     agent
        //         .get('/projects')
        //         .expect('Content-Type', /json/)
        //         .expect(function (res) {
        //             console.log(res.text);
        //         })
        //         .expect(200,done)
        // });
        // it('should get /posts',function (done) {
        //     agent
        //         .get('/posts')
        //         .expect('Content-Type', /json/)
        //         .expect(function (res) {
        //             console.log(res.text);
        //         })
        //         .expect(200,done)
        // });
        // it('should get /datasets',function (done) {
        //     agent
        //         .get('/datasets')
        //         .expect('Content-Type', /json/)
        //         .expect(function (res) {
        //             console.log(res.text);
        //         })
        //         .expect(200,done)
        // });
        // it('should get /plots',function (done) {
        //     agent
        //         .get('/plots')
        //         .expect('Content-Type', /json/)
        //         .expect(function (res) {
        //             console.log(res.text);
        //         })
        //         .expect(200,done)
        // });
    });

});
