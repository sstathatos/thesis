var assert = require('assert');
var model_entity= require('../models/model_entity');
var User= model_entity.UserAPI.model;
var Project= model_entity.ProjectAPI.model;

describe('Test USER ENTITY', function() {
    var testUser= new User({
        username:"11",
        email:"11",
        password:"4",
        name:"4"
    });
    var updateTestUser={
        username:"1",
        email:"1",
        password:"1",
        name:"1",
    }
    // console.log(model_entity.UserAPI.getFields());
    it('test DELETE function', function(done) {
        model_entity.UserAPI.delete(updateTestUser, function(err, result) {
            try {
                if (err) console.log(err);
                done();
            }
            catch(error) {
                done(error);
            }
        });
    });
    it('test CREATE function', function(done) {
        model_entity.UserAPI.create(testUser, function(err,result) {
            try {
                if (err) console.log(err);
                assert.equal(result,testUser);
                done();
            }
            catch(error) {
                done(error);
            }
        });
    });
    it('test READ function', function(done) {
        model_entity.UserAPI.read({},function(err,result) {
            try {
                if (err) console.log(err);
                else console.log(result);
                assert.ok(true);
                done();
            }
            catch (error) {
                done(error);
            }
        });
    });
    it('test UPDATE function', function(done) {
        model_entity.UserAPI.update({username:"11"},updateTestUser,function(err,result) {
            try {
                if (err) console.log(err);
                assert.ok(true);
                done();
            }
            catch (error) {
                done(error);
            }
        });
    });
    it('test UPDATED READ function', function(done) {
        model_entity.UserAPI.read({},function(err,result) {
            try {
                if (err) console.log(err);
                else console.log(result);
                assert.ok(true);
                done();
            }
            catch (error) {
                done(error);
            }
        });
    });
});

describe('Test PROJECT ENTITY', function() {
    var testProject= new Project({
        Name:"11",
        ProjectDate: Date.now(),
        Description:"4",
        Owner:"4"
    });
    var updateTestProject={
        Name:"1",
        Description:"1",
        Owner:"1",
    }
    // console.log(model_entity.UserAPI.getFields());
    it('test DELETE function', function(done) {
        model_entity.ProjectAPI.delete(updateTestProject, function(err, result) {
            try {
                if (err) console.log(err);
                done();
            }
            catch(error) {
                done(error);
            }
        });
    });
    it('test CREATE function', function(done) {
        model_entity.ProjectAPI.create(testProject, function(err,result) {
            try {
                if (err) console.log(err);
                assert.equal(result,testProject);
                done();
            }
            catch(error) {
                done(error);
            }
        });
    });
    it('test READ function', function(done) {
        model_entity.ProjectAPI.read({},function(err,result) {
            try {
                if (err) console.log(err);
                else console.log(result);
                assert.ok(true);
                done();
            }
            catch (error) {
                done(error);
            }
        });
    });
    it('test UPDATE function', function(done) {
        model_entity.ProjectAPI.update({Name:"11"},updateTestProject,function(err,result) {
            try {
                if (err) console.log(err);
                assert.ok(true);
                done();
            }
            catch (error) {
                done(error);
            }
        });
    });
    it('test UPDATED READ function', function(done) {
        model_entity.ProjectAPI.read({},function(err,result) {
            try {
                if (err) console.log(err);
                else console.log(result);
                assert.ok(true);
                done();
            }
            catch (error) {
                done(error);
            }
        });
    });
});
