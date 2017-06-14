let createButtonHandlerConstructor = (obj) => {
    let {dependencies,parent_post_id} = obj;
    let {createPostComponentConstructor} =dependencies;
    let createResponseButtonHandler = () => {
        document.getElementById('app').innerHTML = "";
        let createPostComponent = createPostComponentConstructor(dependencies,parent_post_id);
        createPostComponent.update(createPostComponent.init());
    };
    return createResponseButtonHandler;
};
module.exports = createButtonHandlerConstructor;