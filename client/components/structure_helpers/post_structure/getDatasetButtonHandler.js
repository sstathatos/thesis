let getDatasetButtonHandlerConstructor = (obj) => {

    let {dependencies,dset_id,post_table_div} =obj;
    let {get,gotContentsConstructor,errorHandler} = dependencies;

    let gotContents = gotContentsConstructor(dependencies);

    let getDatasetButtonHandler = () => {
        get({uri:`/datasets/?_id=${dset_id}`},(err,response,body) => {
            if(errorHandler({err,response})) {
                return;
            }
            return gotContents(null,{data:JSON.parse(body).data,caller:post_table_div,dset_id});
        })
    };
    return getDatasetButtonHandler;
};
module.exports = getDatasetButtonHandlerConstructor;