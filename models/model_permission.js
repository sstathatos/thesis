class Permission {
    constructor() {
    }
}

Permission.roles = {
    owner: {view: true, edit: true, del: true, create: false},
    member: {view: true, edit: false, del: false, create: false}
};

Permission.add = function (user, role, obj_id) {
    let b= Permission.roles[role];
    return {
        user_id: user._id,
        obj_id: obj_id,
        view: b.view,
        edit: b.edit,
        del: b.del,
        create: b.create
    }
};

module.exports= {
    Permission:Permission
};
