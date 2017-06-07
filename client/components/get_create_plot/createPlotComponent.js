let html = require('../html');
let createPlotInfoComponentConstructor = require('./subComponents/createPlotInfoComponent');
 let createPlotDatasetComponentConstructor = require('./subComponents/createPlotDatasetComponent');
let getDatasetContentsComponentConstructor = require('./getDatasetContentsComponent');

let createPlotComponentConstructor = (obj) => {
    let {app,get,post,id} = obj;

    let createPlotInfoComponent = createPlotInfoComponentConstructor({app});
    let createPlotDatasetComponent = createPlotDatasetComponentConstructor({app,get});
    let getDatasetContentsComponent = getDatasetContentsComponentConstructor(id,get);

    let init = () => {
        return {
            plotInfoEls :createPlotInfoComponent.init(),
            datasetEls : createPlotDatasetComponent.init()
        };
    };

    let update = (obj) => {
        let {datasetEls} =obj;
        let {dynamic,static} =datasetEls;
        getDatasetContentsComponent.getData((err,data) => {createPlotDatasetComponent.update({
            table_div:dynamic[1],
            data,
            dset_div:static[0],
            options_div:dynamic[2]})
        });
    };

    return {init,update};
};
module.exports =createPlotComponentConstructor;