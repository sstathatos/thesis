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

let entitiesGenerator = () => {

    let {UserSchema, ProjectSchema, PostSchema, PlotSchema, DatasetSchema} = schemaConstructor();
    let users = entityConstructor({model_name: "users", schema_name: UserSchema});
    let projects = entityConstructor({model_name: "projects", schema_name: ProjectSchema});
    let posts = entityConstructor({model_name: "posts", schema_name: PostSchema});
    let datasets = entityConstructor({model_name: "datasets", schema_name: DatasetSchema});
    let plots = entityConstructor({model_name: "plots", schema_name: PlotSchema});

    return {
        users, projects, posts, datasets, plots
    }
};

module.exports = entitiesGenerator;








