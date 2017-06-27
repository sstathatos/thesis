let createPostGetDatasetListConstructor = (id,dependencies) => {
    let {get,errorHandler} = dependencies;
    let getData = (cb) => {
        get({uri:`/datasetlist/?_id=${id}`}, (err,response,body) => {
            if(errorHandler({err,response})) {
                return;
            }
            return cb(null,JSON.parse(body).data);
        })
    };

    return {getData};
};
module.exports = createPostGetDatasetListConstructor;