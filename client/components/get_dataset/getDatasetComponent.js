let getDatasetOptionsComponentConstructor = require('./subComponents/getDatasetOptionsComponent');

let retrieveDataConstructor = require('./subComponents/retrieveDataConstructor');

let getDatasetComponentConstructor = (obj) => {
    let {app,get,id,path} = obj;

    let {retrieveData} = retrieveDataConstructor({id,path,get});
    let getDatasetOptionsComponent = getDatasetOptionsComponentConstructor({app,retrieveData});

    let init = () => {
        return {
            optionsEls:getDatasetOptionsComponent.init()
        }
    };

    return {init};

};
module.exports = getDatasetComponentConstructor;
