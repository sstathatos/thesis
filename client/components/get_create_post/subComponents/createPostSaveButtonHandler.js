let createPostSaveButtonHandlerConstructor = (obj) =>{
    let {formEls,dependencies,row_array,plots} = obj;
    let {post} = dependencies;
    let createPostSaveButtonHandler = () => {
        console.log(formEls['static'][1].value,formEls['static'][2].value,row_array,plots);
        //post({uri:'/posts/?'})
    };
    return createPostSaveButtonHandler;
};
module.exports =createPostSaveButtonHandlerConstructor;