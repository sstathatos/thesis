let createPostGetDatasetListConstructor = (id,get) => {
    let getData = (cb) => {
        get({uri:`/datasetlist/?_id=${id}`}, (err,response,body) => {
            if (err) return cb(new Error(err));
            return cb(null,JSON.parse(body).data);
        })
    };

    return {getData};
};
module.exports = createPostGetDatasetListConstructor;