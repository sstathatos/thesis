var mongoose= require('mongoose');
mongoose.Promise = require('bluebird');

//General CRUD functions for Entities
class DAO {
    constructor(model) {
        this.model= model;
    }

    //todo change data.model
    create(data,callback) {
        let obj=new this.model(data);
        this.model.find().
        obj.save(function(err, data) {
            if(err) throw  err;
            else if (data) callback(null,data);
            else callback(null,null);
        });
    }
    read(query,callback) {
        this.model.findOne(query,function(err, data) {
            if(err) throw err;
            else if (data) callback(null,data);
            else callback(null,null);
        });
    }
    objects(query,callback) {
        this.model.find(query,function(err, data) {
            if(err) throw err;
            else if (data) callback(null,data);
            else callback(null,null);
        });
    }
    update(query,newdata, callback) {
        this.model.findOneAndUpdate(query, newdata, {new: true}, function(err, data){
            if(err) throw err;
            else if (!data) callback(null,null);
            else callback(null,data);
        });
    }
    delete(query, callback) {
        this.model.findOneAndRemove(query, function(err,data) {
            if(err) throw err;
            else if (data) callback(null,data);
            else callback(null,null);
        });
    }

    // remove(callback) {
    //     this.model.find({}).remove(function(err,result) {
    //         if(err) throw err;
    //         else if (result) callback(null,result);
    //         else callback(null,null);
    //     });
    // }

    push(query,newdata,field_name, callback) {
        this.model.findOne(query, function(err,result) {
            if (err) return err;
            else if (result){
                result[field_name].push(newdata);
                result.save(function(error,data) {
                    if(error) {
                        throw error;
                        //callback (error,null);
                    }
                    else callback(null, data);
                });
            }
            else callback(null,null);
        })
    }
}

//Specific User functions
class UserDAO extends DAO {
    constructor(model) {
        super(model);
    }

    create(data,callback) {
        let self=this;
        self.validate(data,self,function(msg) {
            if (msg) {
                callback(msg,null);
            } else self.createcall(data,callback);
        });
    }

    createcall(data,callback) {
        super.create(data,callback);
    }

    //Validate function for a user. Username and email must be unique name in db
    validate (data,self,callback) {
        let promises=[];
        let val=["username","email"];
        for(let i in val) {
            let pro= new Promise(function(resolve, reject) {
                let query={[val[i]]:data[val[i]]};
                self.model.findOne(query)
                    .then(function(result) {
                        if(!result) {
                            resolve();
                        }
                        else {
                            reject();
                        }
                    })
                    .catch(function(error){
                        if (error) throw error;
                    });
            });
            promises.push(pro);
        }
        Promise.all(promises)
            .then(function() {
                callback();
            })
            .catch(function () {
                callback("Username or Email is not unique");

            });
    }
}

// todo users project delete
// todo solve THIS problem
// todo organize route
// todo solve multiple query calls problem
// then continue

//Specific Project functions
class ProjectDAO extends DAO {
    constructor(model) {
        super(model);
    }

    // create(project_info,self,callback) {
    //     DAO.prototype.create(project_info,this,function(err,project_result,self) {
    //         if(err) throw err;
    //         else {
    //             let permission={
    //                 user_id: project_info.user_id,
    //                 obj_id: project_result._id,
    //                 view:true,
    //                 edit:true,
    //                 del:true,
    //                 create:true
    //             };
    //             self.create(permission,self, function(err) {
    //                 if (err) throw err;
    //                 else callback(null,data);
    //             });
    //         }
    //     })
    // }
}
class ProjectPermissionsDAO extends DAO {
    constructor(model) {
        super(model);
    }
}

module.exports={
    DAO:DAO,
    UserDAO:UserDAO,
    ProjectDAO:ProjectDAO,
    ProjectPermissionsDAO:ProjectPermissionsDAO
}
