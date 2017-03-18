class Permission { //todo must be changed
    constructor() {
    }
}

Permission.roles = {
    owner: {read: true, put: true, delete: true, post: false},
    member: {read: true, put: false, delete: false, post: false}
};

Permission.add = function (user, role, obj_id) {
    let b= Permission.roles[role];
    return {
        user_id: user._id,
        obj_id: obj_id,
        read: b.read,
        put: b.put,
        delete: b.delete,
        post: b.post
    }
};

module.exports= {
    Permission:Permission
};
