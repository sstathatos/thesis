let mongoose = require('mongoose');
let dbHost = 'mongodb://localhost/test';
let DAOclass = require('../DAO');
mongoose.connect(dbHost);
let PermissionsFactory = require('./model_role').PermissionsFactory;

//Entity
class Entity {
    constructor(model_name, schema_name, dao_class) {
        this.model_name = model_name;
        this.schema_name = schema_name;
        this.model = mongoose.model(this.model_name, mongoose.Schema(this.schema_name));
        this.dao = new dao_class(this.model);
    }
}
//User Schema
let UserSchema = {
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
let ProjectSchema = {
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
let PostSchema = {
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

let users = new Entity("users", UserSchema, DAOclass.UserDAO);
let projects = new Entity("projects", ProjectSchema, DAOclass.ProjectDAO);

let projectpermissions = new PermissionsFactory("users", "projects", "projectpermissions", DAOclass.ProjectPermissionsDAO);
let Entities = [users, projects, projectpermissions];

module.exports={
    Entities: Entities
};





