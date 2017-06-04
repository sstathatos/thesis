let html = require('../../html');

let createPostGetDatasetListConstructor = (id,get) => {

    let getData = (cb) => {
        get({uri:`/datasetlist/?_id=${id}`}, (err,response,body) => {
            if (err) return cb(new Error(err));
            try {
                return cb(null,JSON.parse(body).data);
            }
            catch(e) {
                return cb(new Error(e));
            }
        })
    };

    return {getData};
};
module.exports = createPostGetDatasetListConstructor;