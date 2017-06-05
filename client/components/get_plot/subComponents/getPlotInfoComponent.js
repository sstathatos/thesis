let html = require('../../html');

let getPlotInfoComponentConstructor = (obj) => {

    let {app} = obj;
    let init = () => {
        let getplot_info_div_el = html.create('div');
        let getplot_title_name_el = html.create('p',{textContent:'Title: '});
        let getplot_title_el = html.create('p',{textContent:''});
        let getplot_description_name_el = html.create('p',{textContent:'Description: '});
        let getplot_description_el = html.create('p',{textContent:''});
        let getplot_plot_name_el = html.create('p',{textContent:'Plot: '});

        let mountToDiv = html.mountTo(getplot_info_div_el);

        [getplot_title_name_el,getplot_title_el,getplot_description_name_el,getplot_description_el,
            getplot_plot_name_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(getplot_info_div_el);

        return {static:[getplot_info_div_el],dynamic:[getplot_title_el,getplot_description_el]};
    };

    let update = (obj) => {
        let {title,description,infoEls} = obj;
        infoEls['dynamic'][0].textContent=title;
        infoEls['dynamic'][1].textContent=description;
    };

    return {init,update};

};
module.exports = getPlotInfoComponentConstructor;