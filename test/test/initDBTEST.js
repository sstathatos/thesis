let assert= require('assert');
const MongoClient = require('mongodb').MongoClient;
let APIConstructor=require('../../API/index');
let {createObj, readObjs,addUserRole}=APIConstructor;
let usersArr=[];
let projectsArr=[];
let postsArr=[];
let datasetsArr=[];

describe('initialize my db', function () {
    this.timeout(5000);

    before(function (done) {
        let url = 'mongodb://localhost/daotest';
        MongoClient.connect(url, function (err, db) {
            if (err) throw new Error(err);
            db.dropDatabase((err) => {
                if (err) throw new Error(err);
                db.close();
                done();
            });
        });
    });

    describe('init my db', function () {
        it('should create get_user_profile and create_project', function (done) {
            createObj('users', {name: `stefanos`, username: `stefanos`,
                email: `stefanos`, password: `stefanos`})((err, data) => {
                if (err) throw err;
                usersArr[0] = data;
                createObj('users', {name: `ken`, username: `ken`,
                    email: `ken`, password: `ken`})((err, data) => {
                    if (err) throw err;
                    usersArr[1] = data;
                    createObj('users', {name: `filip`, username: `filip`,
                        email: `filip`, password: `filip`})((err, data) => {
                        if (err) throw err;
                        usersArr[2] = data;
                        createObj('users', {name: `kwnna`, username: `kwnna`,
                            email: `kwnna`, password: `kwnna`})((err, data) => {
                            if (err) throw err;
                            usersArr[3] = data;
                            createObj('projects', {name: `project test`, description: `project test`})((err, proj) => {
                                if (err) throw err;
                                projectsArr[0] = proj;
                                readObjs('users', {})((err, users) => {
                                    if (err) throw err;
                                    addUserRole(users[0]._id, proj._id, 'owner', 'projects')((err) => {
                                        if (err) throw err;
                                        addUserRole(users[1]._id, proj._id, 'member', 'projects')((err) => {
                                            if (err) throw err;
                                            addUserRole(users[2]._id, proj._id, 'member', 'projects')((err) => {
                                                if (err) throw err;

                                                createObj('projects', {name: `project test`, description: `project test`})((err, proj) => {
                                                    if (err) throw err;
                                                    projectsArr[0] = proj;
                                                    readObjs('users', {})((err, users) => {
                                                        if (err) throw err;
                                                        addUserRole(users[0]._id, proj._id, 'owner', 'projects')((err) => {
                                                            if (err) throw err;
                                                            addUserRole(users[1]._id, proj._id, 'member', 'projects')((err) => {
                                                                if (err) throw err;
                                                                addUserRole(users[2]._id, proj._id, 'member', 'projects')((err) => {
                                                                    if (err) throw err;
                                                                    done();
                                                                })
                                                            })
                                                        })
                                                    });
                                                });
                                            })
                                        })
                                    })
                                });
                            });
                        });
                    });
                });
            });
        });

        it('should create datasets and posts', function (done) {
            readObjs('projects', {})((err, projs) => {
                if (err) throw err;
                readObjs('users', {})((err, users) => {
                    if (err) throw err;
                    createObj('datasets', {
                        name: `dataset 1`, path_saved: `hdf_files/hdf.h5`,
                        creator: users[0]._id, inproject: projs[0]._id
                    })((err, dset1) => {
                        if (err) throw err;
                        datasetsArr[0] = dset1;
                        createObj('datasets', {
                            name: `dataset 2`, path_saved: `hdf_files/hdf.h5`,
                            creator: users[1]._id, inproject: projs[0]._id
                        })((err, dset2) => {
                            if (err) throw err;
                            datasetsArr[1] = dset2;
                            readObjs('datasets', {})((err, dsets) => {
                                if (err) throw err;
                                readObjs('users', {})((err, users) => {
                                    if (err) throw err;
                                    readObjs('projects', {})((err, projs) => {
                                        if (err) throw err;
                                        createObj('posts', {
                                            title: `post PARENT 1`, description: `post PARENT 1`,
                                            inproject: projs[0]._id, dset_link: dsets[0]._id
                                        })((err, post1) => {
                                            if (err) throw err;
                                            postsArr[0] = post1;
                                            createObj('posts', {
                                                title: `post KID 1`, description: `post KID 1`,
                                                inpost: post1._id, inproject: projs[0]._id, dset_link: dsets[1]._id
                                            })((err, data) => {
                                                if (err) throw err;
                                                postsArr[1] = data;
                                                createObj('posts', {
                                                    title: `post PARENT 2`, description: `post PARENT 2`,
                                                    inproject: projs[0]._id, dset_link: dsets[1]._id
                                                })((err, post2) => {
                                                    if (err) throw err;
                                                    postsArr[2] = post2;
                                                    createObj('posts', {
                                                        title: `post KID 2`,
                                                        description: `post KID 2`,
                                                        inpost: post2._id,
                                                        inproject: projs[0]._id,
                                                        dset_link: dsets[0]._id
                                                    })((err, post4) => {
                                                        if (err) throw err;
                                                        postsArr[3] = post4;
                                                        addUserRole(users[1]._id, post1._id, 'owner', 'posts')((err) => {
                                                            if (err) throw err;
                                                            addUserRole(users[2]._id, post4._id, 'owner', 'posts')((err) => {
                                                                if (err) throw err;
                                                                done();
                                                            })
                                                        })
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
            });
        });

        it('should create plots', function (done) {
            readObjs('posts', {})((err, posts) => {
                if (err) throw err;
                for (let i = 0; i < posts.length; i++) {
                    createObj('plots', {
                        title: `plot ${i}`, description: `plot ${i}`,
                        inpost: posts[i]._id, array_path_saved: `/d3dset`,
                        plot_metadata: {
                            x_axis_name: `x_axis${i}`,
                            y_axis_name: `y_axis${i}`,
                            y: [{name: `f(x1) ${i}`, color: 'red'}, {name: `f(x2) ${i}`, color: 'blue'}],
                            dim1:1,
                            dim2:2,
                            dim3Value:0,
                            dim2Value:0,
                            plot_type: `simple${i}`
                        }
                    })((err, plot) => {
                        if (err) throw err;
                        createObj('plots', {
                            title: `plot ${i}`, description: `plot ${i}`,
                            inpost: posts[i]._id, array_path_saved: `/d3dset`,
                            plot_metadata: {
                                x_axis_name: `x_axis${i}`,
                                y_axis_name: `y_axis${i}`,
                                y: [{name: `f(x1) ${i}`, color: 'red'}, {name: `f(x2) ${i}`, color: 'blue'}],
                                dim1:1,
                                dim2:2,
                                dim3Value:0,
                                dim2Value:0,
                                plot_type: `simple${i}`
                            }
                        })((err) => {
                            if (err) throw err;
                            if (i === posts.length - 1) {
                                done();
                            }
                        });
                    });
                }
            });
        });
    });
});