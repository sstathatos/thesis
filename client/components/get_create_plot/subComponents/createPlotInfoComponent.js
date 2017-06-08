let html = require('../../html');

let userInfoConstructor = (obj) => {
    let {app,get,id} = obj;

    let init = () => {
        let plot_div_el = html.create('div');

        let plot_newplot_name_el = html.create('p',{textContent:`New Plot:`});

        let plot_title_name_el = html.create('p',{textContent:`Title:`});
        let plot_title_el = html.create('input',{value:'new plot'});

        let plot_descr_name_el = html.create('p',{textContent:`Description:`});
        let plot_descr_el = html.create('input',{value:'new description'});


        let mountToDiv = html.mountTo(plot_div_el);
        [plot_newplot_name_el,plot_title_name_el,plot_title_el,plot_descr_name_el,plot_descr_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(plot_div_el);
        return {dynamic :[plot_title_el,plot_descr_el],static:[plot_div_el]}
    };

    let update = () => {
    };

    return {init,update};
};
module.exports =userInfoConstructor;