var mongoose= require('mongoose');
mongoose.Promise = require('bluebird');

//General CRUD functions for Entities
class DAO {
    constructor(model) {
        this.model= model;
    }

    create(data,callback) {
        this.validate(data,this, function(err) {
            if (err) callback(err);
            else {
                data.save(function(err, data) {
                    if(err) callback(err,null);
                    else if (data) callback(null,data);
                    else callback("Data not found",null);
                });
            }
        });
    }
    read(query,callback) {
        this.model.find(query,function(err, data) {
            if(err) callback(err,null);
            else if (data) callback(null,data);
            else callback("Data not found",null);
        });
    }
    update(query,newdata, callback) {
        this.model.findOneAndUpdate(query, newdata, {new: true}, function(err, data){
            if(err) callback(err,null);
            else if (data) callback(null,data);
            else callback("Data not found",null);
        });
    }
    delete(query, callback) {
        this.model.findOneAndRemove(query, function(err,data) {
            if(err) callback(err,null);
            else if (data) callback(null,data);
            else callback("Data not found",null);
        });
    }
    validate(data,self, callback){
        callback(null);
    }
}

//Specific User functions
class UserDAO extends DAO {
    constructor(model) {
        super(model);
    }
    //Validate function for a user. Username and email must be unique name in db
    validate (data,self,callback) {
        var promises=[];
        var val=["username","email"];
        for(var i in val) {
            var pro= new Promise(function(resolve, reject) {
                var query={[val[i]]:data[val[i]]};
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
        Promise.all(promises).then(function() {
            callback(null);
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

module.exports={
    DAO:DAO,
    UserDAO:UserDAO,
    ProjectDAO:ProjectDAO
}
