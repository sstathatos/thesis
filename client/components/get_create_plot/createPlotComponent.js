let html = require('../html');
let createPlotInfoComponentConstructor = require('./subComponents/createPlotInfoComponent');
let createPlotDatasetComponentConstructor = require('./subComponents/createPlotDatasetComponent');
let getDatasetContentsComponentConstructor = require('./getDatasetContentsComponent');
let saveButtonHandlerConstructor = require('./subComponents/saveButtonHandler');

let createPlotComponentConstructor = (obj) => {
    let {app,get,post,id,post_id} = obj;

    let createPlotInfoComponent = createPlotInfoComponentConstructor({app});
    let createPlotDatasetComponent = createPlotDatasetComponentConstructor({app,get,post,saveButtonHandlerConstructor,post_id});
    let getDatasetContentsComponent = getDatasetContentsComponentConstructor(id,get);

    let init = () => {
        return {
            plotInfoEls :createPlotInfoComponent.init(),
            datasetEls : createPlotDatasetComponent.init()
        };
    };

    let update = (obj) => {
        let {datasetEls,plotInfoEls} =obj;
        let {dynamic,static} =datasetEls;

        getDatasetContentsComponent.getData((err,data) => {createPlotDatasetComponent.update({
            table_div:dynamic[1],
            data,
            dset_div:static[0],
            options_div:dynamic[2],
            title_el:plotInfoEls['dynamic'][0],
            descr_el:plotInfoEls['dynamic'][1]
        })
        });
    };

    return {init,update};
};
module.exports =createPlotComponentConstructor;