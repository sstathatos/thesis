let createPostAddPlotComponentConstructor = (obj) => {
    let {createPostAddPlotButtonHandlerConstructor,css,errorHandler,html} = obj;

    let plot_objects = [];

    let getPlotObjects = () => {
        return plot_objects;
    };

    let init = (add_plot_div,post_div,plot_list_div) => {
        let post_addplot_div_el =html.create('div',{className:'pt2 pl4 w-60'});
        let post_addplot_list_el = html.create('ul');
        let post_addplot_name_el = html.create('h4',{textContent:'Add Plot',className:'f3 light-yellow mt2 mb2'});


        let plot_list_title = html.create('p',{textContent:'Plot List:',className:' w-30 f4 pl3'});

        let mountToPlotList =html.mountTo(plot_list_div);
        [plot_list_title,post_addplot_list_el].map((el) => {
            mountToPlotList(el);
        });

        let post_addplot_el = html.create('button',{textContent:'Add',className:css.button});
        let addListenerToAddPlotButton = html.addListenerTo(post_addplot_el);

        let plot_cb =(err,plot_obj) => {
            if (err) return errorHandler(err);
            plot_objects.push(plot_obj);
            update(post_addplot_list_el);
        };

        let createPostAddPlotButtonHandler = createPostAddPlotButtonHandlerConstructor({
            dependencies:obj,
            plot_cb,
            post_div
        });
        addListenerToAddPlotButton('click',createPostAddPlotButtonHandler);

        let mountToDiv =html.mountTo(post_addplot_div_el);
        [post_addplot_name_el,post_addplot_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(add_plot_div)(post_addplot_div_el);

        return {dynamic:[post_addplot_list_el],static:[post_addplot_div_el,post_addplot_el,plot_list_div]};
    };

    let update = (post_addplot_list_el) => {

        let mountToLi = html.mountTo(post_addplot_list_el);
        let new_li_el = html.create('li',{textContent:plot_objects[plot_objects.length -1].title,className:' w-30 f3 pl3'});
        mountToLi(new_li_el);

    };

    return {init,update,getPlotObjects};
};
module.exports = createPostAddPlotComponentConstructor;