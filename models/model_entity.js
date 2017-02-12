var mongoose = require('mongoose');
var DAOclass = require('../DAO');
var dbHost = 'mongodb://localhost/test';
mongoose.connect(dbHost);

//Entity
class Entity {
    constructor(name, fields) {
        this.name = name;
        this.fields = fields;
        this.model = mongoose.model(name, mongoose.Schema(fields));
    }
    getFields() {
        return this.fields;
    }
}

//APIEntity is created for each Entity
class APIEntity extends Entity {
    constructor(name, fields) {
        super(name, fields);

        //initial CRUD operations support
        this.crudBoolean = {
            create: false,
            read: false,
            update: false,
            delete: false
        };

        //dao object created for each APIEntity
        if (this.name == 'User') {
            this.apidao = new DAOclass.UserDAO(this.model);
        } else if (this.name == 'Project') {
            this.apidao = new DAOclass.ProjectDAO(this.model);
        } else {
            this.apidao = new DAOclass.DAO(this.model);
        }
    }

    //Support a certain operation for an APIEntity or not.
    setOperation(operation, bool) {
        this.crudBoolean[operation] = bool;
    }

    //CRUD operations
    create(data, callback) {
        if (this.crudBoolean['create'])
            this.apidao.create(data, callback);
        else console.log("This action is not allowed.");
    }
    read(query, callback) {
        if (this.crudBoolean['read'])
            this.apidao.read(query, callback);
        else console.log("This action is not allowed.");
    }
    update(query, update, callback) {
        if (this.crudBoolean['update'])
            this.apidao.update(query, update, callback);
        else console.log("This action is not allowed.");
    }
    delete(query, callback) {
        if (this.crudBoolean['delete'])
            this.apidao.delete(query, callback);
        else console.log("This action is not allowed.");
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
    Name: {
        type: String,
        index: true
    },
    ProjectDate: {
        type: Date
    },
    Description: {
        type: String
    },
    Owner: {
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

var ProjectAPI = new APIEntity('Project', ProjectSchema);
var UserAPI = new APIEntity('User', UserSchema);
var PostAPI = new APIEntity('Post', PostSchema);

ProjectAPI.setOperation('create', true);
ProjectAPI.setOperation('read', true);
ProjectAPI.setOperation('update', true);
ProjectAPI.setOperation('delete', true);

UserAPI.setOperation('create', true);
UserAPI.setOperation('read', true);
UserAPI.setOperation('update', true);
UserAPI.setOperation('delete', true);

PostAPI.setOperation('create', true);
PostAPI.setOperation('read', true);
PostAPI.setOperation('update', true);
PostAPI.setOperation('delete', true);


module.exports = {
    ProjectAPI: ProjectAPI,
    UserAPI: UserAPI,
    PostAPI: PostAPI
}
