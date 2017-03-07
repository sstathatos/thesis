var assert = require('assert');
var request = require('supertest'),
    should = require('chai').should();
var MongoClient = require('mongodb').MongoClient;

describe('test my project Permissions', function() {
    let agent = request.agent('http://localhost:3000') ;
    let credentialsStef= {username: 'stef', password: 'test'};

    before(function(done){
        let url = 'mongodb://localhost/test';
        MongoClient.connect(url, function(err, db) {
            db.dropDatabase();  //will be used :)
            db.close();
            done();
        });
    });

    describe('CREATE user and 2 projects',function(){
        it('should register', function(done) {

            let userStef={username: 'stef', password: 'test', email:'stef@stef.com', name:"stef"};
            let userFilip={username: 'filip', password: 'test', email:'filip@filip.com', name:"filip"};
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

        it('should create project', function (done) {
            let project={
                name: "pro",
                description : "stef pro"
            };
            for(let i=0;i<2;i++) {
                agent
                    .post('/users/'+credentialsStef.username+'/projects')
                    .send(project)
                    .end(function (err, res) {
                        if (err) return done(err);


                    });

            }
            done();
        });

    });

    let credentialsFilip= {username: 'filip', password: 'test'};
    describe('CREATE user and 2 projects',function(){
        it('should register FILIP', function(done) {
            let userFilip={username: 'filip', password: 'test', email:'filip@filip.com', name:"filip"};
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

        it('should create project', function (done) {
            let project={
                name: "pro",
                description : "filip pro"
            };
            for(let i=0;i<2;i++) {
                agent
                    .post('/users/'+credentialsFilip.username+'/projects')
                    .send(project)
                    .end(function (err, res) {
                        if (err) return done(err);

                    });
            }
            done();
        });
    });
});



