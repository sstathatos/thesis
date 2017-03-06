var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost/test';
var DAOclass = require('../DAO');
mongoose.connect(dbHost);
var PermissionsFactory=require('./model_role').PermissionsFactory;

//Entity
class Entity {
    constructor(model_name, schema_name, dao_class) {
        this.model_name = model_name;
        this.schema_name = schema_name;
        this.dao_class = dao_class;

        this.dao = new this.dao_class(mongoose.model(this.model_name, mongoose.Schema(this.schema_name)));
        return this.dao;
        //
        //     this.crudBoolean = {
        //         create: false,
        //         read: false,
        //         update: false,
        //         delete: false
        //     };
        //
        //     if(create == false):
        //         this.dao.create = null
        //
        // }
        // //Support a certain operation for an Entity or not.
        // setOperation(operation, bool) {
        //     this.crudBoolean[operation] = bool;
        // }
    }
}
//User Schema
var UserSchema = {
    username: {
        type: String,
        index: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    }
};

//Project Schema
var ProjectSchema = {
    name: {
        type: String,
        index: true
    },
    date: {
        type: Date
    },
    description: {
        type: String
    }
};

//Post Schema
var PostSchema = {
    Title: {
        type: String,
        index: true
    },
    PostDate: {
        type: Date
    },
    Description: {
        type: String
    },
    Owner: {
        type: String
    }
};

var users= new Entity("users",UserSchema,DAOclass.UserDAO);
var projects= new Entity("projects",ProjectSchema, DAOclass.ProjectDAO);
var projectpermissions= new PermissionsFactory(UserSchema,ProjectSchema,"projectpermissions",DAOclass.ProjectPermissionsDAO);
var DAOS=[ users, projects, projectpermissions];

module.exports={
    DAOS:DAOS
};

// users.create(user_name = "almak",
//              email = "almamk782@gmail.com"
//             // ALL REQUIRED FIELDS
// );
// users.objects(id =5);
// users.update(id = 5, user_name="semitable");
// users.delete(id = 5);
// users.objects();
// users.model;
//
// entity.dao.create()
//
//
// let dao_class = DAOclass.UserDAO;
// new dao_class();

//
// ProjectAPI.setOperation('create', true);
// ProjectAPI.setOperation('read', true);
// ProjectAPI.setOperation('update', true);
// ProjectAPI.setOperation('delete', true);
// ProjectAPI.setOperation('readALL', true);
// ProjectAPI.setOperation('push', true);

//
// UserAPI.setOperation('create', true);
// UserAPI.setOperation('read', true);
// UserAPI.setOperation('update', true);
// UserAPI.setOperation('delete', true);
// UserAPI.setOperation('readALL', true);
// UserAPI.setOperation('push', true);
//
// PostAPI.setOperation('create', true);
// PostAPI.setOperation('read', true);
// PostAPI.setOperation('update', true);
// PostAPI.setOperation('delete', true);
// PostAPI.setOperation('readALL', true);
// PostAPI.setOperation('push', true);




