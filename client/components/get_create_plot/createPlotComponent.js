let createPlotComponentConstructor = (obj) => {
    let {dependencies,dataset_id,plot_cb,post_div} =obj;
    let {app,get,html,post,createPlotInfoComponentConstructor,
        createPlotDatasetComponentConstructor,errorHandler,getDatasetContentsComponentConstructor} = dependencies;

    let createPlotInfoComponent = createPlotInfoComponentConstructor(dependencies);
    let createPlotDatasetComponent = createPlotDatasetComponentConstructor({dependencies,plot_cb});
    let getDatasetContentsComponent = getDatasetContentsComponentConstructor({dataset_id,dependencies});

    let init = () => {
        let plot_div = html.create('div');
        let plotInfoEls =createPlotInfoComponent.init(plot_div);
        let datasetEls = createPlotDatasetComponent.init(plot_div);

        let mountToDiv = html.mountTo(plot_div);
        [plotInfoEls['static'][0],datasetEls['static'][0]].map((el)=> {

            mountToDiv(el);
        });
        html.mountTo(app)(plot_div);
        return {plotInfoEls,datasetEls,plot_div};

    };

    let update = (obj) => {
        let {datasetEls,plotInfoEls,plot_div} =obj;
        let {dynamic,static} =datasetEls;

        getDatasetContentsComponent.getData((err,data) => {
            createPlotDatasetComponent.update({
                table_div:dynamic[1],
                data,
                dset_div:static[0],
                options_div:dynamic[2],
                title_el:plotInfoEls['dynamic'][0],
                descr_el:plotInfoEls['dynamic'][1],
                post_div,
                plot_div
            })
        });
    };

    return {init,update};
};
module.exports =createPlotComponentConstructor;