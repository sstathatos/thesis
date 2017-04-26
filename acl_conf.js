let acl = require('acl');

var _acl;

module.exports = {
    init: function (cb) {
        mongodb.connect("mongodb://localhost/test", function (error, db) { //set up acl
            let mongoBackend = new acl.mongodbBackend(db, 'acl_', true);
            acl = new acl(mongoBackend);
            _acl = acl;
            cb(null, acl);
        });
    },
    getAcl: function () {
        return _acl;
    }
};
