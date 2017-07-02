let createPostListComponentConstructor = (dependencies) => {
    let {uniqueCheckboxHandlerConstructor,
        html,createPostSaveButtonComponentConstructor,
        createPostAddPlotComponentConstructor} = dependencies;

    let init = (post_div) => {
        let post_list_div_el = html.create('div',{className:'pt2 pl4 w-40 dtc'});
        let post_list_title_el = html.create('p',{textContent:'Select Dataset:',className:'f4 pl3 pr5'});
        let post_list_table_el = html.create('table',{className:"f6 w-90 mw8 left pt2 pl3"});
        post_list_table_el.cellSpacing = 0;

        let post_list_addplot_div_el =  html.create('div',{className:'dtc w-30'});
        let post_list_savepost_div_el =  html.create('div',{className:'dtc w-30'});

        let add_save_div_el =  html.create('div',{className:'dt  dtc w-30 v-mid'});
        let mountToAddSave =html.mountTo(add_save_div_el);
        [post_list_addplot_div_el,post_list_savepost_div_el].map((el) => {
            mountToAddSave(el);
        });

        let post_list_tr_el = html.create('tr',{className:'stripe-dark'});
        let post_list_th_name_el = html.create('th',{textContent:'Name',className:'pa1 f4'});
        let post_list_th_creator_el = html.create('th',{textContent:'Creator',className:'pa1 f4'});
        let post_list_th_date_el = html.create('th',{textContent:'Date created',className:'pa1 f4'});
        let post_list_th_select_el = html.create('th',{textContent:'Select Dataset',className:'pa1 f4'});


        let mountToTr = html.mountTo(post_list_tr_el);
        [post_list_th_name_el,post_list_th_creator_el,post_list_th_date_el,post_list_th_select_el].map((el) => {
            mountToTr(el);
        });

        let mountToTable =html.mountTo(post_list_table_el);
        mountToTable(post_list_tr_el);

        let mountToDiv =html.mountTo(post_list_div_el);
        [post_list_title_el,post_list_table_el].map((el) => {
            mountToDiv(el);
        });


        let add_save_table_div_el =  html.create('div',{className:'w-100 dt'});
        let mountToAll =html.mountTo(add_save_table_div_el);
        [post_list_div_el,add_save_div_el].map((el) => {
            mountToAll(el);
        });
        html.mountTo(post_div)(add_save_table_div_el);

        let plot_list_div = html.create('div',{className:'pt2 pl4'});
        html.mountTo(post_div)(plot_list_div);


        return {dynamic:[post_list_table_el,
            post_list_addplot_div_el,
            post_list_savepost_div_el,plot_list_div],static:[add_save_table_div_el]};
    };

    let update = (obj) => {
        let {data,listEls,formEls,post_div,parent_post_id} =obj;
        let checkboxes = [];
        for(let row in data){
            let post_list_tr_el = html.create('tr',{className:'stripe-dark'});
            let post_list_td_name_el = html.create('td',{textContent:data[row].name,className:'f4 w3 pa2'});
            post_list_td_name_el.style.textAlign = "center";


            let post_list_td_creator_el = html.create('td',{textContent:data[row].creator_username,className:'f4 w3 pa2'});
            post_list_td_creator_el.style.textAlign = "center";


            let post_list_td_date_el = html.create('td',{textContent:data[row].date,className:'f4 w3 pa2'});
            post_list_td_date_el.style.textAlign = "center";

            let post_list_td_checkbox_el =  html.create('td',{className:'f4 w3 pa2'});
            post_list_td_checkbox_el.style.textAlign = "center";


            let post_checkbox_el = html.create('input',{type: 'checkbox',className:'green'});
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
        let createPostSaveButtonComponent = createPostSaveButtonComponentConstructor({dependencies,parent_post_id});


        let uniqueCheckboxHandler = uniqueCheckboxHandlerConstructor(dependencies,
            createPostAddPlotComponent,listEls.dynamic[1],
            createPostSaveButtonComponent,listEls.dynamic[2],listEls.dynamic[3]);

        uniqueCheckboxHandler({checkboxes,data,formEls,post_div});

    };



    return {init,update};

};
module.exports = createPostListComponentConstructor;