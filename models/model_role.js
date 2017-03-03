var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost/test';
mongoose.createConnection(dbHost);

class PermissionsFactory {
    constructor(firstSchema,secondSchema) {
        this.firstSchema=firstSchema;
        this.secondSchema=secondSchema;
        this.apidao=null;
    }
    setup(modelName,DAOclass){
        var schema= new mongoose.Schema({
            user_id: [{
                type:mongoose.Schema.Types.ObjectId, ref: this.firstSchema
            }],
            obj_id: [{
                type:mongoose.Schema.Types.ObjectId, ref: this.secondSchema
            }],
            view: Boolean,
            edit: Boolean,
            del: Boolean,
            create: Boolean
        });
        schema.index({user_id:1,obj_id:1},{unique:true}); // together unique

        var model=mongoose.model(modelName,schema);
        this.apidao=new DAOclass.DAO(model);
        return model;
    }

    //CRUD operations
    create(data, callback) {
        this.apidao.create(data, callback);
    }
    read(query, callback) {
        this.apidao.read(query, callback);
    }
    update(query, update, callback) {
        this.apidao.update(query, update, callback);
    }
    delete(query, callback) {
        this.apidao.delete(query, callback);
    }
}

module.exports = {
    PermissionsFactory:PermissionsFactory
};