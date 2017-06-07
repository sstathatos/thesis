let getDatasetContentsComponentConstructor = (id,get) => {

    let getData = (cb) => {
        get({uri:`/datasets/?_id=${id}`}, (err,response,body) => {
            let {data} =JSON.parse(body);
            if (err) return cb(new Error(err));
            return cb(null, data);
        });
    };

    return {getData};
};
module.exports = getDatasetContentsComponentConstructor;