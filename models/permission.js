class Permission { //todo must be changed
    constructor() {
    }
}

Permission.roles = {
    owner: {read: true, update: true, delete: true, create: true},
    member: {read: true, update: false, delete: false, create: true}
};

/*
 * Create a new permission Object based on owner or member role
 * */
Permission.add = (user, role, obj_id) => {
    let b= Permission.roles[role];
    return {
        user_id: user._id,
        obj_id: obj_id,
        read: b.read,
        update: b.update,
        delete: b.delete,
        create: b.create
    }
};


/*
 * Permissions Check. If someone tries to perform an operation  which he is not permitted for, we redirect to an Error!
 * */
//todo get post put must equal to read create update
Permission.check = (permissionmodel, req, cb) => {
    let op = req.method.toLowerCase();
    permissionmodel.dao.all().findOne({user_id: req.user._id, obj_id: req.params._id}, (err, result) => {
        if (err) return cb(err, null);
        else {
            return cb(null, result[op]);
        }
    });
};

module.exports= {
    Permission:Permission
};
