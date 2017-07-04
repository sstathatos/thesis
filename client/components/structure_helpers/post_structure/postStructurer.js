
let postStructurer = (obj) => {
    let {post_data,post_div_el,dependencies} =  obj;
    let {getPlotButtonHandlerConstructor,getDatasetButtonHandlerConstructor,html} = dependencies;
    let {title,description,date,dset,plots_ids} = post_data;
    let {name,_id} =dset;

    let plots_struct = (plots,post_plots_ul_el) => {
        let post_plots_li_els = [];
        let mountToUl =html.mountTo(post_plots_ul_el);
        for (let row=0;row<plots.length;row++) {
            let li_el =html.create('li',{textContent:plots[row].title,className:'pl2 f4 w-80'});
            li_el.style.cursor = 'pointer';

            mountToUl(li_el);

            let addListenerToLi = html.addListenerTo(li_el);

            let getPlotButtonHandler = getPlotButtonHandlerConstructor({
                dependencies,
                plot_id:plots[row]._id
            });
            addListenerToLi('click',getPlotButtonHandler);

            post_plots_li_els.push(li_el);
        }
        return post_plots_li_els;
    };

    let post_title_name_el =html.create('p',{textContent:'Title:',className:'di f4 pl3'});
    let post_title_el =html.create('h4',{textContent:title,className:'di  pl2 f4'});

    let title_div = html.create('div',{className:'pv2 w-100'});
    let mountToTitleDiv = html.mountTo(title_div);
    [post_title_name_el,post_title_el].map((el) => {
        mountToTitleDiv(el);
    });

    let post_date_name_el =html.create('p',{textContent:'Date created:',className:'di f4 pl3'});
    let post_date_el =html.create('h4',{textContent:date,className:'di  pl2 f4'});

    let date_div = html.create('div',{className:'pv2 w-100'});
    let mountToDateDiv = html.mountTo(date_div);
    [post_date_name_el,post_date_el].map((el) => {
        mountToDateDiv(el);
    });

    let post_descr_name_el =html.create('p',{textContent:'Description:',className:'di pl3 f4 pr2 v-top'});
    let post_descr_el =html.create('span',{textContent:description,className:'dib w-70 f4'});

    let description_div = html.create('div',{className:' pv2'});
    let mountToDescriptionDiv = html.mountTo(description_div);
    [post_descr_name_el,post_descr_el].map((el) => {
        mountToDescriptionDiv(el);
    });

    let post_dataset_linked_name_el =html.create('p',{textContent:'Dataset used:',className:'di f4 pl3'});
    let post_dataset_linked_el =html.create('h4',{textContent:`${name}`,className:'di  pl2 f4'});
    post_dataset_linked_el.style.cursor = 'pointer';


    let dataset_div = html.create('div',{className:'w-100 pv2'});
    let mountToDatasetDiv = html.mountTo(dataset_div);
    [post_dataset_linked_name_el,post_dataset_linked_el].map((el) => {
        mountToDatasetDiv(el);
    });

    let post_table_div =  html.create('div');
    html.mountTo(dataset_div)(post_table_div);


    let addListenerToDataset = html.addListenerTo(post_dataset_linked_el);

    let getDatasetButtonHandler = getDatasetButtonHandlerConstructor({
        dependencies,
        dset_id:_id,
        post_table_div
    });
    addListenerToDataset('click',getDatasetButtonHandler);

    let post_plots_name_el =html.create('p',{textContent:'Plots:',className:'di f4 pl3'});
    let post_plots_ul_el =html.create('ul');
    let post_plots_li_els= plots_struct(plots_ids,post_plots_ul_el);

    let mountToDiv = html.mountTo(post_div_el);
    [title_div,date_div,description_div,dataset_div,post_table_div,post_plots_name_el,
        post_plots_ul_el].map((el) => {
        mountToDiv(el);
    });

    return { static:[post_div_el],dynamic:[post_title_el,post_date_el,
        post_descr_el,post_dataset_linked_el,post_plots_ul_el,post_plots_li_els]}
};

module.exports = postStructurer;