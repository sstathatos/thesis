let acl = require('acl');
let mongodb = require('mongodb');
mongodb.connect("mongodb://localhost/test", function (error, db) {
    let mongoBackend = new acl.mongodbBackend(db, 'acl_');
    acl = new acl(mongoBackend);
    console.log(acl);
    module.exports = {
        acl: acl
    };
    acl.allow('admin', 'projects', 'put');
    //
    // acl.addUserRoles('58cebe58c90385156b7f9153', 'guest');
    //
    // acl.addUserRoles('joed', 'guest');
});


