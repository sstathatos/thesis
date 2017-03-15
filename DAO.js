var mongoose= require('mongoose');
mongoose.Promise = require('bluebird');

//General CRUD functions for Entities
class DAO {
    constructor(model) {
        this.model= model;
    }

    create(data,callback) {
        let obj=new this.model(data);
        obj.save(function(err, data) {
            if (err) callback(err, null);
            else if (data) callback(null,data);
            else callback(null,null);
        });
    }

    insertMany(data, callback) {
        this.model.collection.insert(data, function (err, data) {
            if (err) callback(err, null);
            else if (data) callback(null, data);
            else callback(null, null);
        });
    }
    read(query,callback) {
        this.model.findOne(query,function(err, data) {
            if (err) callback(err, null);
            else if (data) callback(null,data);
            else callback(null,null);
        });
    }

    all() {
        return this.model.find({});
    }

    update(query,newdata, callback) {
        this.model.findOneAndUpdate(query, newdata, {new: true}, function(err, data){
            if (err) callback(err, null);
            else if (!data) callback(null,null);
            else callback(null,data);
        });
    }
    delete(query, callback) {
        this.model.findOneAndRemove(query, function(err,data) {
            if (err) callback(err, null);
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
        self.validate(data, self, (msg) => {
            if (msg) {
                callback(msg,null);
            } else super.create(data, callback);
        });
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

//Specific Project functions
class ProjectDAO extends DAO {
    constructor(model) {
        super(model);
    }
}

class PermissionsDAO extends DAO {

// todo    MANAGERS

    // permissions.dao.by_username("filip", () =>{
    //
    // });

    by_userid(user_id) {
        this.dao.find({user_id: user_id})
    }

    // users.dao.findOne({'username': username}, {_id}, (userid) => {
    //     console.log(userid);
    //     // this.all().find({'user_id': id}, (results) => {
    //     //     cb(err, results);
    //     // });
    // });


    // this.all().populate({path: 'user_id', select: 'username -_id'}).find({'user_id.username': 'filip'}).exec((err, result) => {
    //     console.log(result)
    // });
    //return this.model.find({user = user})

}

class ProjectPermissionsDAO extends PermissionsDAO {
    constructor(model) {
        super(model);
    }

}

module.exports={
    DAO:DAO,
    UserDAO:UserDAO,
    ProjectDAO:ProjectDAO,
    ProjectPermissionsDAO:ProjectPermissionsDAO
};
