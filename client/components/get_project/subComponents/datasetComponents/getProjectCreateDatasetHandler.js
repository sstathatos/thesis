let getProjectCreateDatasetHandlerConstructor = (obj) => {

    let {createDatasetComponentConstructor} =obj;

    let getProjectCreateDatasetHandler = () => {

        let createDatasetComponent =createDatasetComponentConstructor(obj);
        createDatasetComponent.init();
    };

    return getProjectCreateDatasetHandler

};

module.exports = getProjectCreateDatasetHandlerConstructor;