//let initDB= require('./initDBTEST');
const request = require('supertest');
const agent = request.agent('http://localhost:3000');
let assert= require('assert');
let APIConstructor=require('../../API/index');
let {readObjs}=APIConstructor;
let usersArr=[];
let projectsArr=[];
let postsArr=[];
let datasetsArr=[];
let plotsArr=[];

describe('read all objs and save them', function () {
    this.timeout(0);
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
                        readObjs('plots', {})((err, plots) => {
                            if (err) throw err;
                            plotsArr=plots;
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('test server routes', function() {
        let credentialsKen = {username: 'ken', password: 'ken'};
        // it('should login ken', function (done) {
        //     agent
        //         .post('/login')
        //         .send(credentialsKen)
        //         .end(function (err) {
        //             if (err) return done(err);
        //             done();
        //         });
        // });
        //
        // it('should check upload', function (done) {
        //     for (let i = 0; i < 2; i++) {
        //         agent
        //             .post(`/upload/?_id=${datasetsArr[i]._id}`)
        //             .attach('hdf', './new_server/python_files/h5examples/asdf.h5')
        //             .expect(function (res) {
        //                 console.log(res.text);
        //             })
        //             .end(function (err, result) {
        //                 if (i === 1) done();
        //             })
        //     }
        // });
        // let j=0;
        // it('should get plot data', function (done) {
        //     for (let i=0; i <1; i++) {
        //         agent
        //             .get(`/plot/?path=d3dset&dim1=1&dim2=2&dim3Value=0&dim2Value=2&currystart=0&curryend=0&zoomstart=0&zoomend=0&direction=init`)
        //             .expect(function (res) {
        //                 console.log(res.text);
        //             })
        //             .expect(200)
        //             .end(function (err, result) {
        //                 if (j === 0) done();
        //                 j++;
        //             })
        //     }
        // });
        // it('should get contents of an hdf file', function (done) {
        //     agent
        //         .get(`/datasets/?_id=${datasetsArr[0]._id}`)
        //         .expect(function (res) {
        //             console.log(res.text);
        //         })
        //         .expect(200)
        //         .end(function (err, result) {
        //             done();
        //         })
        //
        // });
        // it('should get array data', function (done) {
        //     agent
        //         .get(`/datasets/grid/?_id=${datasetsArr[0]._id}&path=d3dset&direction=left&xstart=0&xend=0&ystart=0&yend=0`)
        //         .expect(function (res) {
        //             console.log(res.text);
        //         })
        //         .expect(200)
        //         .end(function (err, result) {
        //             done();
        //         })
        // });

        it('should get a user profile', function (done) {
            agent
                .get(`/users/?_id=${usersArr[0]._id}`)
                .expect(function (res) {
                    console.log(res.text);
                })
                .expect(200)
                .end(function (err, result) {
                    done();
                })
        });

        it('should get contents of ONE dataset', function (done) {
            agent
                .get(`/datasets/?_id=${datasetsArr[0]._id}`)
                .expect(function (res) {
                    console.log(res.text);
                })
                .expect(200)
                .end(function (err, result) {
                    done();
                })
        });

        it('should get contents of ONE project', function (done) {
            agent
                .get(`/projects/?_id=${projectsArr[0]._id}`)
                .expect(function (res) {
                    console.log(res.text);
                })
                .expect(200)
                .end(function (err, result) {
                    done();
                })
        });

        it('should get contents of ONE post', function (done) {
            agent
                .get(`/posts/?_id=${postsArr[0]._id}`)
                .expect(function (res) {
                    console.log(res.text);
                })
                .expect(200)
                .end(function (err, result) {
                    done();
                })
        });

        it('should get data of ONE plot', function (done) {
            agent
                .get(`/plots/?_id=${plotsArr[0]._id}&direction=init&currystart=0&curryend=0&zoomstart=0&zoomend=0`)
                .expect(function (res) {
                    console.log(res.text);
                })
                .expect(200)
                .end(function (err, result) {
                    done();
                })
        });
    });
});