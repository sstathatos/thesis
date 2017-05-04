let assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
let util = require('util');
let APIConstructor=require('../../API');
let {createObj, readObjs, updateObj, deleteObj}=APIConstructor;

describe('test my DB CRUD OPERATIONS', function () {
    this.timeout(0);
    before(function (done) {
        let url = 'mongodb://localhost/daotest';
        MongoClient.connect(url, function (err, db) {
            db.dropDatabase(() => {
                db.close();
                done();
            });
        });
    });

    describe('test CREATE', function () {
        it('should create users', function (done) {
            for (let i = 0; i < 10; i++) {
                createObj('users', {name: `stefanos${i}`, username: `stefanos${i}`, email: `stefanos${i}`, password: `stefanos${i}`})((err, data) => {
                    if (err) throw err;
                    createObj('users', {name: `stefanos${i}`, username: `stefanos${i}`, email: `stefanos${i}`, password: `stefanos${i}`})((err, data) => {
                        assert.ok(err instanceof Error);
                        createObj('users', {name: `ken${i}`, username: `ken${i}`, email: `ken${i}`, password: `ken${i}`})((err, data) => {
                            if (err) throw err;
                            if (i === 9) {
                                console.log('1');
                                done();
                            }
                        });
                    });
                });
            }
        });
        it('should create projects', function (done) {
            for (let i = 0; i < 5; i++) {
                if (i === 0) console.log('2');
                createObj('projects', {name: `project stefanos${i}`, description: `project stefanos${i}`})((err, data) => {
                    if (err) throw err;
                    createObj('projects', {name: `project ken${i}`, description: `project ken${i}`})((err, data) => {
                        if (err) throw err;
                        if (i === 4) {
                            console.log('3');
                            done();
                        }
                    });
                });
            }
        });
        it('should create datasets', function (done) {
            readObjs('projects', {})((err, projs) => {
                if (err) throw err;
                readObjs('users', {})((err, users) => {
                    if (err) throw err;
                    for (let i = 0; i < projs.length / 2; i++) {
                        if (i === 0) console.log('4');
                        createObj('datasets', {name: `dataset stefanos${i}`,path_saved:`hdf_files/hdf${i}.h5`, creator:users[i]._id, inproject: projs[i]._id})((err, post1) => {
                            if (err) throw err;
                            createObj('datasets', {name: `dataset stefanos${i}`,path_saved:`hdf_files/hdf${i}.h5`, inproject: projs[i]._id})((err, data) => {
                                assert.ok(err instanceof Error);
                                createObj('datasets', {name: `dataset stefanos${i}`,path_saved:`hdf_files/hdf${i}.h5`,creator:users[i]._id})((err, data) => {
                                    assert.ok(err instanceof Error);
                                    createObj('datasets', {name: `dataset ken${i}`,path_saved:`hdf_files/hdf${i}.h5`, creator:users[i]._id, inproject: projs[i]._id})((err, data) => {
                                        if (err) throw err;
                                        if (i === projs.length / 2-1) {
                                            console.log('5');
                                            done();
                                        }
                                    });
                                });
                            });
                        });
                    }
                });
            });
        });
        it('should create posts without inpost', function (done) {
            readObjs('projects', {})((err, projs) => {
                if (err) throw err;
                readObjs('datasets', {})((err, dset) => {
                    if (err) throw err;
                    for (let i = 0; i < projs.length / 2; i++) {
                        if (i === 0) console.log('6');
                        createObj('posts', {title: `post stefanos${i}`, description: `post stefanos${i}`, inproject: projs[i]._id,dset_link:dset[i]._id})((err, data) => {
                            if (err) throw err;
                            createObj('posts', {title: `post stefanos${i}`, description: `post stefanos${i}`})((err, data) => {
                                assert.ok(err instanceof Error);
                                createObj('posts', {title: `post stefanos${i}`, description: `post stefanos${i}`,dset_link:dset[i]._id})((err, data) => {
                                    assert.ok(err instanceof Error);
                                    createObj('posts', {title: `post ken${i}`, description: `post ken${i}`, inproject: projs[i]._id,dset_link:dset[i]._id})((err, data) => {
                                        if (err) throw err;
                                        if (i === projs.length / 2-1) {
                                            console.log('7');
                                            done();
                                        }
                                    });
                                });
                            });
                        });
                    }
                });
            });
        });
        it('should create posts with inpost', function (done) {
            readObjs('projects', {})((err, projs) => {
                if (err) throw err;
                readObjs('datasets', {})((err, dset) => {
                    if (err) throw err;
                    for (let i = 0; i < projs.length / 2; i++) {
                        if (i === 0) console.log('8');
                        createObj('posts', {title: `post with stefanos${i}`, description: `post with stefanos${i}`, inproject: projs[i]._id,dset_link:dset[i]._id})((err, post1) => {
                            if (err) throw err;
                            createObj('posts', {title: `post with stefanos${i}`, description: `post with stefanos${i}`,dset_link:dset[i]._id})((err, data) => {
                                assert.ok(err instanceof Error);
                                createObj('posts', {title: `post ken${i}`, description: `post ken${i}`, inproject: projs[i]._id,inpost:post1._id,dset_link:dset[i]._id})((err, data) => {
                                    if (err) throw err;
                                    if (i === projs.length / 2-1) {
                                        console.log('9');
                                        done();
                                    }
                                });
                            });
                        });
                    }
                });
            });
        });

        it('should create plots', function (done) {
            readObjs('posts', {})((err, posts) => {
                if (err) throw err;
                for (let i = 0; i < posts.length / 2; i++) {
                    if (i === 0) console.log('10');
                    createObj('plots', {title: `plot stefanos${i}`, description: `plot stefanos${i}`, inpost: posts[i]._id,array_path_saved:`array${i}`,
                        plot_metadata: {
                            x_axis_name: `x_axis${i}`,
                            y_axis_name: `y_axis${i}`,
                            y: [{name: `f(x1) ${i}`, color: 'red'},{name: `f(x2) ${i}`, color: 'blue'}],
                            dimension_name_x: `dim0 ${i}`,
                            dimension_name_y: `dim1 ${i}`,
                            plot_type: `simple${i}`
                        }
                    })((err, plot) => {
                        if (err) throw err;
                        createObj('plots', {title: `plot stefanos${i}`, description: `plot stefanos${i}`,array_path_saved:`array${i}`,
                            plot_metadata: {
                                x_axis_name: `x_axis${i}`,
                                y_axis_name: `y_axis${i}`,
                                y: [{name: `f(x1) ${i}`, color: 'red'},{name: `f(x2) ${i}`, color: 'blue'}],
                                dimension_name_x: `dim0 ${i}`,
                                dimension_name_y: `dim1 ${i}`,
                                plot_type: `simple${i}`
                            }
                        })((err, plot) => {
                            assert.ok(err instanceof Error);
                            createObj('plots', {title: `plot ken${i}`, description: `plot ken${i}`,inpost: posts[i]._id,array_path_saved:`array${i}`,
                                plot_metadata: {
                                    x_axis_name: `x_axis${i}`,
                                    y_axis_name: `y_axis${i}`,
                                    y: [{name: `f(x1) ${i}`, color: 'orange'},{name: `f(x2) ${i}`, color: 'black'}],
                                    dimension_name_x: `dim0 ${i}`,
                                    dimension_name_y: `dim1 ${i}`,
                                    plot_type: `simple${i}`
                                }
                            })((err, plot) => {
                                if (err) throw err;
                                if (i === posts.length / 2-1) {
                                    console.log('11');
                                    done();
                                }
                            });
                        });
                    });
                }
            });
        });
    });

    describe('test UPDATE', function () {
        it('should update users', function (done) {
            readObjs('users',{})((err,users) =>{
                if (err) throw err;
                for (let i = 0; i < users.length / 2; i++) {
                    if (i === 0) console.log('12');
                    updateObj('users',{username: users[i].username},{name:users[i+1].name,username:users[i+1].username})((err,user1) => {
                        assert.ok(err instanceof Error);
                        updateObj('users',{username:users[i].username},{name:users[i].name+"XYZ",username:users[i].username+"XYZ"})((err,user1) => {
                            if (err) throw err;
                            updateObj('users',{username:`asdfasdf`},{name:`stefanosXY`,username:`stefanosXY`})((err,user1) => {
                                assert.ok(err instanceof Error);
                                updateObj('users',{username:users[i].username+"XYZ"},{name:users[i].name+"XYZ",password:users[i].password+"XYZ"})((err,user1) => {
                                    if (err) throw err;
                                    updateObj('users',{username:users[i].username+"XYZ"},{email:users[i+1].email})((err,user1) => {
                                        assert.ok(err instanceof Error);
                                        if(i===users.length/2-1) {
                                            console.log('13');
                                            done();
                                        }
                                    })
                                })
                            })
                        })
                    })
                }
            });
        });
        it('should update documents', function (done) {
            console.log('14');
            updateObj('projects',{name: 'asdfdsa'},{name:'kalimera',description:'hello there'})((err,proj1) => {
                assert.ok(err instanceof Error);
                updateObj('projects',{name: 'project stefanos1'},{name:"PROJECT STEFANOS1",description: 'PROJECT STEFANOS1'})((err,user1) => {
                    if (err) throw err;
                });
            });
            updateObj('posts',{title: 'asdfdsa'},{title:'kalimera',description:'hello there'})((err,proj1) => {
                assert.ok(err instanceof Error);
                updateObj('posts',{title: 'post stefanos1'},{title:"POST STEFANOS1",description: 'POST STEFANOS1'})((err,user1) => {
                    if (err) throw err;
                });
            });
            updateObj('datasets',{name: 'asdfdsa'},{name:'kalimera',path_saved:'hello there'})((err,proj1) => {
                assert.ok(err instanceof Error);
                updateObj('datasets',{name: 'dataset stefanos1'},{name:"DATASET STEFANOS1",path_saved: 'DATASET STEFANOS1'})((err,user1) => {
                    if (err) throw err;
                });
            });
            updateObj('plots',{title: 'asdfdsa'},{title:'kalimera',description:'hello there'})((err,proj1) => {
                assert.ok(err instanceof Error);
                updateObj('plots',{title: 'plot stefanos1'},{title:"PLOT STEFANOS1",description: 'PLOT STEFANOS1'})((err,user1) => {
                    if (err) throw err;
                    console.log('15');
                    done();
                });
            });
        });
    });

    describe('test DELETE', function () {
        it('should delete documents', function (done) {
            console.log('16');
            deleteObj('users',{name: 'asdfdsa'})((err,proj1) => {
                assert.ok(err instanceof Error);
                deleteObj('users',{name: 'stefanos1XYZ'})((err,user1) => {
                    if (err) throw err;
                    deleteObj('users',{})((err,user1) => {
                        assert.ok(err instanceof Error);
                    });
                });
            });
            deleteObj('projects',{name: 'asdfdsa'})((err,proj1) => {
                assert.ok(err instanceof Error);
                deleteObj('projects',{name: 'project stefanos2'})((err,user1) => {
                    if (err) throw err;
                    deleteObj('projects',{})((err,user1) => {
                        assert.ok(err instanceof Error);
                    });
                });
            });
            deleteObj('posts',{title: 'asdfdsa'})((err,proj1) => {
                assert.ok(err instanceof Error);
                deleteObj('posts',{title: 'post stefanos2'})((err,user1) => {
                    if (err) throw err;
                    deleteObj('posts',{})((err,user1) => {
                        assert.ok(err instanceof Error);
                    });
                });
            });
            deleteObj('datasets',{name: 'asdfdsa'})((err,proj1) => {
                assert.ok(err instanceof Error);
                deleteObj('datasets',{name: 'dataset stefanos2'})((err,user1) => {
                    if (err) throw err;
                    deleteObj('datasets',{})((err,user1) => {
                        assert.ok(err instanceof Error);
                    });
                });
            });
            deleteObj('plots',{title: 'asdfdsa'})((err,proj1) => {
                assert.ok(err instanceof Error);
                deleteObj('plots',{title: 'plot stefanos2'})((err,user1) => {
                    if (err) throw err;
                    deleteObj('plots',{})((err,user1) => {
                        assert.ok(err instanceof Error);
                        console.log('17');
                        done();
                    });

                });
            });
        });
    });

});
