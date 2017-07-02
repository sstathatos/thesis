let userInfoConstructor = (obj) => {
    let {css,html} = obj;

    let init = (plot_div) => {
        let plot_div_el = html.create('div',{className:'pt2 pl4 w-60'});

        let plot_newplot_name_el = html.create('h4',{textContent:`New Plot`,className:'f3 light-yellow mt2 mb1'});

        let plot_title_name_el = html.create('p',{textContent:`Title:`,className:' w-30 f4 pl3 pr5 di dtc'});
        let plot_title_el = html.create('input',{value:'new plot',className:`${css.input} dtc`});

        let title_div = html.create('div',{className:'w-100 pv2 dt'});
        let mountToTitleDiv = html.mountTo(title_div);
        [plot_title_name_el,plot_title_el].map((el) => {
            mountToTitleDiv(el);
        });

        let plot_descr_name_el = html.create('p',{textContent:`Description:`,className:' w-30 v-mid f4 pl3 pr5 di dtc'});
        let plot_descr_el = html.create('textarea',{value:'new description',maxLength:"100",className:'border-box w-70 green measure dtc bw1 ba b--green pa2 br2 mb2'});


        let description_div = html.create('div',{className:'w-100 pv2 dt'});
        let mountToDescriptionDiv = html.mountTo(description_div);
        [plot_descr_name_el,plot_descr_el].map((el) => {
            mountToDescriptionDiv(el);
        });

        let mountToDiv = html.mountTo(plot_div_el);
        [plot_newplot_name_el,title_div,description_div].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(plot_div)(plot_div_el);
        return {dynamic :[plot_title_el,plot_descr_el],static:[plot_div_el]}
    };

    let update = () => {
    };

    return {init,update};
};
module.exports =userInfoConstructor;