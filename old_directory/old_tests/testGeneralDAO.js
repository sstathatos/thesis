let assert = require('assert');
const request = require('supertest');
let should = require('chai').should();
let MongoClient = require('mongodb').MongoClient;


describe('test my dao', function() {
    let agent = request.agent('http://localhost:3000') ;
    let credentials= {username: 'stef', password: 'test'};

    before(function(done){

        let user={username: 'stef', password: 'test', email:'stef@stef.com', name:"stef"};
        agent
            .post('/register')
            .send(user)
            .end(function (err, res) {
                if (err) return done(err);
                agent
                    .post('/login')
                    .send(credentials)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
    });

    describe('test my projects', function(){
        let project={
            name: "some new newnewnewnewn project",
            description : "some new description"
        };
        it('should create project', function (done) {
            agent
                .post('/users/'+credentials.username+'/projects')
                .send(project)
                .end(function (err, res) {
                    if (err) return done(err);

                    // res.status.should.be.equal(302);
                    done();
                });
        });
        it('should show myprojects', function (done) {
            let query={name:"some new newnewnewnewn project"};
            agent
                .get('/users/'+credentials.username)
                .send()
                .end(function (err, res) {
                    if (err) return done(err);

                    // res.status.should.be.equal(200);
                    done();
                });
        });
        it('should search a project', function (done) {
            agent
                .get('/users/'+credentials.username+'/projects/search')
                .end(function (err, res) {
                    if (err) return done(err);

                    // res.status.should.be.equal(200);
                    done();
                });
        });
    });

    after(function(done){
        agent
            .get('/logout')
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        // let url = 'mongodb://localhost/test';
        // MongoClient.connect(url, function(err, db) {
        //     db.dropDatabase();  //will be used :)
        //     // let collections=["projectpermissions","projects","users"];
        //     // for(let i in collections) {
        //     //     db.dropCollection(collections[i], function(err) {
        //     //         if(!err) {
        //     //             console.log( collections[i] + " dropped");
        //     //         } else {
        //     //             console.log("!ERROR! " + err.errmsg);
        //     //         }
        //     //     })
        //     // }
        //     done();
        //     db.close();
        // });

    });
});



