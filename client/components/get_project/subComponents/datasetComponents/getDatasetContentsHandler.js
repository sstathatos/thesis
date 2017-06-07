let html =require('../../../html');

let getDatasetContentsHandlerConstructor = (obj) => {

    let {id,get,gotContents,getproject_dataset_tr_el} =obj;

    let getDatasetContentsHandler = () => {
        get({uri:`/datasets/?_id=${id()}`},(err,response,body) => {
            if (err) return gotContents(new Error(err));

            return gotContents(null,{data:JSON.parse(body).data,caller:getproject_dataset_tr_el});
        })
    };
    return getDatasetContentsHandler;
};
module.exports = getDatasetContentsHandlerConstructor;