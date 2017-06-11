let getProjectCreatePostHandlerConstructor = (obj) => {

    let {createPostComponentConstructor} =obj;

    let getProjectCreatePostHandler = () => {

        let createPostComponent = createPostComponentConstructor(obj);
        createPostComponent.update(createPostComponent.init());
    };

    return getProjectCreatePostHandler;

};

module.exports = getProjectCreatePostHandlerConstructor;