let html = require('../../html');

let createPostAddPlotComponentConstructor = (obj) => {
    let {app,createPostAddPlotButtonHandlerConstructor} = obj;

    let init = () => {
        let post_addplot_div_el =html.create('div');
        let post_addplot_list_el = html.create('ul');
        let post_addplot_name_el = html.create('p',{textContent:'Add Plot:'});


        let post_addplot_el = html.create('button',{textContent:'Add'});
        let addListenerToAddPlotButton = html.addListenerTo(post_addplot_el);

        let createPostAddPlotButtonHandler = createPostAddPlotButtonHandlerConstructor({
            post_addplot_list_el
        });
        addListenerToAddPlotButton('click',createPostAddPlotButtonHandler);



        let mountToDiv =html.mountTo(post_addplot_div_el);
        [post_addplot_name_el,post_addplot_el,post_addplot_list_el].map((el) => {
            mountToDiv(el);
        });

        let test_post_addplot_el = html.create('li',{textContent:'plot no1'});
        html.mountTo(post_addplot_list_el)(test_post_addplot_el);

        html.mountTo(app)(post_addplot_div_el);

        return {dynamic:[post_addplot_list_el],static:[post_addplot_div_el,post_addplot_el]};
    };

    return {init};
};
module.exports = createPostAddPlotComponentConstructor;