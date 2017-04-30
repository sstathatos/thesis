let DBOpsConstructor = require('./DBOpsConstructor');

let permissionConstructor = () => {
    let {createObj, readObjs, updateObj, deleteObj, entities} = DBOpsConstructor();
    console.log(entities);

};

permissionConstructor();