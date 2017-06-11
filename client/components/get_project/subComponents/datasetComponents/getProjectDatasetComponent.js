let getProjectDatasetComponentConstructor = (obj) => {
    let {app,get,getDatasetContentsHandlerConstructor,
        gotContentsConstructor,html,errorHandler,getProjectCreateDatasetHandlerConstructor} = obj;

    let gotContents = gotContentsConstructor({
        errorHandler,
        html
    });

    let init = () => {
        let getproject_dataset_div_el = html.create('div');
        let getproject_dataset_title_name_el = html.create('p',{textContent:'Datasets:'});
        let getproject_dataset_table_el = html.create('table');

        let getproject_dataset_tr_el = html.create('tr');
        let getproject_dataset_th_name_el = html.create('th',{textContent:'Name'});
        let getproject_dataset_th_creator_el = html.create('th',{textContent:'Creator'});
        let getproject_dataset_th_date_el = html.create('th',{textContent:'Date created'});

        let mountToTr = html.mountTo(getproject_dataset_tr_el);
        [getproject_dataset_th_name_el,getproject_dataset_th_creator_el,getproject_dataset_th_date_el].map((el) => {
            mountToTr(el);
        });

        let mountToTable =html.mountTo(getproject_dataset_table_el);
        mountToTable(getproject_dataset_tr_el);

        let getproject_dataset_create_name_el = html.create('p',{textContent:'Create dataset:'});
        let getproject_dataset_create_button_el = html.create('button',{textContent:'Create'});
        let addListenerToCreateDsetButton = html.addListenerTo(getproject_dataset_create_button_el);
        let getProjectCreateDatasetHandler = getProjectCreateDatasetHandlerConstructor(
            obj
        );
        addListenerToCreateDsetButton('click',getProjectCreateDatasetHandler);


        let mountToDiv =html.mountTo(getproject_dataset_div_el);
        [getproject_dataset_title_name_el,getproject_dataset_table_el,
            getproject_dataset_create_name_el,getproject_dataset_create_button_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(app)(getproject_dataset_div_el);

        return {dynamic:[getproject_dataset_table_el],static:[getproject_dataset_div_el]};
    };

    let update = (obj) => {
        let {dsets,datasetEls} =obj;
        let dynamic = [];
        for(let row in dsets){
            let getproject_dataset_tr_el = html.create('tr');
            let getproject_dataset_td_name_el = html.create('td',{textContent:dsets[row].name});
            let getproject_dataset_td_creator_el = html.create('td',{textContent:dsets[row].creator_username});
            let getproject_dataset_td_date_el = html.create('td',{textContent:dsets[row].date});

            let mountToTr = html.mountTo(getproject_dataset_tr_el);
            [getproject_dataset_td_name_el,getproject_dataset_td_creator_el,getproject_dataset_td_date_el].map((el) => {
                mountToTr(el);
            });

            let getDatasetContentsHandler = getDatasetContentsHandlerConstructor({
                id: () => dsets[row]._id,
                get,
                gotContents,
                getproject_dataset_tr_el
            });

            let addListenerToTr = html.addListenerTo(getproject_dataset_tr_el);
            addListenerToTr('click',getDatasetContentsHandler);

            let mountToTable = html.mountTo(datasetEls.dynamic[0]);
            [getproject_dataset_tr_el].map((el) => {
                mountToTable(el);
            });
        }

        return {static:[],dynamic};

    };

    return {init,update};

};
module.exports = getProjectDatasetComponentConstructor;