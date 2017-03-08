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
        obj.save(function(err, data) {
            if(err) throw  err;
            else if (data) callback(null,data);
            else callback(null,null);
        });
    }

    insertMany(data, callback) {
        this.model.collection.insert(data, function (err, data) {
            if (err) throw  err;
            else if (data) callback(null, data);
            else callback(null, null);
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
        console.log(query);
        this.model.findOneAndRemove(query, function(err,data) {
            console.log(data);
            if(err) throw err;
            else if (data) callback(null,data);
            else callback(null,null);
        });
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
