let uniqueCheckboxHandlerConstructor = (obj,createPostAddPlotComponent,add_plot_div,
                                        createPostSaveButtonComponent,savepost_div) => {

    let {html} = obj;
    let uniqueCheckboxHandler = (spec) => {
        let {checkboxes,data,formEls} = spec;

        let enable_extra = (el,row_array) => {
            add_plot_div.innerHTML = "";
            savepost_div.innerHTML = '';
            createPostAddPlotComponent.init(add_plot_div);
            createPostSaveButtonComponent.init(savepost_div,formEls,row_array,createPostAddPlotComponent);
        };

        let unique_handler = (enable_extra,row_array,checkbox_index) => {
            return (e) => {
                checkboxes.map((box) => box.checked = false);
                e.srcElement.checked = true;
                store.setItem('create_post_checkbox_index',checkbox_index);
                console.log(row_array);
                store.setItem('create_post_dataset_id',row_array._id);

                enable_extra(e.srcElement,row_array);
            };
        };

        data.map((data_row,index) => {
            html.addListenerTo(checkboxes[index])('click',unique_handler(enable_extra,data_row,index));
        });


    };

    return uniqueCheckboxHandler;

};
module.exports = uniqueCheckboxHandlerConstructor;