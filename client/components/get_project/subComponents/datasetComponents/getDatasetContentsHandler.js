
let getDatasetContentsHandlerConstructor = (obj) => {

    let {id,get,gotContents} =obj;

    let getDatasetContentsHandler = () => {
        get({uri:`/datasets/?_id=${id()}`},(err,response,body) => {
            if (err) return gotContents(new Error(err));
            return gotContents(null,JSON.parse(body).data);
        })
    };
    return getDatasetContentsHandler;
};
module.exports = getDatasetContentsHandlerConstructor;