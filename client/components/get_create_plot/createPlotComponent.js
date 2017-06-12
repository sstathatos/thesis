let createPlotComponentConstructor = (obj) => {
    let {dependencies,dataset_id,plot_cb} =obj;
    let {app,get,post,createPlotInfoComponentConstructor,
        createPlotDatasetComponentConstructor,getDatasetContentsComponentConstructor} = dependencies;

    let createPlotInfoComponent = createPlotInfoComponentConstructor(dependencies);
    let createPlotDatasetComponent = createPlotDatasetComponentConstructor({dependencies,plot_cb});
    let getDatasetContentsComponent = getDatasetContentsComponentConstructor(dataset_id,get);

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