let getProjectCreatePostHandlerConstructor = (obj) => {

    let {createPostComponentConstructor} =obj;

    let getProjectCreatePostHandler = () => {

        document.getElementById('app').innerHTML = "";

        let createPostComponent = createPostComponentConstructor(obj);
        createPostComponent.update(createPostComponent.init());
    };

    return getProjectCreatePostHandler;

};

module.exports = getProjectCreatePostHandlerConstructor;