let getDatasetContentsHandlerConstructor = (obj) => {
    let {id,get,gotContents,contents_div} =obj;

    let getDatasetContentsHandler = () => {
        get({uri:`/datasets/?_id=${id()}`},(err,response,body) => {
            if (err) return gotContents({err:new Error(err),response});

            return gotContents(null,{data:JSON.parse(body).data,caller:contents_div,dset_id:id()});
        })
    };
    return getDatasetContentsHandler;
};
module.exports = getDatasetContentsHandlerConstructor;