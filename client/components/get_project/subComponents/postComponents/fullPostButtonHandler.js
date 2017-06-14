let fullPostButtonHandlerConstructor = (obj) => {

    let {dependencies,post_id} =obj;
    let fullPostButtonHandler = () => {
        let {getPostComponentConstructor} = dependencies;
        document.getElementById('app').innerHTML = '';
        let getPostComponent = getPostComponentConstructor({dependencies,id:post_id});
        getPostComponent.update(getPostComponent.init());
    };

    return fullPostButtonHandler;
};
module.exports = fullPostButtonHandlerConstructor;