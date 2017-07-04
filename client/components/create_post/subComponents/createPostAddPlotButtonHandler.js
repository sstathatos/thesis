let createPostAddPlotButtonHandlerConstructor = (obj) =>{
    let {dependencies,plot_cb,post_div} =obj;
    let {createPlotComponentConstructor} = dependencies;
    let createPostAddPlotButtonHandler = () => {

        post_div.style.display = 'none';
        let createPlotComponent = createPlotComponentConstructor({dependencies,
            dataset_id:store.getItem('create_post_dataset_id'),plot_cb,post_div});
        createPlotComponent.update(createPlotComponent.init());

    };
    return createPostAddPlotButtonHandler;
};
module.exports =createPostAddPlotButtonHandlerConstructor;