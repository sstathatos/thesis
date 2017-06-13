let getProjectCreateDatasetHandlerConstructor = (obj) => {

    let {createDatasetComponentConstructor} =obj;

    let getProjectCreateDatasetHandler = () => {

        document.getElementById('app').innerHTML = "";

        let createDatasetComponent =createDatasetComponentConstructor(obj);
        createDatasetComponent.init();
    };

    return getProjectCreateDatasetHandler

};

module.exports = getProjectCreateDatasetHandlerConstructor;