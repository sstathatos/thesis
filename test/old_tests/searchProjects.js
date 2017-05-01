let assert = require('assert');
const request = require('supertest');
let should = require('chai').should();
let MongoClient = require('mongodb').MongoClient;

describe('test search', function() {
    let agent = request.agent('http://localhost:3000') ;
    let credentials= {username: 'stef', password: 'test'};

    before(function(done){

        let user={username: 'stef', password: 'test', email:'stef@stef.com', name:"stef"};

                agent
                    .post('/login')
                    .send(credentials)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });

    });

    describe('search something', function(){
        it('should search a project', function (done) {
            data={name: 'pro'};
            agent
                .get('/users/'+credentials.username+'/projects/search')
                .send(data)
                .end(function (err, res) {
                    if (err) return done(err);
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
    });
});