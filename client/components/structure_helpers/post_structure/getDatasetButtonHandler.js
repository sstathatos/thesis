let getDatasetButtonHandlerConstructor = (obj) => {

    let {get,dset_id} =obj;

    let getDatasetButtonHandler = () => {
        get({uri:`/datasets/?_id=${dset_id}`},(err,response,body) => {
            console.log(body);
            // if (err) return gotContents(new Error(err));
            //
            // return gotContents(null,{data:JSON.parse(body).data,caller:getproject_dataset_tr_el});
        })
    };
    return getDatasetButtonHandler;
};
module.exports = getDatasetButtonHandlerConstructor;