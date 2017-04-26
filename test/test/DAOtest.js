let assert = require('assert');
const dbHost = 'mongodb://localhost/test';
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbHost, {});
const MongoClient = require('mongodb').MongoClient;
const Entities = require('../../models/entity').Entities;
let users = Entities[0];

describe('test db', function () {
    let credentialsStef = {username: 'stef', password: 'test'};
    before(function (done) {
        let url = 'mongodb://localhost/test';
        MongoClient.connect(url, function (err, db) {
            db.dropDatabase((res) => {
                db.close();
                done();
            });
        });
    });

    let names = ['stef', 'kuriakos', 'kwnna', 'filip', 'lhda'];
    it('should Create a user', function (done) {
        let cnt = 0;
        for (let name in names) {
            users.dao.create(userGenerator(names[name]), (err, res) => {
                console.log(res);
                cnt++;
                if (cnt === names.length) {
                    done();
                }
            });
        }
    });


});

function userGenerator(name) {
    return {
        username: name, password: 'test', email: name + '@' + name + '.com', name: name
    }
}
