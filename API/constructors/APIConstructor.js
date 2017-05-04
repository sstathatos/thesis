const dbHost = 'mongodb://localhost/daotest';
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbHost, {});

let DBOpsConstructor = require('./DBOpsConstructor');
let permissionConstructor = require('./permissionConstructor');
let entitiesConstructor = require('./entitiesConstructor');
let DAOConstructor = require('./DAOConstructor');
let schemaConstructor = require('./schemaConstructor');

let APIConstructor = () => {
    let {addUserRole,removeUserRole,isAllowed,isAllowedCreate,DBops} = permissionConstructor({entitiesConstructor,
        DAOConstructor,schemaConstructor,DBOpsConstructor,mongoose});
    let {createObj, readObjs, updateObj, deleteObj}=DBops;
    //entities

    return {
        addUserRole,removeUserRole,isAllowed,isAllowedCreate,createObj, readObjs, updateObj, deleteObj
    }
};

module.exports =APIConstructor();
