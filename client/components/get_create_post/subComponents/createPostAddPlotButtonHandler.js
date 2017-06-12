let createPostAddPlotButtonHandlerConstructor = (obj) =>{
    let {post_addplot_list_el,dependencies,plot_cb} =obj;
    let {createPlotComponentConstructor} = dependencies;
    let createPostAddPlotButtonHandler = () => {
        let createPlotComponent = createPlotComponentConstructor({dependencies,
            dataset_id:store.getItem('create_post_dataset_id'),plot_cb});
        createPlotComponent.update(createPlotComponent.init());

    };
    return createPostAddPlotButtonHandler;
};
module.exports =createPostAddPlotButtonHandlerConstructor;