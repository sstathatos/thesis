let getDatasetOptionsComponentConstructor = require('./subComponents/getDatasetOptionsComponent');

let retrieveDataConstructor = require('./subComponents/retrieveDataConstructor');

let getDatasetComponentConstructor = (obj) => {
    let {dependencies,id,data} = obj;
    let {get,app} = dependencies;
    let {retrieveData} = retrieveDataConstructor({id,path:data['path'],get});
    let getDatasetOptionsComponent = getDatasetOptionsComponentConstructor({dependencies,retrieveData,data});

    let init = () => {
        return {
            optionsEls:getDatasetOptionsComponent.init()
        }
    };

    return {init};

};
module.exports = getDatasetComponentConstructor;
