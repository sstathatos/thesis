let fullPostButtonHandlerConstructor = (obj) => {

    let {get,post_id} =obj;

    let fullPostButtonHandler = () => {
        get({uri:`/posts/?_id=${post_id}`},(err,response,body) => {
            // if (err) return gotContents(new Error(err));
            //
            // return gotContents(null,{data:JSON.parse(body).data,caller:getproject_dataset_tr_el});
        })
    };
    return fullPostButtonHandler;
};
module.exports = fullPostButtonHandlerConstructor;