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
                        done();
                    });
                });
            });
        });
    });

    describe('test server routes', function() {
        let credentialsKen = {username: 'ken', password: 'ken'};
        it('should login ken', function (done) {
            agent
                .post('/login')
                .send(credentialsKen)
                .end(function (err) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should check upload', function (done) {
            for (let i = 0; i < 1; i++) {
                agent
                    .post(`/upload/?_id=${datasetsArr[0]._id}`)
                    .attach('hdf', './new_server/python_files/h5examples/asdf.h5')
                    .expect(function (res) {
                        console.log(res.text);
                    })
                    .end(function (err, result) {
                        if (i === 0) done();
                    })
            }
        });
        it('should get contents of an hdf file', function (done) {
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
        it('should get array data', function (done) {
            agent
                .get(`/datasets/grid/?_id=${datasetsArr[0]._id}&path=d3dset&direction=left&xstart=0&xend=0&ystart=0&yend=0`)
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