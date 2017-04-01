let assert = require('assert');
const request = require('supertest');
let should = require('chai').should();
const MongoClient = require('mongodb').MongoClient;

describe('test my project Permissions', function() {
    let agent = request.agent('http://localhost:3000') ;


    before(function(done){
        let url = 'mongodb://localhost/test';
        MongoClient.connect(url, function(err, db) {
            db.dropDatabase();  //will be used :)
            db.close();
            done();
        });
    });

    describe('CREATE user and 2 projects',function(){
        let credentialsStef = {username: 'stef', password: 'test'};
        let userStef = {username: 'stef', password: 'test', email: 'stef@stef.com', name: "stef"};
        it('should register', function (done) {
            agent
                .post('/register')
                .send(userStef)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should login for stef', function(done) {
            agent
                .post('/login')
                .send(credentialsStef)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should create project for stef', function (done) {
            let project={
                name: "pro",
                description : "stef pro"
            };
            for(let i=0;i<2;i++) {
                agent
                    .post('/projects/create')
                    .send(project)
                    .end(function (err, res) {
                        if (err) return done(err);
                    });
            }
            done();
        });

    });


    describe('CREATE user and 2 projects',function(){
        let credentialsFilip = {username: 'filip', password: 'test'};
        let userFilip = {username: 'filip', password: 'test', email: 'filip@filip.com', name: "filip"};
        it('should register FILIP', function (done) {

            agent
                .post('/register')
                .send(userFilip)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should login for filip', function(done) {
            agent
                .post('/login')
                .send(credentialsFilip)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should create project for filip', function (done) {
            let project2 = {
                name: "pro",
                description : "filip pro"
            };
            for(let i=0;i<2;i++) {
                agent
                    .post('/projects/create')
                    .send(project2)
                    .end(function (err, res) {
                        if (err) return done(err);

                    });
            }
            done();
        });
    });

    describe('CREATE user and 2 projects', function () {
        let credentialsKwnna = {username: 'kwnna', password: 'test'};
        let userKwnna = {username: 'kwnna', password: 'test', email: 'kwnna@kwnna.com', name: "kwnna"};
        it('should register Kwnna', function (done) {

            agent
                .post('/register')
                .send(userKwnna)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should login for kwnna', function (done) {
            agent
                .post('/login')
                .send(credentialsKwnna)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should create project for kwnna', function (done) {
            let project3 = {
                name: "pro",
                description: "kwnna pro"
            };
            for (let i = 0; i < 2; i++) {
                agent
                    .post('/projects/create')
                    .send(project3)
                    .end(function (err, res) {
                        if (err) return done(err);

                    });
            }
            done();
        });
    });
});



