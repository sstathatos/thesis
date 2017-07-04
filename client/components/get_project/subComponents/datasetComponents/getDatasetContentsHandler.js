let getDatasetContentsHandlerConstructor = (obj) => {
    let {id,dependencies,gotContents,contents_div} =obj;

    let {get,errorHandler} = dependencies;

    let getDatasetContentsHandler = () => {
        get({uri:`/datasets/?_id=${id()}`},(err,response,body) => {
            if(errorHandler({err,response})) {
                return;
            }

            return gotContents(null,{data:JSON.parse(body).data,caller:contents_div,dset_id:id()});
        })
    };
    return getDatasetContentsHandler;
};
module.exports = getDatasetContentsHandlerConstructor;