let getProjectDataComponentConstructor = (dependencies) => {
    let {get,errorHandler} = dependencies;
    let getData = (cb) => {
        get({uri:`/projects/?_id=${store.getItem('project_id')}`}, (err,response,body) => {
            if(errorHandler({err,response})) {
                return;
            }
            return cb(null, JSON.parse(body).data);
        });
    };

    return {getData};
};
module.exports = getProjectDataComponentConstructor;