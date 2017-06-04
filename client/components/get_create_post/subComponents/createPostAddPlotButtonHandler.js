let html = require('../../html');

let createPostAddPlotButtonHandlerConstructor = (obj) =>{
    let {post_addplot_list_el} =obj;
    let createPostAddPlotButtonHandler = () => {
        let mountToList = html.mountTo(post_addplot_list_el);
        mountToList(html.create('li',{textContent:'New Plot'}))
    };
    return createPostAddPlotButtonHandler;
};
module.exports =createPostAddPlotButtonHandlerConstructor;