let searchGetDataConstructor = (search,dependencies) => {
    let {get,errorHandler} =  dependencies;
    let getData = (cb) => {
        get({uri:`/search/?term=${search}`},(err,response,body) => {
            if(errorHandler({err,response})) {
                return;
            }
            return cb(null,JSON.parse(body).data);
        });
    };

    return {getData};
};
module.exports = searchGetDataConstructor;