let backProjectHandlerConstructor = (obj) => {

    let {getProjectComponentConstructor} =  obj;
    let backProjectHandler = () => {

        document.getElementById('app').innerHTML = "";
        let getProjectComponent = getProjectComponentConstructor({id:store.getItem('project_id'),dependencies:obj});
        getProjectComponent.update(getProjectComponent.init());
    };

    return backProjectHandler;
};

module.exports = backProjectHandlerConstructor;