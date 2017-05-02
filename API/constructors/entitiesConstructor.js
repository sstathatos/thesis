let entityConstructor = (obj) => {
    let {model_name, schema_name,DAOConstructor,mongoose} = obj;
    let model = mongoose.model(model_name, mongoose.Schema(schema_name));
    let dao = DAOConstructor({model});

    return {
        model_name,
        schema_name,
        model,
        dao
    }
};

let entitiesConstructor = (obj) => {
    let {schemaConstructor,DAOConstructor,mongoose} = obj;
    let {UserSchema, ProjectSchema, PostSchema, PlotSchema, DatasetSchema} = schemaConstructor(mongoose);
    return {
        users: entityConstructor({model_name: "users", schema_name: UserSchema, DAOConstructor,mongoose}),
        projects: entityConstructor({model_name: "projects", schema_name: ProjectSchema,  DAOConstructor,mongoose}),
        posts: entityConstructor({model_name: "posts", schema_name: PostSchema, DAOConstructor,mongoose}),
        datasets: entityConstructor({model_name: "datasets", schema_name: DatasetSchema, DAOConstructor,mongoose}),
        plots: entityConstructor({model_name: "plots", schema_name: PlotSchema,DAOConstructor,mongoose})
    }
};

module.exports = entitiesConstructor;








