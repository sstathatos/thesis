let getPlotInfoComponentConstructor = (obj) => {

    let {app,html} = obj;
    let init = () => {
        let getplot_info_div_el = html.create('div',{className:'pt2 pl4 w-60'});
        let getplot_title_name_el = html.create('p',{textContent:'Title:',className:' w-20 f4  dtc'});
        let getplot_title_el = html.create('p',{textContent:'',className:'dtc pl2 f4'});

        let title_div = html.create('div',{className:'w-100 pv2 dt'});
        let mountToTitleDiv = html.mountTo(title_div);
        [getplot_title_name_el,getplot_title_el].map((el) => {
            mountToTitleDiv(el);
        });

        let getplot_description_name_el = html.create('p',{textContent:'Description:',className:' w-20 mr2 f4 dtc'});
        let getplot_description_el = html.create('span',{textContent:'',className:'dtc pl2 f4'});

        let description_div = html.create('div',{className:'w-100 pv2 dt'});
        let mountToDescriptionDiv = html.mountTo(description_div);
        [getplot_description_name_el,getplot_description_el].map((el) => {
            mountToDescriptionDiv(el);
        });

        let getplot_plot_name_el = html.create('h4',{textContent:'Plot',className:'f3 light-yellow mt2 mb1'});

        let mountToDiv = html.mountTo(getplot_info_div_el);

        [title_div,description_div,
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