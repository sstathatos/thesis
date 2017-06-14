let trArrayHandlerConstructor = (obj) => {

    let {dset_id, dependencies, data} = obj;
    let {getDatasetComponentConstructor} =  dependencies;

    let trArrayHandler = () => {
        document.getElementById('app').innerHTML = '';
        let getDatasetComponent = getDatasetComponentConstructor({dependencies,id:dset_id,data});
        getDatasetComponent.init();
    };

    return trArrayHandler;

};

module.exports = trArrayHandlerConstructor;