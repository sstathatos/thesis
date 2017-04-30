let mongoose = require('mongoose');
let DAOConstructor = require('./DAOConstructor');
let schemaConstructor = require('./schemaConstructor');


let entityConstructor = (obj) => {
    let {model_name, schema_name} = obj;
    let model = mongoose.model(model_name, mongoose.Schema(schema_name));
    let dao = DAOConstructor({model});

    return {
        model_name,
        schema_name,
        model,
        dao
    }
};

let entitiesGenerator = (() => {

    let {UserSchema, ProjectSchema, PostSchema, PlotSchema, DatasetSchema} = schemaConstructor();
    return {
        users: entityConstructor({model_name: "users", schema_name: UserSchema}),
        projects: entityConstructor({model_name: "projects", schema_name: ProjectSchema}),
        posts: entityConstructor({model_name: "posts", schema_name: PostSchema}),
        datasets: entityConstructor({model_name: "datasets", schema_name: DatasetSchema}),
        plots: entityConstructor({model_name: "plots", schema_name: PlotSchema})
    }
})();

module.exports = entitiesGenerator;








