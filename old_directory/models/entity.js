let mongoose = require('mongoose');
let DAOclass = require('../DAO');

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
    },
    acl: {
        role: String,


    },
    acl: {
        read: {
            allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            ,
            deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
        },
        update: {
            allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            ,
            deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
        },
        create: {
            allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            ,
            deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
        },
        delete: {
            allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            ,
            deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
        }
    }
};

//Post Schema
let PostSchema = {
    Title: {
        type: String,
        index: true
    },
    date: {
        type: Date
    },
    description: {
        type: String
    },
    acl: {
        read: {
            allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            ,
            deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
        },
        update: {
            allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            ,
            deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
        },
        create: {
            allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            ,
            deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
        },
        delete: {
            allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            ,
            deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
        }
    }
};

let DatasetSchema = {
    data: {type: [Number]},
    metadata: Object,
    dataes: {
        type: [{dim0: Number, dim1: Number, dim2: Number, value: Number}]
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId, ref: ProjectSchema
    }
};

let users = new Entity("users", UserSchema, DAOclass.UserDAO);
let projects = new Entity("projects", ProjectSchema, DAOclass.ProjectDAO);
let posts = new Entity('posts', PostSchema, DAOclass.PostDAO);
let datasets = new Entity('datasets', DatasetSchema, DAOclass.DatasetDAO);
let Entities = [users, projects];

module.exports={
    Entities: Entities
};





