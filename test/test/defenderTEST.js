const request = require('supertest');
const agent = request.agent('http://localhost:3000');
let assert= require('assert');
let util = require('util');
// let initDB=require('./initDBTEST');
let APIConstructor=require('../../API/index');
let {readObjs}=APIConstructor;
let usersArr=[];
let projectsArr=[];
let postsArr=[];
let datasetsArr=[];
let plotsArr = [];

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
                            readObjs('plots', {})((err, plots) => {
                                if (err) throw err;
                                plotsArr=plots;
                                done();
                            });
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



        it('should test non authenticated user', function(done) {
            agent
                .get(`/users/?${usersArr[0]}`)
                .expect(401)
                .then((res) => {
                    console.log(res.text);
                    done();
                })
        });

        it('should login stefanos', function(done) {
            agent
                .post('/login')
                .send(credentialsFilip)
                .expect(200)
                .then((res) => {
                    console.log(res.text);
                    done();
                })
        });

        it('should throw all cases', function(done) {
            agent
                .get('/fdsajkfdjaskjfsd')
                .expect(400)
                .then((res) => {
                    console.log(res.text);
                    agent
                        .get(`/posts/?_id=${postsArr[3]._id}`)
                        .then((res) => {
                            console.log(res.text);
                            done();
                        })
                })
        });


    });
});
