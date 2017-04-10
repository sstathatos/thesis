acl = require('./acl_conf');
acl.init((err, acl) => {
    if (err) throw Error();
    //main start
    acl.allow('owner', 'project_27', ['edit', 'delete', 'view'], (err) => {
        acl.allow('member', 'project_27', 'view', (err) => {
            acl.addRoleParents('owner', 'project_27', (err) => {
                acl.addRoleParents('member', 'project_27', (err) => {
                    acl.addUserRoles('john', ['owner'], (err) => {

                    });
                    acl.addUserRoles('almak', ['owner'], (err) => {
                        // acl.isAllowed('almak','/blogs/12345','view',(err,res)=> {
                        //     console.log(res);
                        // })
                        acl.allowedPermissions('almak', 'project_27', (err, user) => {
                            console.log('almak permissions for project_27');
                            console.log(user);
                            acl.allow('owner', 'project_28', ['edit', 'delete', 'view'], (err) => {
                                acl.allow('member', 'project_28', 'view', (err) => {
                                    acl.addRoleParents('owner', 'project_28', (err) => {
                                        acl.addRoleParents('member', 'project_28', (err) => {
                                            acl.addUserRoles('almak', ['owner'], (err) => {
                                                // acl.isAllowed('almak','/blogs/12345','view',(err,res)=> {
                                                //     console.log(res);
                                                // })
                                                acl.allowedPermissions('john', 'project_28', (err, user) => {
                                                    console.log('John permissions for project_28');
                                                    console.log(user);
                                                });
                                                acl.roleUsers('owner', (err, users) => {
                                                    console.log('all users who has a role (useless):');
                                                    console.log(users);
                                                });
                                                acl.userRoles('almak', (err, roles) => {
                                                    console.log('all the roles a user has (useless):');
                                                    console.log(roles);
                                                })
                                            });
                                        })
                                    })
                                });
                            });
                        })
                    });
                })
            })
        });
    });

});