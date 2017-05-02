const dbHost = 'mongodb://localhost/daotest';
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbHost, {});

let DBOpsConstructor = require('./DBOpsConstructor');
let permissionConstructor = require('./permissionConstructor');
let entitiesGenerator = require('./entitiesConstructor');
let DAOConstructor = require('./DAOConstructor');
let schemaConstructor = require('./schemaConstructor');

let APIConstructor = () => {
    let {addUserRole,removeUserRole,isAllowed,isAllowedCreate,DBops} = permissionConstructor({entitiesGenerator,
        DAOConstructor,schemaConstructor,DBOpsConstructor,mongoose});
    let {createObj, readObjs, updateObj, deleteObj, entities}=DBops;

    return {
        addUserRole,removeUserRole,isAllowed,isAllowedCreate,createObj, readObjs, updateObj, deleteObj
    }
};

module.exports =APIConstructor();
