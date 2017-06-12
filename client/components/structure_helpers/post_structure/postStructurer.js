let html =require('../../html');

let getPlotButtonHandlerConstructor = require('./getPlotButtonHandler');
let getDatasetButtonHandlerConstructor = require('./getDatasetButtonHandler');

let postStructurer = (obj) => {

    let {app,get,post_data,post_div_el} = obj;
    let {title,description,date,dset,plots_ids} =post_data;
    let {creator_username,name,_id} =dset;

    let plots_struct = (plots,post_plots_ul_el) => {
        let post_plots_li_els = [];
        let mountToUl =html.mountTo(post_plots_ul_el);
        for (let row=0;row<plots.length;row++) {
            let li_el =html.create('li',{textContent:plots[row].title});
            mountToUl(li_el);

            let addListenerToLi = html.addListenerTo(li_el);

            let getPlotButtonHandler = getPlotButtonHandlerConstructor({
                get,
                plot_id:plots[row]._id
            });
            addListenerToLi('click',getPlotButtonHandler);

            post_plots_li_els.push(li_el);
        }
        return post_plots_li_els;
    };

    let post_title_name_el =html.create('p',{textContent:'Title:'});
    let post_title_el =html.create('p',{textContent:title});

    let post_date_name_el =html.create('p',{textContent:'Date created:'});
    let post_date_el =html.create('p',{textContent:date});

    let post_descr_name_el =html.create('p',{textContent:'Description:'});
    let post_descr_el =html.create('p',{textContent:description});

    let post_dataset_linked_name_el =html.create('p',{textContent:'Dataset linked:'});
    let post_dataset_linked_el =html.create('p',{textContent:`Name: ${name}
         Creator: ${creator_username} Date created:${dset.date}`});

    let addListenerToDataset = html.addListenerTo(post_dataset_linked_el);

    let getDatasetButtonHandler = getDatasetButtonHandlerConstructor({
        get,
        dset_id:_id
    });
    addListenerToDataset('click',getDatasetButtonHandler);

    let post_plots_name_el =html.create('p',{textContent:'Plots:'});
    let post_plots_ul_el =html.create('ul');
    let post_plots_li_els= plots_struct(plots_ids,post_plots_ul_el);

    let mountToDiv = html.mountTo(post_div_el);
    [post_title_name_el,post_title_el,post_date_name_el,
        post_date_el,post_descr_name_el,post_descr_el,
        post_dataset_linked_name_el,post_dataset_linked_el,post_plots_name_el,
        post_plots_ul_el].map((el) => {

        mountToDiv(el);
    });

    return { static:[post_div_el],dynamic:[post_title_el,post_date_el,
        post_descr_el,post_dataset_linked_el,post_plots_ul_el,post_plots_li_els]}
};

module.exports = postStructurer;