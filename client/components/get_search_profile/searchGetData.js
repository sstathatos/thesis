let searchGetDataConstructor = (search,get) => {

    let getData = (cb) => {
        get({uri:`/search/?term=${search}`},(err,response,body) => {
            if (err) return cb(new Error(err));
            return cb(null,JSON.parse(body).data);
        });
    };

    return {getData};
};
module.exports = searchGetDataConstructor;