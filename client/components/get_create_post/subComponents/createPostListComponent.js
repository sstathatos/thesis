let createPostListComponentConstructor = (dependencies) => {
    let {app,uniqueCheckboxHandlerConstructor,
        html,createPostSaveButtonComponentConstructor,
        createPostAddPlotComponentConstructor} = dependencies;

    let init = () => {
        let post_list_div_el = html.create('div');
        let post_list_title_el = html.create('p',{textContent:'Select Dataset:'});
        let post_list_table_el = html.create('table');
        let post_list_addplot_div_el =  html.create('div');
        let post_list_savepost_div_el =  html.create('div');

        let post_list_tr_el = html.create('tr');
        let post_list_th_name_el = html.create('th',{textContent:'Name'});
        let post_list_th_creator_el = html.create('th',{textContent:'Creator'});
        let post_list_th_date_el = html.create('th',{textContent:'Date created'});

        let mountToTr = html.mountTo(post_list_tr_el);
        [post_list_th_name_el,post_list_th_creator_el,post_list_th_date_el].map((el) => {
            mountToTr(el);
        });

        let mountToTable =html.mountTo(post_list_table_el);
        mountToTable(post_list_tr_el);

        let mountToDiv =html.mountTo(post_list_div_el);
        [post_list_title_el,post_list_table_el,post_list_addplot_div_el,post_list_savepost_div_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(post_list_div_el);

        return {dynamic:[post_list_table_el,
            post_list_addplot_div_el,
            post_list_savepost_div_el],static:[post_list_div_el]};
    };

    let update = (obj) => {
        let {data,listEls,formEls} =obj;
        let checkboxes = [];
        for(let row in data){
            let post_list_tr_el = html.create('tr');
            let post_list_td_name_el = html.create('td',{textContent:data[row].name});
            let post_list_td_creator_el = html.create('td',{textContent:data[row].creator_username});
            let post_list_td_date_el = html.create('td',{textContent:data[row].date});
            let post_list_td_checkbox_el =  html.create('td');

            let post_checkbox_el = html.create('input',{type: 'checkbox'});
            html.mountTo(post_list_td_checkbox_el)(post_checkbox_el);
            checkboxes.push(post_checkbox_el);

            let mountToTr = html.mountTo(post_list_tr_el);
            [post_list_td_name_el,post_list_td_creator_el,post_list_td_date_el,post_list_td_checkbox_el].map((el) => {
               mountToTr(el);
            });

            let mountToTable = html.mountTo(listEls.dynamic[0]);
            [post_list_tr_el].map((el) => {
                mountToTable(el);
            });
        }
        let createPostAddPlotComponent = createPostAddPlotComponentConstructor(dependencies);
        let createPostSaveButtonComponent = createPostSaveButtonComponentConstructor(dependencies);


        let uniqueCheckboxHandler = uniqueCheckboxHandlerConstructor(dependencies,
            createPostAddPlotComponent,listEls.dynamic[1],createPostSaveButtonComponent,listEls.dynamic[2]);

        uniqueCheckboxHandler({checkboxes,data,formEls});

    };



    return {init,update};

};
module.exports = createPostListComponentConstructor;