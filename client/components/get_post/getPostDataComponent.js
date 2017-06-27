let getPostDataComponentConstructor = (id,dependencies) => {
    let {get,errorHandler} =  dependencies;
    let getData = (cb) => {
        get({uri:`/posts/?_id=${id}`}, (err,response,body) => {
            if(errorHandler({err,response})) {
                return;
            }
            return cb(null, JSON.parse(body).data);
        });
    };

    return {getData};
};
module.exports = getPostDataComponentConstructor;