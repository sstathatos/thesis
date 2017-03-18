var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost/test';
mongoose.createConnection(dbHost);

class PermissionsFactory {
    constructor(firstmodelname, secondmodelname, model_name, dao_class) {
        this.firstmodelname = firstmodelname;
        this.secondmodelname = secondmodelname;
        this.model_name = model_name;

        let schema = mongoose.Schema({
            user_id: {
                type: mongoose.Schema.Types.ObjectId, ref: this.firstmodelname
            },
            obj_id: {
                type: mongoose.Schema.Types.ObjectId, ref: this.secondmodelname
            },
            read: Boolean,
            put: Boolean,
            delete: Boolean,
            post: Boolean
        });
        schema.index({user_id: 1, obj_id: 1}, {unique: true}); // together unique todo it doesnt work
        this.dao = new dao_class(mongoose.model(model_name, schema));
    }
}

module.exports = {
    PermissionsFactory:PermissionsFactory
};