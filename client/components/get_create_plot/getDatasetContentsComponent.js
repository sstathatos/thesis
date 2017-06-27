let getDatasetContentsComponentConstructor = (obj) => {

    let {dataset_id,dependencies} = obj;
    let {get,errorHandler} =  dependencies;
    let getData = (cb) => {
        get({uri:`/datasets/?_id=${dataset_id}`}, (err,response,body) => {
            if(errorHandler({err,response})) {
                return;
            }

            let {data} =JSON.parse(body);
            return cb(null, data);
        });
    };

    return {getData};
};
module.exports = getDatasetContentsComponentConstructor;