let createPostComponentConstructor = (obj) => {
    let {get,errorHandler,createPostFormComponentConstructor,createPostListComponentConstructor,
        createPostGetDatasetListConstructor} = obj;

    let id = store.getItem('project_id');
    let createPostFormComponent = createPostFormComponentConstructor(obj);
    let createPostListComponent = createPostListComponentConstructor(obj);
    let createPostGetDatasetListComponent = createPostGetDatasetListConstructor(id,get);

    let init = () => {
        return {
            formEls:createPostFormComponent.init(),
            listEls:createPostListComponent.init()
        }
    };

    let update = (obj) => {
        let {listEls,formEls} =obj;
        createPostGetDatasetListComponent.getData((err,data) => {
            if (err) return errorHandler(err);
            createPostListComponent.update({data,listEls,formEls});
        });
    };

    return {init,update};
};
module.exports = createPostComponentConstructor;