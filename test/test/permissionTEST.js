let assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
let util = require('util');
let DBOpsConstructor = require('../../DBOpsConstructor');
let permissionConstructor = require('../../permissionConstructor');
let {createObj, readObjs, updateObj, deleteObj, entities} = DBOpsConstructor();
let {addUserRole,removeUserRole,isAllowed,isAllowedCreate} = permissionConstructor();

let usersAr=[];
let projectsAr=[];
let postsAr=[];
let plotsAr=[];
let datasetsAr=[];

describe('test my PERMISSION OPS', function () {
    this.timeout(0);
    before( (done) => {
        let url = 'mongodb://localhost/daotest';
        MongoClient.connect(url,  (err, db) => {
            db.dropDatabase((res) => {
                db.close();
                done();
            });
        });
    });
    describe('init db',  () => {
        it('should init my db for permission testing',  (done) => {
            createObj('users', {name: `stefanos`, username: `stefanos`, email: `stefanos`, password: `stefanos`})((err, us0) => {
                if (err) throw err;
                usersAr.push(us0);
                createObj('users', {name: `ken`, username: `ken`, email: `ken`, password: `ken`})((err, us1) => {
                    if (err) throw err;
                    usersAr.push(us1);
                    createObj('users', {name: `filip`, username: `filip`, email: `filip`, password: `filip`})((err, us2) => {
                        if (err) throw err;
                        usersAr.push(us2);
                        createObj('users', {name: `kwnna`, username: `kwnna`, email: `kwnna`, password: `kwnna`})((err, us3) => {
                            if (err) throw err;
                            usersAr.push(us3);
                            createObj('projects', {name: `test project name`, description: `test project desc`})((err,pr0) => {
                                if (err) throw err;
                                projectsAr.push(pr0);
                                createObj('posts', {title: `test post title`, description: `test post desc`, inproject: pr0._id})((err, po0) => {
                                    if (err) throw err;
                                    postsAr.push(po0);
                                    createObj('datasets', {name: `test dataset name`, inproject: pr0._id ,creator:us2._id})((err, ds0) => {
                                        if (err) throw err;
                                        datasetsAr.push(ds0);
                                        createObj('plots', {title: `test plot name`,description: `test plot desc`, inpost: po0._id})((err, pl0) => {
                                            if (err) throw err;
                                            plotsAr.push(pl0);
                                            console.log('1');
                                            done();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    describe('test addUserRole', () => {
        it('should create permissions',  (done) => {
            console.log('2');
            addUserRole(usersAr[0]._id, projectsAr[0]._id, 'owner', 'projects')((err, proj) => {
                if(err) throw err;
                addUserRole(usersAr[1]._id, projectsAr[0]._id, 'member', 'projects')((err, proj) => {
                    if(err) throw err;
                    addUserRole(usersAr[2]._id, projectsAr[0]._id, 'member', 'projects')((err, proj) => {
                        if(err) throw err;
                        addUserRole(usersAr[1]._id, postsAr[0]._id, 'owner', 'posts')((err, proj) => {
                            if(err) throw err;
                            done();
                        });
                    });
                });
            });
        });
        it('should test create asserts',  (done) => {
            addUserRole(usersAr[0]._id, projectsAr[0]._id, 'owner', 'users')((err, proj) => {
                assert.ok(err instanceof Error);
                addUserRole(usersAr[1]._id, projectsAr[0]._id, 'member', 'plots')((err, proj) => {
                    assert.ok(err instanceof Error);
                    addUserRole(projectsAr[0]._id, projectsAr[0]._id, 'member', 'projects')((err, proj) => {
                        assert.ok(err instanceof Error);
                        addUserRole(usersAr[1]._id, usersAr[1]._id, 'member', 'projects')((err, proj) => {
                            assert.ok(err instanceof Error);
                            addUserRole(usersAr[1]._id, usersAr[1]._id, 'member', 'projects')((err, proj) => {
                                assert.ok(err instanceof Error);
                                addUserRole(usersAr[1]._id, projectsAr[0]._id, 'member', 'projects')((err, proj) => {
                                    assert.ok(err instanceof Error);
                                    addUserRole(usersAr[2]._id, projectsAr[0]._id, 'owner', 'projects')((err, proj) => {
                                        assert.ok(err instanceof Error);
                                        addUserRole(usersAr[1]._id, projectsAr[0]._id, 'owner', 'projects')((err, proj) => {
                                            assert.ok(err instanceof Error);
                                            console.log('3');
                                            done();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    describe('test isAllowed',() => {
        //0 -> project owner
        //1 -> post owner
        //2 -> simple member
        //3 -> not a member
        it('should check permissions PROJECT OWNER', (done) => {
            console.log('4');
            isAllowed(usersAr[0]._id,projectsAr[0]._id,'read','projects')((err,perm) => {
                assert.equal(perm,'allowed');
                isAllowed(usersAr[0]._id,projectsAr[0]._id,'update','projects')((err,perm) => {
                    assert.equal(perm,'allowed');
                    isAllowed(usersAr[0]._id,postsAr[0]._id,'read','posts')((err,perm) => {
                        assert.equal(perm,'allowed');
                        isAllowed(usersAr[0]._id,postsAr[0]._id,'delete','posts')((err,perm) => {
                            assert.equal(perm,'allowed');
                            isAllowed(usersAr[0]._id,datasetsAr[0]._id,'read','datasets')((err,perm) => {
                                assert.equal(perm,'allowed');
                                isAllowed(usersAr[0]._id,datasetsAr[0]._id,'update','datasets')((err,perm) => {
                                    assert.equal(perm,'allowed');
                                    isAllowed(usersAr[0]._id,plotsAr[0]._id,'read','plots')((err,perm) => {
                                        assert.equal(perm,'allowed');
                                        isAllowed(usersAr[0]._id,plotsAr[0]._id,'delete','plots')((err,perm) => {
                                            assert.equal(perm,'allowed');
                                            done();
                                        })
                                    })
                                })
                            })
                        })
                    })

                })
            })
        });
        it('should check permissions POST OWNER', (done) => {
            isAllowed(usersAr[1]._id,projectsAr[0]._id,'read','projects')((err,perm) => {
                assert.equal(perm,'allowed');
                isAllowed(usersAr[1]._id,projectsAr[0]._id,'update','projects')((err,perm) => {
                    assert.equal(perm,'denied');
                    isAllowed(usersAr[1]._id,postsAr[0]._id,'read','posts')((err,perm) => {
                        assert.equal(perm,'allowed');
                        isAllowed(usersAr[1]._id,postsAr[0]._id,'delete','posts')((err,perm) => {
                            assert.equal(perm,'allowed');
                            isAllowed(usersAr[1]._id,datasetsAr[0]._id,'read','datasets')((err,perm) => {
                                assert.equal(perm,'allowed');
                                isAllowed(usersAr[1]._id,datasetsAr[0]._id,'update','datasets')((err,perm) => {
                                    assert.equal(perm,'denied');
                                    isAllowed(usersAr[1]._id,plotsAr[0]._id,'read','plots')((err,perm) => {
                                        assert.equal(perm,'allowed');
                                        isAllowed(usersAr[1]._id,plotsAr[0]._id,'delete','plots')((err,perm) => {
                                            assert.equal(perm,'allowed');
                                            done();
                                        })
                                    })
                                })
                            })
                        })
                    })

                })
            })
        });
        it('should check permissions SIMPLE MEMBER', (done) => {
            isAllowed(usersAr[2]._id,projectsAr[0]._id,'read','projects')((err,perm) => {
                assert.equal(perm,'allowed');
                isAllowed(usersAr[2]._id,projectsAr[0]._id,'update','projects')((err,perm) => {
                    assert.equal(perm,'denied');
                    isAllowed(usersAr[2]._id,postsAr[0]._id,'read','posts')((err,perm) => {
                        assert.equal(perm,'allowed');
                        isAllowed(usersAr[2]._id,postsAr[0]._id,'delete','posts')((err,perm) => {
                            assert.equal(perm,'denied');
                            isAllowed(usersAr[2]._id,datasetsAr[0]._id,'read','datasets')((err,perm) => {
                                assert.equal(perm,'allowed');
                                isAllowed(usersAr[2]._id,datasetsAr[0]._id,'update','datasets')((err,perm) => {
                                    assert.equal(perm,'denied');
                                    isAllowed(usersAr[2]._id,plotsAr[0]._id,'read','plots')((err,perm) => {
                                        assert.equal(perm,'allowed');
                                        isAllowed(usersAr[2]._id,plotsAr[0]._id,'delete','plots')((err,perm) => {
                                            assert.equal(perm,'denied');
                                            done();
                                        })
                                    })
                                })
                            })
                        })
                    })

                })
            })
        });
        it('should check permissions NOT A MEMBER', (done) => {
            isAllowed(usersAr[3]._id,projectsAr[0]._id,'read','projects')((err,perm) => {
                assert.equal(perm,'denied');
                isAllowed(usersAr[3]._id,projectsAr[0]._id,'update','projects')((err,perm) => {
                    assert.equal(perm,'denied');
                    isAllowed(usersAr[3]._id,postsAr[0]._id,'read','posts')((err,perm) => {
                        assert.equal(perm,'denied');
                        isAllowed(usersAr[3]._id,postsAr[0]._id,'delete','posts')((err,perm) => {
                            assert.equal(perm,'denied');
                            isAllowed(usersAr[3]._id,datasetsAr[0]._id,'read','datasets')((err,perm) => {
                                assert.equal(perm,'denied');
                                isAllowed(usersAr[3]._id,datasetsAr[0]._id,'update','datasets')((err,perm) => {
                                    assert.equal(perm,'denied');
                                    isAllowed(usersAr[3]._id,plotsAr[0]._id,'read','plots')((err,perm) => {
                                        assert.equal(perm,'denied');
                                        isAllowed(usersAr[3]._id,plotsAr[0]._id,'delete','plots')((err,perm) => {
                                            assert.equal(perm,'denied');
                                            done();
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        });

        it('should test isAllowed asserts errors', (done) => {
            isAllowed(usersAr[0]._id,projectsAr[0]._id,'read','users')((err,perm) => {
                assert.ok(err instanceof Error);
                isAllowed(projectsAr[0]._id,projectsAr[0]._id,'read','projects')((err,perm) => {
                    assert.ok(err instanceof Error);
                    isAllowed(usersAr[0]._id,usersAr[0]._id,'read','projects')((err,perm) => {
                        assert.ok(err instanceof Error);
                        console.log('5');
                        done();
                    });
                });
            });
        });
    });

    describe('test isAllowedCreate',() => {
        //user_id, method, model_to_create, in_obj_id
        //0 -> project owner
        //1 -> post owner
        //2 -> simple member
        //3 -> not a member
        it('should check  create permissions FOR PROJECT OWNER', (done) => {
            console.log('6');
            isAllowedCreate(usersAr[0]._id, 'create', 'projects',null)((err, perm) => {
                assert.equal(perm, 'allowed');
                isAllowedCreate(usersAr[0]._id, 'create', 'posts',projectsAr[0]._id)((err, perm) => {
                    assert.equal(perm, 'allowed');
                    isAllowedCreate(usersAr[0]._id, 'create', 'datasets',projectsAr[0]._id)((err, perm) => {
                        assert.equal(perm, 'allowed');
                        isAllowedCreate(usersAr[0]._id, 'create', 'plots',postsAr[0]._id)((err, perm) => {
                            assert.equal(perm, 'denied');
                            done();
                        })
                    })

                })
            })
        });
        it('should check create permissions FOR POST OWNER', (done) =>{
            isAllowedCreate(usersAr[1]._id, 'create', 'projects',null)((err, perm) => {
                assert.equal(perm, 'allowed');
                isAllowedCreate(usersAr[1]._id, 'create', 'posts',projectsAr[0]._id)((err, perm) => {
                    assert.equal(perm, 'allowed');
                    isAllowedCreate(usersAr[1]._id, 'create', 'datasets',projectsAr[0]._id)((err, perm) => {
                        assert.equal(perm, 'allowed');
                        isAllowedCreate(usersAr[1]._id, 'create', 'plots',postsAr[0]._id)((err, perm) => {
                            assert.equal(perm, 'allowed');
                            done();
                        })
                    })
                })
            })
        });
        it('should check create permissions FOR SIMPLE MEMBER', (done) =>{
            isAllowedCreate(usersAr[2]._id, 'create', 'projects',null)((err, perm) => {
                assert.equal(perm, 'allowed');
                isAllowedCreate(usersAr[2]._id, 'create', 'posts',projectsAr[0]._id)((err, perm) => {
                    assert.equal(perm, 'allowed');
                    isAllowedCreate(usersAr[2]._id, 'create', 'datasets',projectsAr[0]._id)((err, perm) => {
                        assert.equal(perm, 'allowed');
                        isAllowedCreate(usersAr[2]._id, 'create', 'plots',postsAr[0]._id)((err, perm) => {
                            assert.equal(perm, 'denied');
                            done();
                        })
                    })
                })
            })
        });
        it('should check create permissions FOR NOT A MEMBER', (done) => {
            isAllowedCreate(usersAr[3]._id, 'create', 'projects', null)((err, perm) => {
                assert.equal(perm, 'allowed');
                isAllowedCreate(usersAr[3]._id, 'create', 'posts', projectsAr[0]._id)((err, perm) => {
                    assert.equal(perm, 'denied');
                    isAllowedCreate(usersAr[3]._id, 'create', 'datasets', projectsAr[0]._id)((err, perm) => {
                        assert.equal(perm, 'denied');
                        isAllowedCreate(usersAr[3]._id, 'create', 'plots', postsAr[0]._id)((err, perm) => {
                            assert.equal(perm, 'denied');
                            done();
                        })
                    })
                })
            })
        });

        it('should test isAllowedCreate asserts errors', (done) => {
            isAllowedCreate(usersAr[3]._id, 'create', 'users', null)((err, perm) => {
                assert.ok(err instanceof Error);
                isAllowedCreate(projectsAr[0]._id, 'create', 'projects', null)((err, perm) => {
                    assert.ok(err instanceof Error);
                    isAllowedCreate(usersAr[3]._id, 'create', 'posts', null)((err, perm) => {
                        assert.ok(err instanceof Error);
                        isAllowedCreate(usersAr[3]._id, 'read', 'posts', null)((err, perm) => {
                            assert.ok(err instanceof Error);
                            isAllowedCreate(usersAr[3]._id, 'read', 'plots', projectsAr[0]._id)((err, perm) => {
                                assert.ok(err instanceof Error);
                                console.log('7');
                                done();
                            });
                        });
                    });
                });
            });
        });
    });


    describe('test removeUserRole',() => {
        it('should remove permissions', (done) => {
            console.log('8');
            removeUserRole(usersAr[0]._id,projectsAr[0]._id,'owner','projects')((err,result) => {
                if (err) throw err;
                removeUserRole(usersAr[1]._id, projectsAr[0]._id, 'member', 'projects')((err, proj) => {
                    if(err) throw err;
                    removeUserRole(usersAr[2]._id, projectsAr[0]._id, 'member', 'projects')((err, proj) => {
                        if(err) throw err;
                        removeUserRole(usersAr[1]._id, postsAr[0]._id, 'owner', 'posts')((err, proj) => {
                            if(err) throw err;
                            done();
                        });
                    });
                });
            })
        });
        it('should test remove asserts errors',  (done) => {
            removeUserRole(usersAr[0]._id, projectsAr[0]._id, 'owner', 'users')((err, proj) => {
                assert.ok(err instanceof Error);
                removeUserRole(usersAr[1]._id, projectsAr[0]._id, 'member', 'plots')((err, proj) => {
                    assert.ok(err instanceof Error);
                    removeUserRole(projectsAr[0]._id, projectsAr[0]._id, 'member', 'projects')((err, proj) => {
                        assert.ok(err instanceof Error);
                        removeUserRole(usersAr[1]._id, usersAr[1]._id, 'member', 'projects')((err, proj) => {
                            assert.ok(err instanceof Error);
                            removeUserRole(usersAr[1]._id, projectsAr[0]._id, 'member', 'projects')((err, proj) => {
                                assert.ok(err instanceof Error);
                                removeUserRole(usersAr[2]._id, projectsAr[0]._id, 'owner', 'projects')((err, proj) => {
                                    assert.ok(err instanceof Error);
                                    removeUserRole(usersAr[1]._id, projectsAr[0]._id, 'owner', 'projects')((err, proj) => {
                                        assert.ok(err instanceof Error);
                                        console.log('9');
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

