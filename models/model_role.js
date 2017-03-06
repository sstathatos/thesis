var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost/test';
mongoose.createConnection(dbHost);

class PermissionsFactory {
    constructor(firstSchema,secondSchema,model_name,dao_class) {
        this.firstSchema = firstSchema;
        this.secondSchema = secondSchema;
        this.model_name = model_name;
        this.dao_class = dao_class;

        var schema= mongoose.Schema({
            user_id: {
                type: mongoose.Schema.Types.ObjectId, ref: this.firstSchema
            },
            obj_id: {
                type: mongoose.Schema.Types.ObjectId, ref: this.secondSchema
            },
            view: Boolean,
            edit: Boolean,
            del: Boolean,
            create: Boolean
        })
        schema.index({user_id:1,obj_id:1},{unique:true}); // together unique
        return this.dao = new this.dao_class(mongoose.model(model_name,schema));
    }
}

module.exports = {
    PermissionsFactory:PermissionsFactory
};