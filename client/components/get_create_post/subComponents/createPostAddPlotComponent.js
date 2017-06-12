let createPostAddPlotComponentConstructor = (obj) => {
    let {createPostAddPlotButtonHandlerConstructor,errorHandler,html} = obj;

    let plot_objects = [];

    let getPlotObjects = () => {
        return plot_objects;
    };

    let init = (add_plot_div) => {
        let post_addplot_div_el =html.create('div');
        let post_addplot_list_el = html.create('ul');
        let post_addplot_name_el = html.create('p',{textContent:'Add Plot:'});


        let post_addplot_el = html.create('button',{textContent:'Add'});
        let addListenerToAddPlotButton = html.addListenerTo(post_addplot_el);

        let plot_cb =(err,plot_obj) => {
            if (err) return errorHandler(err);
            plot_objects.push(plot_obj);
            update(post_addplot_list_el);
        };

        let createPostAddPlotButtonHandler = createPostAddPlotButtonHandlerConstructor({
            post_addplot_list_el,
            dependencies:obj,
            plot_cb
        });
        addListenerToAddPlotButton('click',createPostAddPlotButtonHandler);

        let mountToDiv =html.mountTo(post_addplot_div_el);
        [post_addplot_name_el,post_addplot_el,post_addplot_list_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(add_plot_div)(post_addplot_div_el);

        return {dynamic:[post_addplot_list_el],static:[post_addplot_div_el,post_addplot_el]};
    };

    let update = (post_addplot_list_el) => {

        let mountToLi = html.mountTo(post_addplot_list_el);
        let new_li_el = html.create('li',{textContent:plot_objects[plot_objects.length -1].title});
        mountToLi(new_li_el);

    };

    return {init,update,getPlotObjects};
};
module.exports = createPostAddPlotComponentConstructor;