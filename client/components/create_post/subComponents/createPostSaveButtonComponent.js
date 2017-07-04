let createPostButtonsComponentConstructor = (obj) => {
    let {parent_post_id,dependencies} = obj;
    let {createPostSaveButtonHandlerConstructor,html,css} = dependencies;

    let init = (savepost_div_el,formEls,row_array,createPostAddPlotComponent) => {
        let post_savebutton_div_el =html.create('div',{className:'pt2 pl4 w-60'});

        let post_savebutton_name_el = html.create('h4',{textContent:'Save Post',className:'f3 light-yellow mt2 mb2'});
        let post_savebutton_el = html.create('button',{textContent:'Save',className:css.button});
        let addListenerToSaveButton = html.addListenerTo(post_savebutton_el);
        let createPostSaveButtonHandler = createPostSaveButtonHandlerConstructor({
            dependencies,
            formEls,row_array,plots:createPostAddPlotComponent.getPlotObjects(),
            parent_post_id
        });
        addListenerToSaveButton('click',createPostSaveButtonHandler);

        let mountToDiv =html.mountTo(post_savebutton_div_el);
        [post_savebutton_name_el,post_savebutton_el].map((el) => {
            mountToDiv(el);
        });

        html.mountTo(savepost_div_el)(post_savebutton_div_el);

        return {dynamic:[],static:[post_savebutton_div_el,post_savebutton_el]};
    };

    return {init};
};
module.exports = createPostButtonsComponentConstructor;