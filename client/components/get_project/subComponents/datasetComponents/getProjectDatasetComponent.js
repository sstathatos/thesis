let getProjectDatasetComponentConstructor = (obj) => {
    let {app,getDatasetContentsHandlerConstructor,
        gotContentsConstructor,html,css,getProjectCreateDatasetHandlerConstructor,getProjectCreatePostHandlerConstructor} = obj;

    let dependencies = obj;
    let gotContents = gotContentsConstructor(obj);

    let init = () => {
        let getproject_dataset_div_el = html.create('div',{className:'fl w-60 '});
        let getproject_dataset_title_name_el = html.create('h4',{textContent:'Datasets',className:'f3 light-yellow mt2 mb1'});
        let getproject_dataset_table_el = html.create('table',{className:"f6 w-90 mw8 left pt2 pl3"});
        getproject_dataset_table_el.cellSpacing = 0;

        let getproject_dataset_contents_div_el = html.create('div',{className:'w-100'});

        let getproject_empty_message_el = html.create('h3');

        let mountToDiv =html.mountTo(getproject_dataset_div_el);
        [getproject_dataset_title_name_el,getproject_dataset_table_el,
            getproject_empty_message_el].map((el) => {
            mountToDiv(el);
        });


        let getproject_dataset_create_name_el = html.create('h4',{textContent:'Create dataset',className:'f3 light-yellow mt2 mb2'});
        let getproject_dataset_create_button_el = html.create('button',{textContent:'Create',className:css.button});
        let addListenerToCreateDsetButton = html.addListenerTo(getproject_dataset_create_button_el);
        let getProjectCreateDatasetHandler = getProjectCreateDatasetHandlerConstructor(
            obj
        );
        addListenerToCreateDsetButton('click',getProjectCreateDatasetHandler);


        let getproject_post_createpost_name_el = html.create('h4',{textContent:'Create post',className:'f3 light-yellow mt2 mb2'});
        let getproject_post_createpost_button_el = html.create('button',{textContent:'Create',disabled:'true',className:css.button});
        let addListenerToCreatePost = html.addListenerTo(getproject_post_createpost_button_el);
        let getProjectCreatePostHandler = getProjectCreatePostHandlerConstructor(obj);
        addListenerToCreatePost('click',getProjectCreatePostHandler);

        let getproject_create_dataset_div = html.create('div',{className:'fl w-40 dtc v-mid db'});
        let mountToCreateDatasetDiv = html.mountTo(getproject_create_dataset_div);
        [getproject_dataset_create_name_el,getproject_dataset_create_button_el,
            getproject_post_createpost_name_el,getproject_post_createpost_button_el].map((el) => {
            mountToCreateDatasetDiv(el);
        });

        let getproject_info_whole_el = html.create('div',{className:'pt2 pl4 dt w-100'});
        let mountToWholeDiv = html.mountTo(getproject_info_whole_el);
        [getproject_dataset_div_el,getproject_create_dataset_div,getproject_dataset_contents_div_el].map((el) => {
            mountToWholeDiv(el);
        });


        html.mountTo(app)(getproject_info_whole_el);

        return {dynamic:[getproject_dataset_table_el],static:[getproject_dataset_div_el,
            getproject_dataset_contents_div_el,getproject_empty_message_el,
            getproject_post_createpost_button_el]};
    };

    let update = (obj) => {
        let {dsets,datasetEls} =obj;
        let dynamic = [];

        if(dsets.length > 0)
        {
            let getproject_dataset_tr_el = html.create('tr',{className:'stripe-dark'});
            let getproject_dataset_th_name_el = html.create('th',{textContent:'Name',className:'pa1 f4'});
            let getproject_dataset_th_creator_el = html.create('th',{textContent:'Creator',className:'pa1 f4'});
            let getproject_dataset_th_date_el = html.create('th',{textContent:'Date created',className:'pa1 f4'});

            let mountToTr = html.mountTo(getproject_dataset_tr_el);
            [getproject_dataset_th_name_el,getproject_dataset_th_creator_el,getproject_dataset_th_date_el].map((el) => {
                mountToTr(el);
            });

            let mountToTable =html.mountTo(datasetEls.dynamic[0]);
            mountToTable(getproject_dataset_tr_el);

            for(let row in dsets){
                let getproject_dataset_tr_el = html.create('tr',{className:'stripe-dark'});
                getproject_dataset_tr_el.style.cursor = 'pointer';

                let getproject_dataset_td_name_el = html.create('td',{textContent:dsets[row].name,className:'f4 w3 pa2'});
                getproject_dataset_td_name_el.style.textAlign = "center";

                let getproject_dataset_td_creator_el = html.create('td',{textContent:dsets[row].creator_username,className:'f4 w3 pa2'});
                getproject_dataset_td_creator_el.style.textAlign = "center";


                let getproject_dataset_td_date_el = html.create('td',{textContent:dsets[row].date,className:'f4 w3 pa2'});
                getproject_dataset_td_date_el.style.textAlign = "center";


                let mountToTr = html.mountTo(getproject_dataset_tr_el);
                [getproject_dataset_td_name_el,getproject_dataset_td_creator_el,
                    getproject_dataset_td_date_el].map((el) => {
                    mountToTr(el);
                });

                let getDatasetContentsHandler = getDatasetContentsHandlerConstructor({
                    id: () => dsets[row]._id,
                    dependencies,
                    gotContents,
                    contents_div:datasetEls['static'][1]
                });

                let addListenerToTr = html.addListenerTo(getproject_dataset_tr_el);
                addListenerToTr('click',getDatasetContentsHandler);

                let mountToTable = html.mountTo(datasetEls.dynamic[0]);
                [getproject_dataset_tr_el].map((el) => {
                    mountToTable(el);
                });
            }
        }

        else {
            datasetEls['static'][2].textContent = "This project doesn\'t contain a dataset yet.";
            datasetEls['static'][2].className ='f4 bl pv2 bw2 pl2 light-yellow';
        }


        return {static:[],dynamic};

    };

    return {init,update};

};
module.exports = getProjectDatasetComponentConstructor;