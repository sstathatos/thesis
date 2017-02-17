var assert = require('assert');
var model_entity= require('../models/model_entity');
var User= model_entity.UserAPI.model;
var Project= model_entity.ProjectAPI.model;
var expect  = require("chai").expect;
var request = require("request");


// describe('test session', function() {
//     it('tests session', function(done) {
//             var url= "http://localhost:3000";
//             request.get({url:url+"/login"}, function(err,httpResponse,body) {
//                 console.log(httpResponse.headers["set-cookie"][0]);
//             });
//             request.get({url:url+"/login"}, function(err,httpResponse,body) {
//                 console.log(httpResponse.headers["set-cookie"][0]);
//                 done();
//             })
//     })
// })


describe('test test', function() {
    it('something', function(done) {
        var url= "http://localhost:3000";
        request.post({url:url+"/home", form: {username:'2asd', password:'2'}}, function(err,httpResponse,body){
            console.log(httpResponse.headers["set-cookie"][0]);
            var j = request.jar();
            var cookie = request.cookie(httpResponse.headers["set-cookie"][0]);
            j.setCookie(cookie,url+"/home", function(error,cookie) {
                request.get({url: url+"/home", jar: j}, function (err,res,body) {
                    console.log(httpResponse.headers["set-cookie"][0]);
                    var j = request.jar();
                    var cookie = request.cookie(httpResponse.headers["set-cookie"][0]);
                    j.setCookie(cookie,url+"/logout", function(error,cookie) {
                        request.get({url: url+"/logout", jar: j}, function (err,res,body) {

                        });
                    });
                });
            });
        });
        request.post({url:url+"/home", form: {username:'1asd', password:'1'}}, function(err,httpResponse,body){
            var j = request.jar();
            console.log(httpResponse.headers["set-cookie"][0]);
            var cookie = request.cookie(httpResponse.headers["set-cookie"][0]);
            j.setCookie(cookie,url+"/home", function(error,cookie) {
                request.get({url: url+"/home", jar: j}, function (err,res,body) {
                    console.log(httpResponse.headers["set-cookie"][0]);
                    var j = request.jar();
                    var cookie = request.cookie(httpResponse.headers["set-cookie"][0]);
                    j.setCookie(cookie,url+"/logout", function(error,cookie) {
                        request.get({url: url+"/logout", jar: j}, function (err,res,body) {
                            done();
                        });
                    });

                });
            });

        });
    });
});


// describe.skip('Test login logout+ extra requests', function() {
//     it('TEST SEND REQUEST', function(done) {
//         var url= "http://localhost:3000";
//         request.post({url:url+"/home", form: {username:'2asd', password:'2'}}, function(err,httpResponse,body){
//             var j = request.jar();
//             var cookie = request.cookie(httpResponse.headers["set-cookie"][0]);
//             j.setCookie(cookie,url+"/helloguys", function(error,cookie) {
//                 request.get({url: url+"/helloguys", jar: j}, function (err,res,body) {
//                     j.setCookie(cookie,url+"/logout", function(error,cookie) {
//                         request.get({url:url+"/logout",jar: j}, function(err,httpResponse,body) {
//                             request.get({url:url+"/helloguysagainagain"}, function(err,res,body) {
//                                 console.log("something");
//                                 done();
//                             })
//                         });
//                     });
//                 });
//             });
//         });
//     });
// });
//
// describe.skip('Test CREATE USER with http requests', function() {
//     var testUser= {
//         username:"asdasd",
//         email:"asd@asd.com",
//         password:"asdasd",
//         name:"asd"
//     }
//     var url="http://localhost:3000/users"
//     request.post({url:url, form: testUser}, function(err,httpResponse,body) {
//
//     })
// })
//
// describe.skip('TEST PROMISE VALIDATION', function() {
//     var testUser= {
//         username:"asdasd",
//         email:"asd@asd.com",
//         password:"asdasd",
//         name:"asd"
//     }
//     it('should complete this test', function () {
//         model_entity.UserAPI.create(testUser, function(res) {
//             return new Promise(function (resolve) {
//                 // assert.ok(true);
//                 // resolve();
//             }).then((state) => {
//                 assert(state.action === 'DONE', 'should change state');
//             })
//             .catch((error) => {
//                 assert.isNotOk(error,'Promise error');
//             });
//         });
//     })
// })
//
// describe.skip('Test CREATE USERS AND LOGIN THEM', function() {
//     var testUser1= new User({
//         username:"1asd",
//         email:"1",
//         password:"1",
//         name:"1"
//     });
//     var testUser2= new User({
//         username:"2asd",
//         email:"2",
//         password:"2",
//         name:"2"
//     });
//     var testUser3= new User({
//         username:"3asd",
//         email:"3",
//         password:"3",
//         name:"3"
//     });
//     it('test CREATE user1', function(done) {
//         model_entity.UserAPI.create(testUser1, function(err,result) {
//             try {
//                 if (err) console.log(err);
//                 assert.equal(result,testUser1);
//                 done();
//             }
//             catch(error) {
//                 done(error);
//             }
//         });
//     });
//     it('test CREATE user2', function(done) {
//         model_entity.UserAPI.create(testUser2, function(err,result) {
//             try {
//                 if (err) console.log(err);
//                 assert.equal(result,testUser2);
//                 done();
//             }
//             catch(error) {
//                 done(error);
//             }
//         });
//     });
//     it('test CREATE user3', function(done) {
//         model_entity.UserAPI.create(testUser3, function(err,result) {
//             try {
//                 if (err) console.log(err);
//                 assert.equal(result,testUser3);
//                 done();
//             }
//             catch(error) {
//                 done(error);
//             }
//         });
//     });
//
//     // model_auth_ses.passport.authenticate('local',)
//
// })
//
// describe.skip('Test USER ENTITY', function() {
//     var testUser= new User({
//         username:"11",
//         email:"11",
//         password:"4",
//         name:"4"
//     });
//     var updateTestUser={
//         username:"1",
//         email:"1",
//         password:"1",
//         name:"1",
//     }
//     // console.log(model_entity.UserAPI.getFields());
//     it('test DELETE function', function(done) {
//         model_entity.UserAPI.delete(updateTestUser, function(err, result) {
//             try {
//                 if (err) console.log(err);
//                 done();
//             }
//             catch(error) {
//                 done(error);
//             }
//         });
//     });
//     it('test CREATE function', function(done) {
//         model_entity.UserAPI.create(testUser, function(err,result) {
//             try {
//                 if (err) console.log(err);
//                 assert.equal(result,testUser);
//                 done();
//             }
//             catch(error) {
//                 done(error);
//             }
//         });
//     });
//     it('test READ function', function(done) {
//         model_entity.UserAPI.read({},function(err,result) {
//             try {
//                 if (err) console.log(err);
//                 else console.log(result);
//                 assert.ok(true);
//                 done();
//             }
//             catch (error) {
//                 done(error);
//             }
//         });
//     });
//     it('test UPDATE function', function(done) {
//         model_entity.UserAPI.update({username:"11"},updateTestUser,function(err,result) {
//             try {
//                 if (err) console.log(err);
//                 assert.ok(true);
//                 done();
//             }
//             catch (error) {
//                 done(error);
//             }
//         });
//     });
//     it('test UPDATED READ function', function(done) {
//         model_entity.UserAPI.read({},function(err,result) {
//             try {
//                 if (err) console.log(err);
//                 else console.log(result);
//                 assert.ok(true);
//                 done();
//             }
//             catch (error) {
//                 done(error);
//             }
//         });
//     });
// });
//
// describe.skip('Test PROJECT ENTITY', function() {
//     var testProject= new Project({
//         Name:"11",
//         ProjectDate: Date.now(),
//         Description:"4",
//         Owner:"4"
//     });
//     var updateTestProject={
//         Name:"1",
//         Description:"1",
//         Owner:"1",
//     }
//     // console.log(model_entity.UserAPI.getFields());
//     it('test DELETE function', function(done) {
//         model_entity.ProjectAPI.delete(updateTestProject, function(err, result) {
//             try {
//                 if (err) console.log(err);
//                 done();
//             }
//             catch(error) {
//                 done(error);
//             }
//         });
//     });
//     it('test CREATE function', function(done) {
//         model_entity.ProjectAPI.create(testProject, function(err,result) {
//             try {
//                 if (err) console.log(err);
//                 assert.equal(result,testProject);
//                 done();
//             }
//             catch(error) {
//                 done(error);
//             }
//         });
//     });
//     it('test READ function', function(done) {
//         model_entity.ProjectAPI.read({},function(err,result) {
//             try {
//                 if (err) console.log(err);
//                 else console.log(result);
//                 assert.ok(true);
//                 done();
//             }
//             catch (error) {
//                 done(error);
//             }
//         });
//     });
//     it('test UPDATE function', function(done) {
//         model_entity.ProjectAPI.update({Name:"11"},updateTestProject,function(err,result) {
//             try {
//                 if (err) console.log(err);
//                 assert.ok(true);
//                 done();
//             }
//             catch (error) {
//                 done(error);
//             }
//         });
//     });
//     it('test UPDATED READ function', function(done) {
//         model_entity.ProjectAPI.read({},function(err,result) {
//             try {
//                 if (err) console.log(err);
//                 else console.log(result);
//                 assert.ok(true);
//                 done();
//             }
//             catch (error) {
//                 done(error);
//             }
//         });
//     });
// });
